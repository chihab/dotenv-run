import { type Dict } from "@dotenv-run/core";
import { readFileSync, writeFileSync } from "fs";
import * as glob from "glob";
import { variablesReducer } from "./variables-reducer";

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
  raw: Dict,
  ssr = false
) {
  try {
    glob.sync(`${outputDir}/browser/**/*.html`).forEach((filePath) => {
      replaceInFile(filePath, raw);
    });
    if (ssr) {
      glob.sync(`${outputDir}/server/**/index.server.html`).forEach((filePath) => {
        replaceInFile(filePath, raw);
      });
    }
  } catch (e) {
    console.error(e);
  }
}

export function devServerIndexHtml(
  content: string,
  dict: Dict
) {
  return variablesReducer(content, dict);
}
