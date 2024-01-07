import { type DotenvRunOptions, env } from "@dotenv-run/core";
import replace from "@rollup/plugin-replace";
import { Plugin } from "rollup";

const dotenvRun = (options: DotenvRunOptions): Plugin => {
  const { full } = env(options);
  return {
    name: "dotenv-run",
    ...replace({
      preventAssignment: true,
      values: full,
    }),
  };
}

export { dotenvRun, DotenvRunOptions };
export default dotenvRun;
