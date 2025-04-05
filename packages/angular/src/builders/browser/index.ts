import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import {
  BrowserBuilderOptions,
  executeBrowserBuilder,
} from "@angular-devkit/build-angular";
import { from, switchMap, tap } from "rxjs";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
import { getEnvironment } from "../utils/get-environment";
import { getProjectCwd } from "../utils/project";
import { plugin } from "../utils/webpack-plugin";
import { indexHtml } from "../utils/index-html-build";
import { join } from "path";

export const buildWithPlugin = (
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
            raw,
            options.ngxEnv.runtime,
            Array.isArray(options.localize) ? options.localize : []
          );
        })
      );
    })
  );
};

export default createBuilder<BrowserBuilderOptions>(buildWithPlugin);
