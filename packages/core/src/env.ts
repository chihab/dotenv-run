import chalk from "chalk";
import * as fs from "fs";
import * as path from "path";
import { build } from "./build.js";
import { expand } from "./expand.js";
import type { DotenvRunOptions } from "./options.js";
import { getAbsoluteEnvPath, getPathsDownTo, isSubfolder } from "./utils.js";

export type Env = Record<string, string>;

function print(options: DotenvRunOptions, envPaths: string[], values: Env) {
  console.log("---------------------------------");
  console.log(`${chalk.green("-")} Environment: `, options.environment);
  if (options.root) {
    console.log(`${chalk.green("-")} Root directory: `, options.root);
  }
  if (options.cwd) {
    console.log(`${chalk.green("-")} Working directory: `, options.cwd);
  }
  if (options.files) {
    console.log(`${chalk.green("-")} Files :`, options.files.join(", "));
  }
  if (envPaths.length === 0) {
    console.log(
      `${chalk.green("-")} Environment files: ${chalk.yellow("none")}`
    );
  } else {
    console.log(`${chalk.green("-")} Environment files: `);
    envPaths.forEach((envPath) => {
      console.log(`${chalk.green(" ✔")} ${envPath}`);
    });
  }
  if (options.prefix) {
    console.log(`${chalk.green("-")} Prefix: `, options.prefix);
  }
  if (Object.keys(values).length > 0 && options.prefix) {
    console.log(
      `${chalk.green("-")} Environment variables: ${chalk.yellow(options.prefix) ?? ""} ${
        options.unsecure ? chalk.red("(Unsecure Mode)") : ""
      }`
    );
    for (const key in values) {
      if (options.unsecure) {
        console.log(`${chalk.green(" ✔")} ${chalk.yellow(key)} ${values[key]}`);
      } else {
        console.log(`${chalk.green(" ✔")} ${chalk.yellow(key)}`);
      }
    }
  }
  console.log("---------------------------------\n");
}

function filter(env: Env, prefix: RegExp, nodeEnv: boolean): Env {
  return Object.keys(env)
    .filter(
      (key) =>
        env[key] !== undefined &&
        ((nodeEnv && key === "NODE_ENV") || prefix.test(key))
    )
    .sort() // sort keys to make output more deterministic
    .reduce<Env>((env, key) => {
      env[key] = process.env[key];
      return env;
    }, {});
}

function buildEnvFiles(environment: string, envPath: string) {
  return [
    environment !== "test" && `${envPath}.${environment}.local`, // .env.development.local, .env.test.local, .env.production.local
    // Don't include `.env.local` for `test` environment
    // since normally you expect tests to produce the same
    // results for everyone
    environment && `${envPath}.${environment}`, // .env.development, .env.test, .env.production
    environment !== "test" && `${envPath}.local`, // .env.local
    envPath, // .env
  ].filter(Boolean);
}

function paths({ environment, root, cwd, files }: DotenvRunOptions): {
  root: string;
  files: string[];
} {
  let envFiles: string[] = Array.isArray(files) ? files : [files];
  let _root = root;
  if (root) {
    _root = getAbsoluteEnvPath(root, cwd);
    const envPaths = isSubfolder(_root, cwd)
      ? [_root]
      : getPathsDownTo(_root, cwd);
    const uniqueEnvFiles = Array.from(new Set(envFiles));
    envFiles = envPaths.flatMap((envPath) =>
      uniqueEnvFiles.map((envFile) => path.join(envPath, envFile))
    );
  }
  const _files = envFiles
    .map((envPath) => path.resolve(cwd, envPath))
    .flatMap((envPath) => buildEnvFiles(environment, envPath))
    .filter((envPath) => fs.existsSync(envPath));
  return {
    root: _root,
    files: _files,
  };
}

export function env({
  cwd = process.cwd(),
  environment = process.env.NODE_ENV,
  files = [".env"],
  dotenv,
  prefix,
  verbose,
  nodeEnv = true,
  builtIn = {},
  ...rest
}: DotenvRunOptions = {}) {
  const options: DotenvRunOptions = {
    cwd,
    environment,
    files,
    dotenv,
    prefix,
    verbose,
    nodeEnv,
    ...rest,
  };
  const { root, files: envPaths } = paths(options);
  expand(envPaths, dotenv);
  const processEnv = process.env;
  const values = prefix
    ? filter(
        processEnv,
        typeof prefix === "string" ? new RegExp(prefix, "i") : prefix,
        nodeEnv
      )
    : processEnv;
  const allValues = { ...values, ...builtIn };
  if (verbose) {
    print({ ...options, root }, envPaths, allValues);
  }
  return build(allValues);
}

export const plugin = env;
