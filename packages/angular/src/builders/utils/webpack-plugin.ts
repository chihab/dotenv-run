import type { DotenvRunOptions } from "@dotenv-run/core";
import { DotenvRunPlugin } from "@dotenv-run/webpack";
import type { Configuration } from "webpack";
import { indexHtmlTransformer } from "./index-html-transform";

export function plugin(options: DotenvRunOptions, ssr = false) {
  const dotEnvPlugin = new DotenvRunPlugin(
    { ...options, environment: process.env.NODE_ENV, nodeEnv: false },
    ssr
  );
  const raw = dotEnvPlugin.raw;
  return {
    raw,
    webpackConfiguration: (webpackConfig: Configuration) => {
      webpackConfig.plugins.push(dotEnvPlugin);
      return webpackConfig;
    },
    indexHtml: async (content: string) => {
      return indexHtmlTransformer(content, raw, false, options.runtime);
    },
  };
}
