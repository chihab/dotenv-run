import {
  BuilderContext,
  createBuilder,
  targetFromTargetString,
} from "@angular-devkit/architect";
import { Schema } from "@angular-devkit/architect/src/input-schema";
import {
  DevServerBuilderOptions,
  DevServerBuilderOutput,
  executeDevServerBuilder,
} from "@angular/build";
import { JsonObject } from "@angular-devkit/core";
import { env } from "@dotenv-run/core";
import type { DotenvRunOptions } from "@dotenv-run/core";
import { Observable, combineLatest, switchMap, tap } from "rxjs";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
import { getEnvironment } from "../utils/get-environment";
import { getProjectCwd } from "../utils/project";
import { plugin as webpackPlugin } from "../utils/webpack-plugin";
import { indexHtml } from "../utils/index-html-serve";

export const buildWithPlugin = (
  options: DevServerBuilderOptions & NgxEnvSchema,
  context: BuilderContext
): Observable<DevServerBuilderOutput> => {
  const buildTarget = targetFromTargetString(options.buildTarget);
  async function builderName() {
    return context.getBuilderNameForTarget(buildTarget);
  }
  async function setup() {
    const targetOptions = (await context.getTargetOptions(
      buildTarget
    )) as unknown as Schema & NgxEnvSchema;
    if ((await builderName()) === "@ngx-env/builder:application") {
      // Because of ngxEnv being removed from the options, we need to validate it here
      await context.validateOptions(
        targetOptions as JsonObject,
        "@ngx-env/builder:application"
      );
    }
    return targetOptions;
  }
  return combineLatest([setup(), builderName(), getProjectCwd(context)]).pipe(
    switchMap(([_options, builderName, cwd]) => {
      const dotenvRunOptions: DotenvRunOptions = {
        ...options.ngxEnv,
        ..._options.ngxEnv,
        global: "_NGX_ENV_",
        cwd,
      };
      if (builderName === "@ngx-env/builder:application") {
        const { full, raw } = env({
          ...dotenvRunOptions,
          global: "_NGX_ENV_",
          environment: getEnvironment(buildTarget.configuration),
        });
        _options.define = full;
        context.getTargetOptions = async () => _options;
        context.validateOptions = async <T>() => _options as T;
        return executeDevServerBuilder(options, context, {
          indexHtmlTransformer: async (content: string) =>
            indexHtml(content, raw, dotenvRunOptions.runtime),
        });
      }
    })
  );
};

export default createBuilder<DevServerBuilderOptions>(buildWithPlugin);
