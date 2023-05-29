import { config } from "dotenv";
import * as dotenv_expand from "dotenv-expand";
import * as webpack from "webpack";
import { Configuration } from "webpack";
import * as fs from "fs";
import * as path from "path";
import { NgxEnvOptions } from "./ngx-env/ngx-env-schema";
import * as chalk from 'chalk';

const NG_APP_ENV = 'NG_APP_ENV';

function escapeStringRegexp(str: string) {
  return str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}

function getEnvFilePath(envPath: string) {
  const _envPath = path.isAbsolute(envPath) ? envPath : path.resolve(process.cwd(), envPath);
  return fs.lstatSync(_envPath).isDirectory() ? path.join(_envPath, '.env') : _envPath;
}

function getClientEnvironment(envPrefix: RegExp, envPath: string) {
  const appEnv = process.env[NG_APP_ENV] || process.env.NODE_ENV;
  const dotenvBase = getEnvFilePath(envPath);
  const dotenvFiles = [
    appEnv !== "test" && `${dotenvBase}.${appEnv}.local`, // .env.development.local, .env.test.local, .env.production.local
    // Don't include `.env.local` for `test` environment
    // since normally you expect tests to produce the same
    // results for everyone
    appEnv && `${dotenvBase}.${appEnv}`, // .env.development, .env.test, .env.production
    appEnv !== "test" && `${dotenvBase}.local`, // .env.local
    dotenvBase, // .env
  ].filter(Boolean);
  console.log(`${chalk.green('-')} Environment files: `);
  // Load environment variables from .env* files. Suppress warnings using silent
  // if this file is missing. dotenv will never modify any environment variables
  // that have already been set.  Variable expansion is supported in .env files.
  // https://github.com/motdotla/dotenv
  // https://github.com/motdotla/dotenv-expand
  dotenvFiles.forEach((dotenvFile) => {
    if (fs.existsSync(dotenvFile)) {
      console.log(`${chalk.green(' ✔')} ${dotenvFile}`);
      dotenv_expand(
        config({
          path: dotenvFile,
        })
      );
    }
  });
  const processEnv = {
    ...process.env,
    [NG_APP_ENV]: appEnv,
  };
  console.log(`- Injected keys:`);
  const values = Object.keys(processEnv)
    .filter((key) => envPrefix.test(key) || key === NG_APP_ENV)
    .sort()
    .reduce(
      (env, key) => {
        const value = JSON.stringify(processEnv[key]);
        env.raw[key] = processEnv[key];
        env.stringified[key] = value;
        env.full[`process.env.${key}`] = value;
        env.full[`import.meta.env.${key}`] = value;
        console.log(`${chalk.green(' ✔')} ${key}`);
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

export function plugin(options: NgxEnvOptions, ssr = false) {
  console.log(`------- ${chalk.bold('@ngx-env/builder')} -------`)
  console.log(`${chalk.green('-')} Prefix: `, options.prefix);
  const { raw, stringified, full } = getClientEnvironment(new RegExp(`^${options.prefix}`, 'i'), options.path);
  console.log('---------------------------------\n');
  return {
    webpackConfiguration: async (webpackConfig: Configuration) => {
      webpackConfig.plugins.push(
        new webpack.DefinePlugin(ssr ? { ...full } : {
          "process.env": stringified,
          "import.meta.env": stringified,
        })
      );
      return webpackConfig;
    },
    indexHtml: async (content: string) => {
      const rawWithEnv = {
        ...raw,
        [NG_APP_ENV]: raw[NG_APP_ENV],
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
