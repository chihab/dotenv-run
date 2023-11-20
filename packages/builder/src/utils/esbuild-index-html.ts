import { env, type Dict, type DotenvRunOptions } from "@dotenv-run/core";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { variablesReducer } from "./variables-reducer";

function replaceInFile(outputDir: string, outputPath: string, raw: Dict) {
  try {
    const filePath = resolve(outputDir, outputPath);
    const content = readFileSync(filePath, "utf-8");
    writeFileSync(filePath, variablesReducer(content, raw));
  } catch (e) {
    console.log(
      `❌ Failed to replace variables in ${outputDir}/${outputPath} ❌`
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
    replaceInFile(outputDir, "browser/index.html", raw);
    if (ssr) {
      replaceInFile(outputDir, "server/index.server.html", raw);
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
