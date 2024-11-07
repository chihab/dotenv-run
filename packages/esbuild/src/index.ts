import { Dict, env, type DotenvRunOptions } from "@dotenv-run/core";
import type { Plugin, PluginBuild } from "esbuild";

function definePluginBuild(build: PluginBuild, env: Dict): void {
  const define = build.initialOptions.define ?? {};
  console.log(define);
  build.initialOptions.define = {
    ...env,
    ...define,
  };
}

const dotenvRun = (options: DotenvRunOptions): Plugin => {
  return {
    name: "dotenv-run",
    setup(build) {
      const full = env(options).full;
      definePluginBuild(build, full);
    },
  };
};

const dotenvRunDefine = (env: Dict): Plugin => {
  return {
    name: "dotenv-run-define",
    setup(build) {
      console.log("dotenvRunDefine setup");
      definePluginBuild(build, env);
    },
  };
};

export { DotenvRunOptions, dotenvRun, dotenvRunDefine };
export default dotenvRun;
