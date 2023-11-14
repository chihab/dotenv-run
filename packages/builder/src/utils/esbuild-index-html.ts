import { ApplicationBuilderOptions } from "@angular-devkit/build-angular";
import { env } from "@dotenv-run/core";
import { DotenvRunOptions } from "@dotenv-run/webpack";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { NgxEnvSchema } from "../builders/ngx-env/ngx-env-schema";
import { variablesReducer } from "./variables-reducer";

export function indexHtml(
  options: ApplicationBuilderOptions & NgxEnvSchema,
  dotEnvOptions: DotenvRunOptions
) {
  const browserPath = resolve(
    dotEnvOptions.cwd,
    options.outputPath,
    "browser/index.html"
  );
  const serverPath = resolve(
    dotEnvOptions.cwd,
    options.outputPath,
    "server/index.server.html"
  );
  const browserIndex = readFileSync(browserPath, "utf-8");
  const serverIndex = readFileSync(serverPath, "utf-8");
  const raw = env(dotEnvOptions).raw;
  writeFileSync(browserPath, variablesReducer(browserIndex, raw));
  writeFileSync(serverPath, variablesReducer(serverIndex, raw));
}

export function devServerIndexHtml(
  content: string,
  dotEnvOptions: DotenvRunOptions
) {
  const raw = env(dotEnvOptions).raw;
  return variablesReducer(content, raw);
}
