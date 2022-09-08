export function resolve(specifier, context, defaultResolve) {
  if (specifier === 'ava') {
    const resolve = defaultResolve(specifier, context, defaultResolve);
    if (resolve && resolve.url && resolve.url.endsWith('ava/entrypoints/main.mjs')) {
      return { ...resolve, url: `${resolve.url}?session=${Date.now()}` };
    }
  }
  return defaultResolve(specifier, context, defaultResolve);
}

// noinspection JSUnusedGlobalSymbols
export async function getSource(url, context, defaultGetSource) {
  if ((url.indexOf && url.indexOf('ava/entrypoints/main.mjs') !== -1) || url.endsWith('ava/index.js')) {
    return {
      source: `
const defaultExport = (...args) => {
  const runner = global.$_$tracer.avaRunner;
  const avaModuleExports = runner.test || runner.chain.test || runner.chain;
  return avaModuleExports.apply(this, args);
}

const runner = global.$_$tracer.avaRunner;
const initialValue = runner.test || runner.chain.test || runner.chain;
Object.keys(initialValue).forEach(key => {
  if (typeof initialValue[key] === "function") {    
    defaultExport[key] = (...args) => {
      const runner = global.$_$tracer.avaRunner;
      const avaModuleExports = runner.test || runner.chain.test || runner.chain;
      return avaModuleExports[key].apply(this, args);
    }
  }
});

export default defaultExport;

export const test = defaultExport;
`,
    };
  }
  return defaultGetSource(url, context, defaultGetSource);
}
