export type Dict = Record<string, string>;

export type DotenvRun = {
  raw: Dict;
  stringified: Dict;
  full: Dict;
};

export function build(
  processEnv: Dict,
  runtime: boolean,
  globalVar: string,
  define?: string
) {
  const values = Object.keys(processEnv).reduce<DotenvRun>(
    (env, key) => {
      const value =
        runtime && key !== "NODE_ENV"
          ? `globalThis.${globalVar}.${key}`
          : JSON.stringify(processEnv[key]);
      env.raw[key] = processEnv[key];
      env.stringified[key] = value;
      env.full[`process.env.${key}`] = value;
      env.full[`import.meta.env.${key}`] = value;
      return env;
    },
    {
      raw: {},
      stringified: define
        ? {
            [define]: runtime
              ? `globalThis.${globalVar}`
              : JSON.stringify(processEnv),
          }
        : {},
      full: define
        ? {
            [define]: runtime
              ? `globalThis.${globalVar}`
              : JSON.stringify(processEnv),
          }
        : {},
    }
  );
  return values;
}
