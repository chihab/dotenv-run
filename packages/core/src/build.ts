export type Dict = Record<string, string>;

export type DotenvRun = {
  raw: Dict;
  stringified: Dict;
  full: Dict;
};

export function build(processEnv: Dict) {
  const values = Object.keys(processEnv).reduce<DotenvRun>(
    (env, key) => {
      const value = JSON.stringify(processEnv[key]);
      env.raw[key] = processEnv[key];
      env.stringified[key] = value;
      env.full[`process.env.${key}`] = value;
      env.full[`import.meta.env.${key}`] = value;
      return env;
    },
    {
      raw: {},
      stringified: {},
      full: {},
    }
  );
  return values;
}
