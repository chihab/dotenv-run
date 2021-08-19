import { config } from "dotenv";
import * as dotenv_expand from "dotenv-expand";
import * as webpack from "webpack";
import { Configuration } from "webpack";
import * as fs from "fs";
import * as path from "path";

function escapeStringRegexp(str: string) {
  return str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}

function getClientEnvironment(prefix: RegExp, env: string) {
  const dotenvBase = path.resolve(process.cwd(), ".env");
  const dotenvFiles = [
    `${dotenvBase}.${env}.local`,
    // Don't include `.env.local` for `test` environment
    // since normally you expect tests to produce the same
    // results for everyone
    env !== "test" && `${dotenvBase}.local`,
    `${dotenvBase}.${env}`,
    dotenvBase,
  ].filter(Boolean);
  // Load environment variables from .env* files. Suppress warnings using silent
  // if this file is missing. dotenv will never modify any environment variables
  // that have already been set.  Variable expansion is supported in .env files.
  // https://github.com/motdotla/dotenv
  // https://github.com/motdotla/dotenv-expand
  dotenvFiles.forEach((dotenvFile) => {
    console.log(`Checking ${dotenvFile}`);
    if (fs.existsSync(dotenvFile)) {
      dotenv_expand(
        config({
          path: dotenvFile,
        })
      );
    }
  });
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
  const { raw, stringified } = getClientEnvironment(/^NG_APP/i, options.env);
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
