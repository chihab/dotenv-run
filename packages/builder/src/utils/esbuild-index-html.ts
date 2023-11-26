import { env, type Dict, type DotenvRunOptions } from "@dotenv-run/core";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { variablesReducer } from "./variables-reducer";
import * as glob from "glob";

function replaceInFile(filePath: string, raw: Dict) {
  try {
    const content = readFileSync(filePath, "utf-8");
    writeFileSync(filePath, variablesReducer(content, raw));
  } catch (e) {
    console.log(
      `❌ Failed to replace variables in ${filePath} ❌`
    );
    throw e;
  }
}

export function indexHtml(
  outputDir: string,
  dotEnvOptions: DotenvRunOptions,
  ssr = false
) {
  try {
    const raw = env(dotEnvOptions).raw;
    glob.sync(`${outputDir}/browser/**/*.html`).forEach((filePath) => {
      replaceInFile(filePath, raw);
    });
    if (ssr) {
      replaceInFile(resolve(outputDir, "server/index.server.html"), raw);
    }
  } catch (e) {
    console.error(e);
  }
}

export function devServerIndexHtml(
  content: string,
  dotEnvOptions: DotenvRunOptions
) {
  const raw = env(dotEnvOptions).raw;
  return variablesReducer(content, raw);
}
