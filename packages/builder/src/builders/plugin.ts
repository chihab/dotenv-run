import { expand, paths, filter } from "@dotenv-run/core";
import { NgxEnvOptions } from "./ngx-env/ngx-env-schema";
import * as webpack from "webpack";
import { Configuration } from "webpack";
import * as chalk from "chalk";

const NG_APP_ENV = "NG_APP_ENV";

function escapeStringRegexp(str: string) {
  return str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}

type Dict = Record<string, string>;

function prepareEnv(processEnv: any, appEnv: string) {
  const values = Object.keys({ ...processEnv, [NG_APP_ENV]: appEnv }).reduce<{
    raw: Dict;
    stringified: Dict;
    full: Dict;
  }>(
    (env, key) => {
      const value = JSON.stringify(processEnv[key]);
      env.raw[key] = processEnv[key];
      env.stringified[key] = value;
      env.full[`process.env.${key}`] = value;
      env.full[`import.meta.env.${key}`] = value;
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

export function plugin(options: NgxEnvOptions, cwd: string, ssr = false) {
  const appEnv = process.env[NG_APP_ENV] || process.env.NODE_ENV;
  const envPaths = paths(appEnv, options.root, cwd);

  if (options.verbose) {
    console.log(`------- ${chalk.bold("@ngx-env/builder")} -------`);
    expand(envPaths);
    console.log(`${chalk.green("-")} Prefix: `, options.prefix);
    console.log(`${chalk.green("-")} Verbose mode`);
    console.log(`${chalk.green("-")} Environment files: `);
    envPaths.forEach((envPath) => {
      console.log(`${chalk.green(" ✔")} ${envPath}`);
    });
    console.log(`- Injected keys:`);
    const values = filter(process.env, new RegExp(options.prefix, "i"));
    console.log(`${chalk.green(" ✔")} ${NG_APP_ENV} => ${appEnv}`);
    for (const key in values) {
      console.log(`${chalk.green(" ✔")} ${key}`);
    }
    console.log("---------------------------------\n");
  }

  const { raw, stringified, full } = prepareEnv(process.env, appEnv);
  return {
    webpackConfiguration: async (webpackConfig: Configuration) => {
      webpackConfig.plugins.push(
        new webpack.DefinePlugin(
          ssr
            ? { ...full }
            : {
                "process.env": stringified,
                "import.meta.env": stringified,
              }
        )
      );
      return webpackConfig;
    },
    indexHtml: async (content: string) => {
      const rawWithEnv: Dict = {
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
