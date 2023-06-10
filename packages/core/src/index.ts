import { config } from "dotenv";
import { expand as dotenvExpand } from "dotenv-expand";
import * as fs from "fs";
import * as path from "path";

export type Env = Record<string, string>;

function isSubfolder(parent: string, child: string) {
  return path.relative(parent, child).startsWith("..");
}

function getAbsoluteEnvPath(envPath: string, cwd: string) {
  const _envPath = path.isAbsolute(envPath)
    ? envPath
    : path.resolve(cwd, envPath);
  return fs.existsSync(_envPath)
    ? fs.lstatSync(_envPath).isDirectory()
      ? _envPath
      : path.dirname(_envPath)
    : cwd;
}

function getPathsDownTo(envPath: string, destination: string) {
  let currentPath = destination;
  const paths = [currentPath];
  while (currentPath !== envPath && currentPath !== "/") {
    currentPath = path.dirname(currentPath);
    paths.push(currentPath);
  }
  return paths;
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

export function paths(environment: string, root: string, cwd = process.cwd()) {
  const _root = getAbsoluteEnvPath(root, cwd); // resolved path to .env file
  let envPaths: string[] = [];
  if (isSubfolder(_root, cwd)) {
    envPaths = [_root];
  } else {
    envPaths = getPathsDownTo(_root, cwd);
  }
  return envPaths
    .map((envPath) => path.join(envPath, ".env"))
    .flatMap((envPath) => buildEnvFiles(environment, envPath))
    .filter((envPath) => fs.existsSync(envPath));
}

export function expand(envPaths: string[]) {
  envPaths.forEach((dotenvFile) => {
    dotenvExpand(
      config({
        path: dotenvFile
      })
    );
  });
}

export function filter(env: Env, prefix: RegExp): Env {
  return Object.keys(env)
    .filter((key) => prefix.test(key))
    .sort() // sort keys to make output more deterministic
    .reduce<Env>((env, key) => {
      env[key] = process.env[key];
      return env;
    }, {});
}
