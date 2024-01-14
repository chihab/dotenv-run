#!/usr/bin/env node

import { env } from "@dotenv-run/core";
import minimist from "minimist";
import { run } from "./run.js";

const argv = minimist(process.argv.slice(2), {
  string: ["verbose", "env", "file", "root"],
  boolean: ["help", "unsecure", "override"],
  alias: {
    verbose: "v",
    unsecure: "u",
    env: "e",
    root: "r",
    file: "f",
    help: "h",
    override: "o",
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
    -v, --verbose [regexp]                  print debug information, display environment variables filtered by regexp if provided
    -u, --unsecure                          display environment variables in debug output (default: false)
    -e, --env  [environment]                environment to load (default: NODE_ENV)
    -r, --root                              root directory to start searching for .env files (default: root workspace directory)
    -f, --file [.env,.secrets,.env.api]     specific .env files to load (default: .env)
    -o, --override                          override existing environment variables (default: false)
    -h, --help                              output usage information
    
  Examples:
    dotenv-run -d
    dotenv-run -- npm start
    dotenv-run -f .env,.env.api -- npm start
  `);
}

function parseList(input: string | string[]): string[] {
  return typeof input === "string" ? input.split(",") : input;
}

if (argv.h) {
  help();
} else {
  const cmd = argv._[0];
  const verbose = argv.hasOwnProperty("v");
  if (!verbose && !cmd) {
    help();
    process.exit(1);
  }
  const root = argv.r;
  const files = parseList(argv.f ?? ".env");
  const cwd = process.cwd();
  env({
    environment: argv.e ?? process.env.NODE_ENV,
    cwd,
    root,
    files,
    prefix: argv.v,
    verbose,
    unsecure: argv.u,
    dotenv: { override: argv.o },
  });
  if (cmd) run(cmd, argv._.slice(1));
}
