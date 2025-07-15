import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import {
  BrowserBuilderOptions,
  executeBrowserBuilder,
} from "@angular-devkit/build-angular";
import { join } from "path";
import { from, switchMap, tap } from "rxjs";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
import { getEnvironment } from "../utils/get-environment";
import { indexHtml } from "../utils/index-html-build";
import { getProjectCwd } from "../utils/project";
import { plugin } from "../utils/webpack-plugin";

export const executeWithEnv = (
  options: BrowserBuilderOptions & NgxEnvSchema,
  context: BuilderContext
): ReturnType<typeof executeBrowserBuilder> => {
  return from(getProjectCwd(context)).pipe(
    switchMap((cwd: string) => {
      const { raw, webpackConfiguration } = plugin({
        ...options.ngxEnv,
        cwd,
        environment: getEnvironment(context.target.configuration),
      });
      return executeBrowserBuilder(options, context, {
        webpackConfiguration,
      }).pipe(
        tap(() => {
          indexHtml(
            join(context.workspaceRoot, options.outputPath.toString()),
            null, // no ssr support with browser,
            Array.isArray(options.localize) ? options.localize : [],
            raw,
            options.ngxEnv.runtime
          );
        })
      );
    })
  );
};

export default createBuilder<BrowserBuilderOptions>(executeWithEnv);
