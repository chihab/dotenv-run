import {
  BuilderContext,
  createBuilder,
  fromAsyncIterable,
} from "@angular-devkit/architect";
import { buildEsbuildBrowser } from "@angular-devkit/build-angular/src/builders/browser-esbuild";
import { Schema as BrowserBuilderOptions } from "@angular-devkit/build-angular/src/builders/browser-esbuild/schema";
import { env, type DotenvRunOptions } from "@dotenv-run/core";
import { dotenvRunDefine } from "@dotenv-run/esbuild";
import { join } from "path";
import { from, switchMap, tap } from "rxjs";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
import { indexHtml } from "../utils/esbuild-index-html";
import { getEnvironment } from "../utils/get-environment";
import { getProjectCwd } from "../utils/project";

export const buildWithPlugin = (
  options: BrowserBuilderOptions & NgxEnvSchema,
  context: BuilderContext
) => {
  const dotEnvOptions: DotenvRunOptions = options.ngxEnv;
  return from(getProjectCwd(context)).pipe(
    switchMap((cwd) => {
      const { full, raw } = env({
        ...dotEnvOptions,
        cwd,
        global: "_NGX_ENV_",
        environment: getEnvironment(context.target.configuration),
      });
      return fromAsyncIterable(
        buildEsbuildBrowser(options, context, undefined, [
          dotenvRunDefine(full),
        ])
      ).pipe(
        tap(() => {
          indexHtml(
            join(context.workspaceRoot, options.outputPath.toString()),
            Array.isArray(options.localize) ? options.localize : [],
            raw,
            false, // no ssr support with browser-esbuild,
            dotEnvOptions.runtime
          );
        })
      );
    })
  );
};

export default createBuilder<BrowserBuilderOptions>(buildWithPlugin);
