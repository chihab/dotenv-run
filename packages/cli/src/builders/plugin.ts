import { config } from "dotenv";
import * as dotenv_expand from "dotenv-expand";
import * as webpack from "webpack";
import { Configuration } from "webpack";

const env = config();
dotenv_expand(env);

function escapeStringRegexp(str: string) {
  return str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}

function getClientEnvironment(prefix: RegExp) {
  return Object.keys(process.env)
    .filter((key) => prefix.test(key))
    .reduce(
      (env, key) => {
        env.raw[key] = process.env[key];
        env.stringified[key] = JSON.stringify(process.env[key]);
        return env;
      },
      {
        raw: {},
        stringified: {},
      }
    );
}

export function plugin(options?: any) {
  const { raw, stringified } = getClientEnvironment(/^NG_APP/i);
  return {
    webpackConfiguration: async (webpackConfig: Configuration) => {
      webpackConfig.plugins.push(
        new webpack.DefinePlugin({
          "process.env": stringified,
          "process.env.NODE_ENV": JSON.stringify(options.env),
        })
      );
      return webpackConfig;
    },
    indexHtml: async (content: string) => {
      const rawWithEnv = {
        ...raw,
        NODE_ENV: options.env,
      };
      return Object.keys(rawWithEnv).reduce(
        (html, key) =>
          html.replace(
            new RegExp("%" + escapeStringRegexp(key) + "%", "g"),
            rawWithEnv[key]
          ),
        content
      );
    },
  };
}
