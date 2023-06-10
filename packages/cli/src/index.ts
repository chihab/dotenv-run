#!/usr/bin/env node

import { paths, expand } from "@dotenv-run/core";
import * as chalk from "chalk";
import * as spawn from "cross-spawn";
import * as minimist from "minimist";

const argv = minimist(process.argv.slice(2), {
  string: ["root"],
  boolean: ["print"],
  alias: { h: "help", p: "print", r: "root" },
});

function help() {
  console.log(`
  Usage: dotenv-run [options] -- <command>
  
  Options:
  
    -h, --help     output usage information
    -p, --print    print the paths that will be loaded
    -r, --root     root directory to search for .env files, defaults to current working directory
    
  Examples:
  
    dotenv-run -- npm start
    dotenv-run -p -r ../.. -- npm start
  `);
}

if (argv.h) {
  help();
} else {
  const cmd = argv._[0];
  if (!cmd) {
    help();
    process.exit(1);
  }
  const envPaths = paths(process.env.NODE_ENV, argv.r || process.cwd());
  if (argv.p) {
    envPaths.forEach((envPath) => {
      console.log(`${chalk.green("✔")} ${envPath}`);
    });
  }
  expand(envPaths);
  spawn(cmd, argv._.slice(1), { stdio: "inherit" }).on(
    "exit",
    function (exitCode, signal) {
      if (typeof exitCode === "number") {
        process.exit(exitCode);
      } else {
        process.kill(process.pid, signal);
      }
    }
  );
}
