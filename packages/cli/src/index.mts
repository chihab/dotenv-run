#!/usr/bin/env node

import { env, findRootPath } from "@dotenv-run/core";
import chalk from "chalk";
import minimist from "minimist";
import { run } from "./run.js";

const argv = minimist(process.argv.slice(2), {
  string: ["debug", "env", "file", "root", "prefix"],
  boolean: ["help", "unsecure", "override"],
  alias: {
    debug: "d",
    env: "e",
    file: "f",
    root: "r",
    prefix: "p",
    help: "h",
    override: "o",
    unsecure: "u",
  },
  default: {
    unsecure: false,
    help: false,
    override: false,
  },
});

function help() {
  console.log(`
  Usage: dotenv-run [options] -- <command>
  
  Options:
    -d, --debug [regexp]                    print debug information, display environment variables filtered by regexp if provided
    -e, --env  [environment]                environment to load (default: NODE_ENV)
    -f, --file [.env,.secrets,.env.api]     specific .env files to load (default: .env, incompatible with root and prefix options)
    -r, --root                              root directory to search for .env files, defaults to current working directory
    -p, --prefix [.env,.secrets,.env.api]   .env file prefixes to load (default: .env)
    -h, --help                              output usage information
    -o, --override                          override existing environment variables (default: false)
    -u, --unsecure                          display environment variables in debug output (default: false)
    
  Examples:
    dotenv-run -d
    dotenv-run -- npm start
    dotenv-run -r ../.. -p .env,.secrets -- npm start
    dotenv-run -f ../.env,../.env.api -- npm start
  `);
}

function parseList(input: string | string[]): string[] {
  return typeof input === "string" ? input.split(",") : input;
}

if (argv.h) {
  help();
} else {
  const cmd = argv._[0];
  const verbose = argv.hasOwnProperty("d");
  if (!verbose && !cmd) {
    help();
    process.exit(1);
  }
  if (argv.f && (argv.r || argv.p)) {
    console.log(chalk.red("option -f cannot be used with -r or -p"));
    console.log("use -f to specify specific .env files");
    console.log("\tdotenv-run -f ./.env,../../secrets");
    console.log(
      "use -r to specify the directory from which to search for files prefixed with -p down to cwd"
    );
    console.log("\tdotenv-run -r ../.. -p .env,.env.api");
    process.exit(1);
  }
  const root = argv.f ? undefined : argv.r ?? findRootPath();
  const files = argv.f ? parseList(argv.f) : parseList(argv.p);
  const cwd = argv.f ? undefined : process.cwd();
  env({
    environment: argv.e ?? process.env.NODE_ENV,
    cwd,
    root,
    files,
    prefix: argv.d,
    verbose,
    unsecure: argv.u,
    dotenv: { override: argv.o },
  });
  if (cmd) run(cmd, argv._.slice(1));
}
