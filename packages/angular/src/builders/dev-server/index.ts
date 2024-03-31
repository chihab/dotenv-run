import {
  BuilderContext,
  createBuilder,
  targetFromTargetString,
} from "@angular-devkit/architect";
import {
  DevServerBuilderOptions,
  DevServerBuilderOutput,
  executeDevServerBuilder,
} from "@angular-devkit/build-angular";
import { env } from "@dotenv-run/core";
import {
  DotenvRunOptions,
  dotenvRunDefine as esbuildPlugin,
} from "@dotenv-run/esbuild";
import { Observable, combineLatest, switchMap } from "rxjs";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
import { devServerIndexHtml } from "../utils/esbuild-index-html";
import { getEnvironment } from "../utils/get-environment";
import { getProjectCwd } from "../utils/project";
import { plugin as webpackPlugin } from "../utils/webpack-plugin";
import { JsonObject } from "@angular-devkit/core";

export const buildWithPlugin = (
  options: DevServerBuilderOptions & NgxEnvSchema,
  context: BuilderContext
): Observable<DevServerBuilderOutput> => {
  const buildTarget = targetFromTargetString(
    options.buildTarget ?? options.browserTarget
  );
  async function builderName() {
    return context.getBuilderNameForTarget(buildTarget);
  }
  async function setup() {
    const targetOptions = (await context.getTargetOptions(
      buildTarget
    )) as unknown as DevServerBuilderOptions & NgxEnvSchema;
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
        options.forceEsbuild = true;
        const { full, raw } = env({
          ...dotenvRunOptions,
          global: "_NGX_ENV_",
          environment: getEnvironment(buildTarget.configuration),
        });
        delete _options.ngxEnv;
        context.getTargetOptions = async () => _options as JsonObject;
        return executeDevServerBuilder(
          options,
          context,
          {
            indexHtml: async (content) =>
              devServerIndexHtml(content, raw, dotenvRunOptions.runtime),
          },
          {
            buildPlugins: [esbuildPlugin(full)],
            builderSelector: () => "@angular-devkit/build-angular:application", // CLI requires it to recognize the builder as an esbuild builder otherwise plugins are not supported
          }
        );
      } else {
        return executeDevServerBuilder(
          options,
          context,
          webpackPlugin(dotenvRunOptions)
        );
      }
    })
  );
};

export default createBuilder<DevServerBuilderOptions>(buildWithPlugin);
