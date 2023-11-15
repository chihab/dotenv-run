import type { DotenvRunOptions } from "@dotenv-run/core";
import { DotenvRunPlugin } from "@dotenv-run/webpack";
import type { Configuration } from "webpack";
import { variablesReducer } from "../utils/variables-reducer";

export function plugin(options: DotenvRunOptions, ssr = false) {
  const _options = { ...options, appEnv: "NG_APP_ENV" };
  const dotEnvPlugin = new DotenvRunPlugin(_options, ssr);
  const raw = dotEnvPlugin.raw;
  return {
    webpackConfiguration: async (webpackConfig: Configuration) => {
      webpackConfig.plugins.push(dotEnvPlugin);
      return webpackConfig;
    },
    indexHtml: async (content: string) => variablesReducer(content, raw),
  };
}
