import {
  BuilderContext,
  createBuilder,
  fromAsyncIterable,
} from "@angular-devkit/architect";
import { buildEsbuildBrowser } from "@angular-devkit/build-angular/src/builders/browser-esbuild";
import { Schema as BrowserBuilderOptions } from "@angular-devkit/build-angular/src/builders/browser-esbuild/schema";
import { env, type DotenvRunOptions } from "@dotenv-run/core";
import { join } from "path";
import { from, switchMap, tap } from "rxjs";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
import { getEnvironment } from "../utils/get-environment";
import { indexHtml } from "../utils/index-html-build";
import { getProjectCwd } from "../utils/project";

export const executeWithEnv = (
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
      (options as any).define = full;
      return fromAsyncIterable(
        buildEsbuildBrowser(options, context, undefined)
      ).pipe(
        tap(() => {
          indexHtml(
            join(
              context.workspaceRoot,
              options.outputPath.toString(),
              "browser"
            ),
            null, // no ssr support with browser-esbuild,
            Array.isArray(options.localize) ? options.localize : [],
            raw,
            dotEnvOptions.runtime
          );
        })
      );
    })
  );
};

export default createBuilder<BrowserBuilderOptions>(executeWithEnv);
