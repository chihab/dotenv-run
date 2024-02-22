import type { DotenvRunOptions } from "@dotenv-run/core";
import { DotenvRunPlugin } from "@dotenv-run/webpack";
import type { Configuration } from "webpack";
import { variablesReducer } from "./variables-reducer";
import { ExecutionTransformer } from "@angular-devkit/build-angular";

export function plugin(options: DotenvRunOptions, ssr = false) {
  const dotEnvPlugin = new DotenvRunPlugin(
    { ...options, environment: process.env.NODE_ENV, nodeEnv: false },
    ssr
  );
  const raw = dotEnvPlugin.raw;
  return {
    webpackConfiguration: (webpackConfig: Configuration) => {
      webpackConfig.plugins.push(dotEnvPlugin);
      return webpackConfig;
    },
    indexHtml: async (content: string) => variablesReducer(content, raw),
  };
}
