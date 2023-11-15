import { ApplicationBuilderOptions } from "@angular-devkit/build-angular";
import { Spinner } from "@angular/cli/src/utilities/spinner";
import { env } from "@dotenv-run/core";
import type { DotenvRunOptions } from "@dotenv-run/core";
import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import { NgxEnvSchema } from "../builders/ngx-env/ngx-env-schema";
import { variablesReducer } from "./variables-reducer";

export async function indexHtml(
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
  const raw = env(dotEnvOptions).raw;
  const spinner = new Spinner();
  try {
    spinner.start("NGX_ENV: Starting variables replace on index.html...");
    const [browserIndex, serverIndex] = await Promise.all([
      readFile(browserPath, "utf-8"),
      readFile(serverPath, "utf-8"),
    ]);
    try {
      await Promise.all([
        writeFile(browserPath, variablesReducer(browserIndex, raw)),
        writeFile(serverPath, variablesReducer(serverIndex, raw)),
      ]);
      spinner.stop();
      spinner.succeed("NGX_ENV: Variables replacement succesfully ended");
      process.exit(0);
    } catch (error) {
      spinner.stop();
      spinner.fail("NGX_ENV: Variables replacement ended with errors");
      spinner.fail(error as any);
      process.exit(1);
    }
  } catch (error) {
    spinner.stop();
    spinner.fail("NGX_ENV: Cannot read index.html in dist folder");
    spinner.fail(error as any);
    process.exit(1);
  }
}

export function devServerIndexHtml(
  content: string,
  dotEnvOptions: DotenvRunOptions
) {
  const raw = env(dotEnvOptions).raw;
  return variablesReducer(content, raw);
}
