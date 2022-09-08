/*
 * Wallaby.js - v1.0.1328
 * https://wallabyjs.com
 * Copyright (c) 2014-2022 Wallaby.js - All Rights Reserved.
 *
 * This source code file is a part of Wallaby.js and is a proprietary (closed source) software.

 * IMPORTANT:
 * Wallaby.js is a tool made by software developers for software developers with passion and love for what we do.
 * Pirating the tool is not only illegal and just morally wrong,
 * it is also unfair to other fellow programmers who are using it legally,
 * and very harmful for the tool and its future.
 */
function normalizeModuleId(e){return e.replace(/\\/g,"/").replace(/^\/@fs\//,"/").replace(/^file:\//,"/").replace(/^\/+/,"/")}function patchConsoleError(){var e=global.console.error;global.console.error=function(){if(arguments.length&&Buffer.isBuffer(arguments[0])&&(arguments[0]=arguments[0].toString("utf8")),arguments.length){var t=arguments[0].toString("utf8").split("\n").filter(function(e){return e.indexOf("ExperimentalWarning:")===-1&&e.indexOf("node --trace-warnings")===-1}).join("\n");if(0===t.length)return}e.call.apply(e,__spreadArray([global.console],__read(arguments),!1))}}function getFileData(e){e.indexOf("?wallaby=")!==-1&&(e=e.substr(0,e.indexOf("?wallaby=")));var t=utils.normalizePath(utils.normalizePath(e).replace(globalContext.normalizedLocalProjectDir,"").replace(globalContext.normalizedProjectCacheDir,""));"/"===t[0]&&(t=t.substr(1));var i=tracer._filePathToFileData[t];return!i&&globalContext.normalizedRootPrefix&&(i=tracer._filePathToFileData[globalContext.normalizedRootPrefix+t]),i}function wrapFetchedModule(e,t){if(e=normalizeModuleId(e),testRunContext.fetchedModules.has(e))return testRunContext.fetchedModules.get(e);var i=getFileData(e);if(!i||!i.instrument)return t;if(!testRunContext.instrumentedFiles.has(i.id))return t;var r=testRunContext.instrumentedFiles.get(i.id);r.lineMap=utils.updateFileMap({},[t.map]),delete t.map,tracer.sendTransformedFile(r),r.instrumented.numberOfFunctions!==i.numberOfFunctions&&delete r.instrumented.testName;var n,s={id:i.id,ranges:r.instrumented.ranges.length};if(i.test&&(!global.$_$traceContext||!global.$_$traceContext.test))if(n={name:i.allowedToRunSingleTestOnly&&r.instrumented.testName},n.name){"*"===global.$_$tests&&(global.$_$tests={});var o=global.$_$tests[":?"]=global.$_$tests[":?"]||{};o[":"+n.name]="*"}else global.$_$tests&&global.$_$tests[":?"]&&(global.$_$tests="*");return t=__assign(__assign({},t),{coverage:s,filter:n}),testRunContext.fetchedModules.set(e,t),t}function initializeVitest(){return __awaiter(this,void 0,void 0,function(){var result,vitestDist,createVitestFileToPatchFileName,esmHooks,dependency,_a,root;return __generator(this,function(_b){switch(_b.label){case 0:if(globalContext.ctx)return[3,4];if(result=utils.tryRequireModuleWithPathFrom(globalContext.localProjectRoot,"vitest/package.json",!1),!result)throw new Error("Vitest dependency not found.");if(vitestDist=path.join(path.dirname(result.path),"dist"),createVitestFileToPatchFileName=utils.findFirstFileMatchingContentInDirectory(vitestDist,"const ctx = await createVitest(options, viteOverrides);")||utils.findFirstFileMatchingContentInDirectory(vitestDist,"const ctx = await createVitest(mode, options, viteOverrides);"),!createVitestFileToPatchFileName)throw new Error("Could not find vitest entry point.");if(globalContext.viteNodeUtils=utils.findFirstFileMatchingContentInDirectory(vitestDist,"{ code: transformed, externalize } = await this.options.fetchModule(id);"),!globalContext.viteNodeUtils)throw new Error("Could not find vitest utils.");if(globalContext.vendorEntryFilePath=utils.findFirstFileMatchingContentInDirectory(vitestDist,"function updateTask(task) {"),!globalContext.vendorEntryFilePath)throw new Error("Could not find vendor entry.");if(globalContext.snapshotLogicFilePath=utils.findFirstFileMatchingContentInDirectory(vitestDist,"// Vitest Snapshot v"),!globalContext.snapshotLogicFilePath)throw new Error("Could not find file snapshot file.");return globalContext.esmHooksPath=path.join(path.dirname(process.mainModule.filename),"runners/node/hooks.mjs"),[4,eval("import('"+url.pathToFileURL(globalContext.esmHooksPath)+"')")];case 1:return esmHooks=_b.sent(),esmHooks.patchFile(createVitestFileToPatchFileName,function(e){var t=[{key:"createVitest",from:"const ctx = await createVitest(options, viteOverrides);",to:"const ctx = await createVitest(options, viteOverrides); global.$_$wallabyVitest.adjustCtxAfterCreateVitest(ctx);"},{key:"createVitest",from:"const ctx = await createVitest(mode, options, viteOverrides);",to:"const ctx = await createVitest(mode, options, viteOverrides); global.$_$wallabyVitest.adjustCtxAfterCreateVitest(ctx);"},{key:"startVitest",from:"async function startVitest(cliFilters, options, viteOverrides) {",to:"export async function startVitest(cliFilters, options, viteOverrides) {"},{key:"startVitest",from:"async function startVitest(mode, cliFilters, options, viteOverrides) {",to:"export async function startVitest(cliFilters, options, viteOverrides) { let mode = 'test';"},{from:"return ctx.vitenode.fetchModule(id);",to:"return global.$_$wallabyVitest.fetchModule(id, ctx);"},{from:"async start(filters) {",to:"async start(filters) { return;"},{from:"await ctx.start(cliFilters);",to:"await ctx.start(cliFilters); return ctx;"},{from:"async report(name, ...args) {",to:"async report(name, ...args) { global.$_$wallabyVitest.report(name, ...args); return;"},{from:"config(viteConfig) {",to:"config(viteConfig) { global.$_$wallabyVitest.adjustViteConfigInVitestPlugin(viteConfig);"},{from:"GlobalSetupPlugin(ctx),",to:"GlobalSetupPlugin(ctx), [...global.$_$wallabyVitest.viteTestPluginAdjustments()],"},{from:"filename: workerPath,",to:"filename: global.$_$wallabyVitest.adjustedWorkerEntryPoint(),"},{from:"const pool = new Tinypool(options);",to:"const pool = global.$_$wallabyVitest.wrapTinyPoolResult(new Tinypool(global.$_$wallabyVitest.tinyPoolOptions(options)));"},{from:"await pool.run(data, { transferList: [workerPort], name });",to:"global.$_$wallabyVitest.runResult(await pool.run({ workerPath, ...data, ...global.$_$wallabyVitest.generateWorkerContext() }, { transferList: [workerPort], name, signal: global.$_$wallabyVitest.abortSignal() }));"},{from:"async _transformRequest(id) {",to:"async _transformRequest(id) { id = global.$_$wallabyVitest.adjustTransformRequestId(id);"},{from:"onWorkerExit(code) {",to:"async onWallabyWorkerMessage(message) { await global.$_$wallabyVitest.wallabyWorkerMessage(message); }, onWorkerExit(code) {"},{from:"onCollected(files) {",to:"onCollected(files, sessionId) {"},{from:'ctx.report("onCollected", files);',to:'ctx.report("onCollected", files, sessionId);'},{from:"return async (files, invalidates) => {",to:"return async (filesContext, invalidates) => { let files = filesContext.files();"},{from:"globalSetupFiles = await loadGlobalSetupFiles(ctx);",to:"globalSetupFiles = await global.$_$wallabyVitest.loadGlobalSetupFiles(async () => await loadGlobalSetupFiles(ctx));"}];return t.forEach(function(i,r){if(!globalContext.initializationFailed&&e.indexOf(i.from)===-1)if(i.key){var n=t.find(function(t,n){return n!==r&&t.key===i.key&&e.indexOf(t.from)!==-1});n||(globalContext.initializationFailed="Initialization: Wallaby is not compatible with current version of Vitest.\nCould not find "+i.key+" in vitest entry point.")}else globalContext.initializationFailed="Initialization: Wallaby is not compatible with current version of Vitest.\nCould not find "+i.from+" in vitest entry point."}),globalContext.initializationFailed?e:t.reduce(function(e,t){return e.replace(t.from,t.to)},e)}),[4,eval("import('"+url.pathToFileURL(createVitestFileToPatchFileName)+"')")];case 2:if(dependency=_b.sent(),globalContext.initializationFailed)throw new Error(globalContext.initializationFailed);return _a=globalContext,[4,dependency.startVitest([],{},{})];case 3:_a.ctx=_b.sent(),root=globalContext.ctx.config.root+(globalContext.ctx.config.root.endsWith("/")?"":"/"),root.startsWith(globalContext.normalizedLocalProjectDir)&&(globalContext.normalizedRootPrefix=root.substring(globalContext.normalizedLocalProjectDir.length+1)),_b.label=4;case 4:if(globalContext.initializationFailed)throw new Error(globalContext.initializationFailed);return[2]}})})}var __assign=this&&this.__assign||function(){return __assign=Object.assign||function(e){for(var t,i=1,r=arguments.length;i<r;i++){t=arguments[i];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},__assign.apply(this,arguments)},__awaiter=this&&this.__awaiter||function(e,t,i,r){function n(e){return e instanceof i?e:new i(function(t){t(e)})}return new(i||(i=Promise))(function(i,s){function o(e){try{l(r.next(e))}catch(t){s(t)}}function a(e){try{l(r["throw"](e))}catch(t){s(t)}}function l(e){e.done?i(e.value):n(e.value).then(o,a)}l((r=r.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){function i(e){return function(t){return r([e,t])}}function r(i){if(n)throw new TypeError("Generator is already executing.");for(;l;)try{if(n=1,s&&(o=2&i[0]?s["return"]:i[0]?s["throw"]||((o=s["return"])&&o.call(s),0):s.next)&&!(o=o.call(s,i[1])).done)return o;switch(s=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return l.label++,{value:i[1],done:!1};case 5:l.label++,s=i[1],i=[0];continue;case 7:i=l.ops.pop(),l.trys.pop();continue;default:if(o=l.trys,!(o=o.length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){l=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){l.label=i[1];break}if(6===i[0]&&l.label<o[1]){l.label=o[1],o=i;break}if(o&&l.label<o[2]){l.label=o[2],l.ops.push(i);break}o[2]&&l.ops.pop(),l.trys.pop();continue}i=t.call(e,l)}catch(r){i=[6,r],s=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}var n,s,o,a,l={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:i(0),"throw":i(1),"return":i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a},__read=this&&this.__read||function(e,t){var i="function"==typeof Symbol&&e[Symbol.iterator];if(!i)return e;var r,n,s=i.call(e),o=[];try{for(;(void 0===t||t-- >0)&&!(r=s.next()).done;)o.push(r.value)}catch(a){n={error:a}}finally{try{r&&!r.done&&(i=s["return"])&&i.call(s)}finally{if(n)throw n.error}}return o},__spreadArray=this&&this.__spreadArray||function(e,t,i){if(i||2===arguments.length)for(var r,n=0,s=t.length;n<s;n++)!r&&n in t||(r||(r=Array.prototype.slice.call(t,0,n)),r[n]=t[n]);return e.concat(r||Array.prototype.slice.call(t))},__values=this&&this.__values||function(e){var t="function"==typeof Symbol&&Symbol.iterator,i=t&&e[t],r=0;if(i)return i.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")},path=require("path"),url=require("url"),fs=require("fs"),tracer=global.$_$tracer,_=global._,utils=tracer._utils,testRunContext,globalContext={vendorEntryFilePath:void 0,esmHooksPath:void 0,snapshotLogicFilePath:void 0,viteNodeUtils:void 0,ctx:void 0,initializationFailedMessage:"",localProjectRoot:path.dirname(global.wallaby._localNodeModules),originalCacheRoot:global.wallaby._originalCacheRoot,normalizedLocalProjectDir:utils.normalizePath(path.dirname(global.wallaby._localNodeModules)),normalizedProjectCacheDir:utils.normalizePath(global.wallaby._originalCacheRoot),normalizedRootPrefix:void 0,tinyPool:void 0,abortSignal:void 0,globalSetup:!1};utils.patchModule("@rollup/pluginutils",function(e){var t=e("@rollup/pluginutils"),i=t.createFilter;return t.createFilter=function(){var e=i.apply(this,arguments);return function(t){return"string"==typeof t&&(t=t.split("?wallaby=")[0]),e(t)}},t}),utils.patchModulesCode([{files:["vite-plugin-solid/dist/cjs/index.cjs"],replacements:[{from:"function getExtension(filename) {",to:"function getExtension(filename) { filename = filename && filename.split('?')[0];"},{from:"async transform(source, id, transformOptions) {",to:"async transform(source, id, transformOptions) { id = id && id.split('?')[0];"}]}]);var wallabyWorkerMessageProcessors={receiverMessage:function(e){tracer._receiver.send(e)},receiverHighPriorityMessage:function(e){tracer._highPriorityReceiver.send(e)},uncaughtException:function(e){tracer.reportGlobalError(e)},profile:function(e){global.$_$tracer._profileResult=e},inlineSnapshotSaved:function(e){var t=getFileData(e.fileName);if(t){var i=t.inOriginalFilesCache?path.join(globalContext.originalCacheRoot,t.path):e.fileName,r=fs.readFileSync(i).toString(),n=e.content;tracer.sendFileChange({id:t.id,oldContent:r,newContent:n})}},log:function(e){console.log(e)},debugLog:function(e){tracer.debugLog(e)}};global.$_$wallabyVitest={fetchModule:function(e,t){return new Promise(function(i,r){t.vitenode.fetchModule(e).then(function(t){i(wrapFetchedModule(e,t))})["catch"](function(e){r(e)})})},adjustViteConfigInVitestPlugin:function(e){e.esbuild!==!1&&(e.esbuild=e.esbuild||{},e.esbuild.sourcemap=!0,e.esbuild.legalComments="none")},adjustCtxAfterCreateVitest:function(e){e.config.sourcemap=!0,e.config.coverage.enabled=!1,e.config.watch=!1,e.config.isolate=!0,e.config.threads=!0},report:function(e,t,i){var r,n;if("onCollected"===e){if(i&&i!==global.$_$session)return;try{for(var s=__values(t),o=s.next();!o.done;o=s.next()){var a=o.value;a.result&&"fail"===a.result.state&&tracer.reportGlobalError(a.result.error)}}catch(l){r={error:l}}finally{try{o&&!o.done&&(n=s["return"])&&n.call(s)}finally{if(r)throw r.error}}}},WallabyVitePrePlugin:function(){return{name:"vitest:wallaby-preprocessing",load:function(e){var t=getFileData(e);if(t&&t.instrument&&t.inOriginalFilesCache)return fs.readFileSync(path.join(globalContext.originalCacheRoot,t.path),"utf8")}}},WallabyVitePostPlugin:function(){return{name:"vitest:wallaby-postprocessing",enforce:"post",transform:function(e,t){var i;if(t===globalContext.vendorEntryFilePath?i=[{from:"const hasOnlyTasks",to:"global.$_$wallabyVitest.adjustFileTasks(file); const hasOnlyTasks"},{from:"function updateTask(task) {",to:"function updateTask(task) { global.$_$wallabyVitest.updateTask(task); "},{from:"await getFn(test)();",to:"global.$_$wallabyVitest.getFn(test); await getFn(test)();"},{from:"await runSuite(file);",to:"global.$_$wallabyVitest.runSuite(file); await runSuite(file);"},{from:"rpc().onCollected(files);",to:"rpc().onCollected(files, global.$_$session);"}]:t===globalContext.snapshotLogicFilePath&&(i=[{from:'await promises.writeFile(file, transformed, "utf-8");',to:"global.$_$wallabyVitest.inlineSnapshotSaved(file, transformed)"},{from:'if (hasSnapshot && this._updateSnapshot === "all" || ',to:'global.$_$tracer._matchSnapshot({ key, snapshotPath: this.snapshotPath }); if (hasSnapshot && this._updateSnapshot === "all" || '},{from:"this._updateSnapshot = options.updateSnapshot;",to:"this._updateSnapshot = global.$_$wallabyVitest.updateSnapshot();"},{from:'if (this._updateSnapshot === "all" && this._uncheckedKeys.size) {',to:'if ((global.$_$wallabyVitest.canUpdateSnapshot(this)) && this._updateSnapshot === "all" && this._uncheckedKeys.size) {'},{from:'if (hasSnapshot && this._updateSnapshot === "all" || (!hasSnapshot || !snapshotIsPersisted) && (this._updateSnapshot === "new" || this._updateSnapshot === "all")) {',to:'if ((global.$_$wallabyVitest.canUpdateSnapshot(this)) && ((hasSnapshot && this._updateSnapshot === "all" || (!hasSnapshot || !snapshotIsPersisted) && (this._updateSnapshot === "new" || this._updateSnapshot === "all")))) {'},{from:"this.snapshotState = this.getSnapshotState(test);",to:"this.snapshotState = this.getSnapshotState(test); global.$_$wallabyVitest.getSnapshotState(this);"}]),i){if(i.find(function(t){return e.indexOf(t.from)===-1}))throw new Error("Transform ("+t+"): Wallaby is not compatible with current version of Vitest.");return i.reduce(function(e,t){return e.replace(t.from,t.to)},e)}var r=getFileData(t);if(!r||!r.instrument||globalContext.globalSetup)return{code:e};var n,s={code:e,map:this._getCombinedSourcemap()},o=_.extend({},global.$_$tracer._hints);r.test&&(o.allowIgnoringCoverageInTests||(o=_.omit(o,"ignoreCoverage","ignoreCoverageForFile"))),o=_.omit(o,"testFileSelection"),s.map&&s.map.sources&&(s.map.sources=s.map.sources.map(function(e){return e?e:r.path}));var a;s.map&&(r.changeStart||r.logMarkers&&r.logMarkers.length||r.extractedComments&&!r.extractedComments.isCoverageIgnored||r.test)&&(a=new utils.SourceMapConsumer(s.map));var l,c=utils.mapTextPosition(r.changeStart&&r.changePosition,a),u=r.logMarkers||[];try{l=utils.instrument(e,{file:r.id,test:r.test,fileName:path.basename(r.path),testFileChangeStart:c,hints:o,recordValues:global.$_$tracer._autoConsoleLog,recordMatchSnapshotRanges:!0,preserveComments:global.$_$tracer._preserveComments,logMarkers:u.map(function(e){return{originalRange:e.range,range:utils.mapOriginalRangeToTransformed(a,e.range),changeId:e.id,traceId:e.traceId,expanded:e.expanded,"new":e["new"],exp:e.exp,action:e.action}}),extractedComments:utils.remapComments(r.extractedComments,e,a)})}catch(h){throw utils.formatInstrumentationError(h,e,r.path)}return l.liveCommentLines&&s.map?(a||(a=new utils.SourceMapConsumer(s.map)),l.liveCommentLines=_.chain(l.liveCommentLines).map(function(e,t){return{line:parseInt(t,10),column:e+1}}).map(function(e){var t=e.line,i=e.column;return utils.mapTransformedRangeToOriginal(a,[t,i,t,i])}).filter(function(e){return e&&e.length}).map(function(e){return e[0]}).value()):l.liveCommentLines&&(l.liveCommentLines=Object.keys(l.liveCommentLines).map(function(e){return parseInt(e,10)}).filter(function(e){return e}).map(function(e){return e})),testRunContext.instrumentedFiles.set(r.id,{id:r.id,parentFilePath:n&&n.path,transformed:_.omit(s,"code"),instrumented:_.omit(l,"code","map"),ts:r.ts,originalTs:r.originalTs,runnerCacheKey:r.runnerCacheKey,matchSnapshotRanges:l.matchSnapshotRanges&&l.matchSnapshotRanges.length&&a?l.matchSnapshotRanges.map(function(e){return utils.mapTransformedRangeToOriginal(a,e)}):void 0,transformedTime:(new Date).toISOString()}),{code:l.code,map:l.map}}}},viteTestPluginAdjustments:function(){return[this.WallabyVitePrePlugin(),this.WallabyVitePostPlugin()]},adjustedWorkerEntryPoint:function(){return utils.normalizePath(path.resolve(__dirname,"worker.mjs"))},runResult:function(e){e.error&&tracer.reportGlobalError("Error executing tests in vitest:\n"+(e.error.message||"")+"\n"+(e.error.stack||""))},generateWorkerContext:function(){var e=__assign(__assign({},wallaby),{localProjectRoot:globalContext.localProjectRoot});delete e.delayStart,delete e.start,delete e._startWhenReceiverIsReady,delete e.testFramework;var t=testRunContext.childSessionId++;return{wallabyContext:{esmHooksPath:globalContext.esmHooksPath,viteNodeUtils:globalContext.viteNodeUtils,normalizedRootPrefix:globalContext.normalizedRootPrefix,globals:{$_$coverage:$_$coverage,$_$logsSuppressions:$_$logsSuppressions,$_$baseDir:$_$baseDir,$_$slow:$_$slow,$_$tests:$_$tests,$_$testFiles:$_$testFiles,$_$session:$_$session,$_$initialSpecId:1e5*t,$_$traceContext:$_$traceContext,$_$profileRun:$_$profileRun,$_$resolveGetters:$_$resolveGetters,$_$logLimits:$_$logLimits,wallaby:e,$_$childSession:t},tracer:{_filePathToFileData:global.$_$tracer._filePathToFileData,_hints:global.$_$tracer._hints,_autoConsoleLog:global.$_$tracer._autoConsoleLog,_preserveComments:global.$_$tracer._preserveComments,_reportConsoleErrorAsError:global.$_$tracer._reportConsoleErrorAsError,_suppressCallStackEval:global.$_$tracer._suppressCallStackEval,_updateNoMoreThanOneSnapshotPerTestFileRun:global.$_$tracer._updateNoMoreThanOneSnapshotPerTestFileRun,_shouldReportProgramScope:global.$_$tracer._shouldReportProgramScope,_maxLogEntrySize:global.$_$tracer._maxLogEntrySize,_maxTraceSteps:global.$_$tracer._maxTraceSteps,_manualTestRun:global.$_$tracer._manualTestRun,_updateSnapshotsRun:global.$_$tracer._updateSnapshotsRun,_expressionsToEvaluate:global.$_$tracer._expressionsToEvaluate}}}},adjustTransformRequestId:function(e){e=normalizeModuleId(e);var t=getFileData(e);return t&&t.instrument?e+"?wallaby="+t.ts+(globalContext.globalSetup?"G":""):e},wallabyWorkerMessage:function(e){e&&e.sessionId&&e.sessionId!==global.$_$session||wallabyWorkerMessageProcessors[e.type]&&wallabyWorkerMessageProcessors[e.type](e.payload)},tinyPoolOptions:function(e){return e.execArgv=process.execArgv,e},wrapTinyPoolResult:function(e){return globalContext.tinyPool=e,e},abortSignal:function(){return globalContext.abortSignal=testRunContext.abortSignal,globalContext.abortSignal},loadGlobalSetupFiles:function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:globalContext.globalSetup=!0,t.label=1;case 1:return t.trys.push([1,,3,4]),[4,e()];case 2:return[2,t.sent()];case 3:return globalContext.globalSetup=!1,[7];case 4:return[2]}})})}},patchConsoleError(),tracer.start(function(){return __awaiter(void 0,void 0,void 0,function(){var e,t,i,r,n,s,o,a;return __generator(this,function(l){switch(l.label){case 0:if(e=global.$_$session,global.$_$session!==e)return[2,[]];globalContext.abortSignal&&globalContext.abortSignal.emit(),l.label=1;case 1:return l.trys.push([1,3,,4]),[4,initializeVitest()];case 2:return l.sent(),[3,4];case 3:return t=l.sent(),tracer.reportGlobalError("Failed to initialize wallaby vitest.\n"+(t&&t.message||"")+"\n"+(t&&t.stack||"")),[2];case 4:return l.trys.push([4,6,7,8]),tracer.debugLog("Scheduling Vitest Run ("+e+"): "+(new Date).toISOString()),global.$_$session!==e?[2,[]]:[4,globalContext.ctx.runFiles({runSessionId:e,files:function(){return global.$_$session!==e?[]:__spreadArray([],__read(testRunContext.testFiles),!1)}})];case 5:return l.sent(),[3,8];case 6:return i=l.sent(),e===global.$_$session&&(tracer.debugLog("Vitest Error: "+(new Date).toISOString()),i&&console.error(i.stack)),[3,8];case 7:if(e===global.$_$session){if(tracer.debugLog("Vitest Run Complete ("+e+"): "+(new Date).toISOString()),globalContext.ctx.state.errorsSet.size>0)try{for(r=__values(globalContext.ctx.state.errorsSet),n=r.next();!n.done;n=r.next())s=n.value,tracer.reportGlobalError(s)}catch(c){o={error:c}}finally{try{n&&!n.done&&(a=r["return"])&&a.call(r)}finally{if(o)throw o.error}}globalContext.ctx.snapshot&&globalContext.ctx.snapshot.summary&&globalContext.ctx.snapshot.summary.uncheckedKeysByFile&&globalContext.ctx.snapshot.summary.uncheckedKeysByFile.forEach(function(e){if(e.keys&&e.keys.length){var t=e.keys.length+" snapshot"+(e.keys.length>1?"s":"")+" obsolete "+("\n\t"+e.keys.join("\n\t")||"");tracer.reportGlobalErrorObject({message:t,stack:t+"\n    at "+e.filePath+":1:0",snapshot:!0,allowNotMappedStackLines:!0})}}),tracer.resetEnvGlobal(),tracer.complete(),testRunContext=void 0}else tracer.debugLog("Vitest Run Abandoned ("+e+"): "+(new Date).toISOString());return[7];case 8:return[2]}})})}),module.exports={init:function(e){var t=[];return testRunContext={testFiles:e,instrumentedFiles:new Map,fetchedModules:new Map,childSessionId:1,abortSignal:{off:function(e,i){return t.push(i)},once:function(){return t.length=0},emit:function(){return t.forEach(function(e){return e()})}}},{configure:function(){throw new Error("Vitest does not support configuration modifications. Please let us know if this is an issue for you at: https:/github.com/wallabyjs/public/issues")}}}};