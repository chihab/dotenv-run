import { Dict, DotenvRunOptions, env } from "@dotenv-run/core";
import type { Plugin } from "esbuild";

export function plugin(options: DotenvRunOptions): Plugin[] {
  const _options = {
    ...options,
    appEnv: "NG_APP_ENV",
  };
  return [
    {
      name: "dotenv-run",
      setup: (build) => {
        let full: Dict = undefined;
        const define = build.initialOptions.define ?? {};
        full = env(_options).full;
        build.initialOptions.define = {
          ...full,
          ...define,
        };
      },
    },
  ];
}
