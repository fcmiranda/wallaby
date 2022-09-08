import * as url from 'url';
import * as path from 'path';

export async function run(ctx) {
  let patchingFailed = false;

  const esmHooks = await eval(`import('${url.pathToFileURL(ctx.wallabyContext.esmHooksPath)}')`);

  esmHooks.patchFile(ctx.wallabyContext.viteNodeUtils, code => {
    if (code.indexOf(`{ code: transformed, externalize } = await this.options.fetchModule(id);`) !== -1) {
      return code.replace(
        `{ code: transformed, externalize } = await this.options.fetchModule(id);`,
        `{ code: transformed, externalize } = global.$_$wallabyVitest.wrapFetchedModule(id, await this.options.fetchModule(id));`);
    }

    patchingFailed = true;
    return code;
  });

  const skippedTests = [];
  const testsToRun = [];
  
  Object.keys(ctx.wallabyContext.globals).forEach(key => {
    global[key] = ctx.wallabyContext.globals[key];
  });

  global.$_$reuseableTracer = true;

  global.$_$receiver = {
    send(payload) {
      sendWorkerMessageToRunner('receiverMessage', payload);
    }
  };

  await import('../../../tracer.js');

  const tracer = global.$_$tracer;
  tracer._shouldReportProgramScope = true;
  tracer.initLoadingPhase();

  tracer._highPriorityReceiver = {
    send: function (payload) {
      sendWorkerMessageToRunner('receiverHighPriorityMessage', payload);
    }
  };

  global.$_$receiver.onopen();

  tracer._onStart = () => { };

  Object.keys(ctx.wallabyContext.tracer).forEach(key => {
    tracer[key] = ctx.wallabyContext.tracer[key];
  });

  function normalizePath(filePath) {
    if (!filePath) return filePath;
    return filePath.replace(process.platform === 'win32' ? 'file:///' : 'file://', '').split(path.sep).join('/');
  };
  
  const pendingMessages = [];
  let sending = false;
  async function sendWorkerMessageToRunner(type, payload) {
    let done;
    const promise = new Promise(resolve => {
      done = resolve
    });
    pendingMessages.push({
      type,
      sessionId: global.$_$session,
      payload,
      done
    });

    if (globalThis.__vitest_worker__ && globalThis.__vitest_worker__.rpc && !sending) {
      sending = true;
      try {
        while (pendingMessages.length) {
          const message = pendingMessages.shift();
          try {
            await globalThis.__vitest_worker__.rpc.onWallabyWorkerMessage({ 
              type: message.type, 
              sessionId: message.sessionId, 
              payload: message.payload 
            });
            message.done();  
          } catch (e) {
            globalThis.__vitest_worker__.rpc.onWallabyWorkerMessage({ type: 'debugLog', sessionId: global.$_$session, payload: e.toString() });
          }
        }
      } finally {
        sending = false;
      }
    }
    
    await promise;
  };
  
  function getFileData(fileName) {
    if (fileName.indexOf('?wallaby=') !== -1) {
      fileName = fileName.substr(0, fileName.indexOf('?wallaby='));
    }
  
    const localProjectDir = ctx.wallabyContext.globals.wallaby.localProjectDir;
    const projectCacheDir = ctx.wallabyContext.globals.wallaby.projectCacheDir;
    let normalizedFileName = normalizePath(fileName.replace(localProjectDir, '').replace(projectCacheDir, ''));
    if (normalizedFileName[0] === '/') normalizedFileName = normalizedFileName.substr(1);

    let result = tracer._filePathToFileData[normalizedFileName];
    if (!result && ctx.wallabyContext.normalizedRootPrefix) {
      result = tracer._filePathToFileData[ctx.wallabyContext.normalizedRootPrefix + normalizedFileName];
    }
    return result;
  };
  
  tracer._beforeMatchSnapshot = (fileId, rangeId) => {
    tracer._expectedMatchSnapshotCall = [fileId, rangeId];
  };

  tracer._matchSnapshot = ({ key, snapshotPath }) => {
    if (!tracer._expectedMatchSnapshotCall) return;
    const [fileId, rangeId] = tracer._expectedMatchSnapshotCall;
    delete tracer._expectedMatchSnapshotCall;
    if (!tracer._matchSnapshotCalls) tracer._matchSnapshotCalls = [];
    tracer._matchSnapshotCalls.push({
      fileId,
      snapshotCallRangeId: rangeId,
      snapshotKey: key,
      snapshotPath: normalizePath(path.relative(ctx.wallabyContext.globals.wallaby.localProjectRoot, snapshotPath))
    });
  };

  function processErrors(errors) {
    if (typeof errors === 'string') {
      return [{
        error: errors,
        message: errors,
        stack: null,
        passed: false,
      }];
    }

    if (Array.isArray(errors)) {
      const results = [];
      errors.forEach(error => {
        results.push(processErrors(error));
      });
      return results;
    }

    try {
      const result = { error: errors, passed: false };

      if (errors && errors.name === 'AssertionError') {
        result.message = !errors ? 'empty error' : (((errors.message) ? (errors.message) : errors.toString())).split(' // ')[0];
      } else {
        result.message = !errors ? 'empty error' : ((errors.name && errors.message) ? (errors.name + ': ' + errors.message) : errors.toString());
      }

      result.stack = errors ? errors.stack : null;

      if (errors && errors.showDiff) {
        result.showDiff = true;
        result.actual = errors.actual;
        result.expected = errors.expected;
      }

      return [result];
    } catch (e) {
      return [{ passed: false, message: e.toString() }]
    }
  };

  global.$_$wallabyVitest = {
    wrapFetchedModule(_id, fetchedModule) {
      if (fetchedModule.coverage) {
        const coverage = new Array(fetchedModule.coverage.ranges);
        for (let i = 0; i < fetchedModule.coverage.ranges; i++) {
          coverage[i] = {};
        }
        global.$_$coverage[fetchedModule.coverage.id] = coverage;
        delete fetchedModule.coverage;
      }
  
      const filter = fetchedModule.filter;
      if (filter) {
        if (filter.name) {
          if (global.$_$tests === '*') {
            global.$_$tests = {};
          }
          const allTests = global.$_$tests[':?'] = global.$_$tests[':?'] || {};
          allTests[':' + filter.name] = '*';
        } else if (global.$_$tests && global.$_$tests[':?']) {
          global.$_$tests = '*';
        }
        delete fetchedModule.filter;
      }
  
      return fetchedModule;
    },
    adjustFileTasks(file) {
      let currentSpecId = tracer.initialSpecId();
      const hasSpecFilter = tracer.hasSpecFilter();
      const assignSpecIds = (suite, parents) => {
        for (const task of suite.tasks) {
          task.concurrent = false;

          task.wallabyTestFileId = getFileData(file.filepath).id;
  
          if (task.type === 'test') {
            task.wallabySpecId = ++currentSpecId;
            task.wallabySuite = parents;

            const testFiltered = hasSpecFilter && !tracer.specFilter([...parents, task.name]);
            if (testFiltered) {
              skippedTests.push([...parents, task.name].join(' > '));
              task.mode = 'skip';
              continue;
            }

            if (task.mode === 'skip' || task.mode === 'todo') {
              skippedTests.push(task.name);
              tracer.specStart(task.wallabySpecId, task.name);
              tracer.specSyncEnd();
              const timeRange = tracer.specEnd();
              
              if (!testFiltered) {
                tracer.result({
                  id: task.wallabySpecId,
                  timeRange: timeRange,
                  name: task.name,
                  suite: task.wallabySuite,
                  status: task.mode === 'todo' ? 'todo' : 'skipped',
                  time: 0,
                  testFile: task.wallabyTestFileId
                });
              }
            } else {
              testsToRun.push(task);
            }
          } else {
            assignSpecIds(task, [...parents, task.name]);
          }
        }
      };
  
      assignSpecIds(file, []);
  
      return file;
    },
    updateSnapshot() {
      return tracer.canUpdateSnapshots() ? 'all' : 'new';
    },
    inlineSnapshotSaved(fileName, content) {
      sendWorkerMessageToRunner('inlineSnapshotSaved', { fileName, content });
    },
    runSuite(suite) {
      const fileData = getFileData(suite.filepath);
      if (fileData) {
        tracer.started({ total: 'unknown number of' });
      }
    },
    getFn(task) {
      if (!task.wallabyStarted) {
        task.wallabyStarted = true;
        tracer.specSyncStart();
        tracer.specStart(task.wallabySpecId, task.name);
      }
    },
    updateTask(task) {
      if (task.wallabySpecId && task.result) {
        if (task.result.state === 'run' && !task.wallabyStarted && !task.wallabyPreStart) {
          task.wallabyPreStart = true;
          tracer.programScopeStartLoading(task.wallabyTestFileId);
          tracer.specSyncStart();
        } else if (task.result.duration !== undefined && !task.wallabyProcessed) {          
          task.wallabyProcessed = true;
          tracer.specSyncEnd();
          const timeRange = tracer.specEnd();
          const result = {
            id: task.wallabySpecId,
            timeRange: timeRange,
            name: task.name,
            suite: task.wallabySuite,
            status: 'executed',
            time: task.result.duration,
            log: [],
            testFile: tracer.entryFile(),
          };
  
          // If we have an error, it's a failed test
          if (task.result.error) {
            const errors = processErrors(task.result.error);
            errors.forEach(error => {
              result.log.push(
                tracer.setAssertionData(error, {
                  message: error.message || '',
                  stack: error.stack,
                })
              );
            });
          }

          if (!task.wallabyStarted) {
            task.wallabyStarted = true;
            result.log.push(tracer.setAssertionData({}, {
              message: 'Test execution did not start; check Suite Hooks for possible errors',
            }));
          }
  
          if (!result.log.length) delete result.log;
  
          tracer.result(result);
        }
      }
    },
    canUpdateSnapshot(snapshotState) {
      return !tracer._updateNoMoreThanOneSnapshotPerTestFileRun || snapshotState.updated === 0;
    },
    getSnapshotState(snapshotClient) {
      if (snapshotClient && snapshotClient.snapshotState && snapshotClient.snapshotState.markSnapshotsAsCheckedForTest) {
        try {
          skippedTests.forEach(testName => snapshotClient.snapshotState.markSnapshotsAsCheckedForTest(testName));
        } catch (e) {
          sendWorkerMessageToRunner('debugLog', 'Error processing skipped snapshots');
          sendWorkerMessageToRunner('debugLog', e.toString());
        }
      }
    }
  };

  const worker = await import(ctx.workerPath);
  const run = worker.run;

  process.on('uncaughtException', async (err, origin) => {
    let shouldReportGlobalError = true;

    for (let i = 0; i < testsToRun.length; i++) {
      const task = testsToRun[i];
      if (!task.wallabyStarted) {
        // Tests that have never started will be reported
        // as failed.
        task.wallabyStarted = true;
        task.wallabyProcessed = true;

        tracer.specStart(task.wallabySpecId, task.name);
        tracer.specSyncEnd();

        tracer.specSyncEnd();
        const timeRange = tracer.specEnd();
        const result = {
          id: task.wallabySpecId,
          timeRange: timeRange,
          name: task.name,
          suite: task.wallabySuite,
          status: 'executed',
          time: 0,
          log: [],
          testFile: task.wallabyTestFileId
        }

        result.log.push(tracer.setAssertionData(err, {
          message: 'Test never executed due to an uncaught exception',
          passed: false,
        }));

        tracer.result(result);
      } else if (!task.wallabyProcessed) {
        // This should happen only once for current running test
        task.wallabyProcessed = true;

        tracer.specSyncEnd();
        const timeRange = tracer.specEnd();
        const result = {
          id: task.wallabySpecId,
          timeRange: timeRange,
          name: task.name,
          suite: task.wallabySuite,
          status: 'executed',
          time: 0,
          log: [],
          testFile: task.wallabyTestFileId
        }

        shouldReportGlobalError = false;
        result.log.push(tracer.setAssertionData(err, {
          message: err.message || '',
          stack: err.stack || '',
          passed: false,
        }));

        tracer.result(result);
      }
    }

    if (shouldReportGlobalError) {
      await sendWorkerMessageToRunner('uncaughtException', err);
    }

    tracer.complete();
    delete global.$_$coverage;
    delete global.$_$tests;
    delete global.$_$session;
    delete global.$_$initialSpecId;
    delete global.$_$profileRun;
    await sendWorkerMessageToRunner('complete', {});
  });

  let inspectorSession;
  if (global.$_$profileRun) {
    const inspector = await import('inspector');
    inspectorSession = new inspector.Session();
    inspectorSession.connect();

    await new Promise(resolve => {
      inspectorSession.post('Profiler.enable', () => {
        inspectorSession.post('Profiler.start', () => {
          resolve();
        });
      });
    });
  }

  try {
    tracer.start();
    await run(ctx);
  } catch (error) {
    return { error };
  } finally {
    tracer.complete();
    if (inspectorSession) {
      await new Promise(resolve => {
        inspectorSession.post('Profiler.stop', async (err, { profile }) => {
          if (!err) {
            await sendWorkerMessageToRunner('profile', profile);
          } else {
            await sendWorkerMessageToRunner('uncaughtException', err);
            process.exit(1);
          }
          resolve();
        });  
      });
    }
    await sendWorkerMessageToRunner('complete', {});
    delete global.$_$coverage;
    delete global.$_$tests;
    delete global.$_$session;
    delete global.$_$initialSpecId;
    delete global.$_$profileRun;
  }

  if (patchingFailed) {
    return { error: new Error('Patching Failed: Wallaby is not compatible with current version of Vitest.') };
  } else {
    return {};
  }
}
