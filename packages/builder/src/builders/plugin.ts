import { DotenvRunOptions, Dict } from "@dotenv-run/core";
import { DotenvRunPlugin } from "@dotenv-run/webpack";
import type { Configuration } from "webpack";

function escapeStringRegexp(str: string) {
  return str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}

export function plugin(options: DotenvRunOptions, ssr = false) {
  const _options = { ...options, appEnv: "NG_APP_ENV" };
  const dotEnvPlugin = new DotenvRunPlugin(_options, ssr);
  const raw = dotEnvPlugin.raw;
  return {
    webpackConfiguration: async (webpackConfig: Configuration) => {
      webpackConfig.plugins.push(dotEnvPlugin);
      return webpackConfig;
    },
    indexHtml: async (content: string) => {
      return Object.keys(raw).reduce(
        (html, key) =>
          html.replace(
            new RegExp("%" + escapeStringRegexp(key) + "%", "g"),
            raw[key]
          ),
        content
      );
    },
  };
}
