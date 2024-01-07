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

export const buildWithPlugin = (
  options: DevServerBuilderOptions & NgxEnvSchema,
  context: BuilderContext
): Observable<DevServerBuilderOutput> => {
  const buildTarget = targetFromTargetString(
    options.buildTarget ?? options.browserTarget
  );
  async function setup() {
    return context.getTargetOptions(
      buildTarget
    ) as unknown as DevServerBuilderOptions & NgxEnvSchema;
  }
  async function builderName() {
    return context.getBuilderNameForTarget(buildTarget);
  }
  return combineLatest([setup(), builderName(), getProjectCwd(context)]).pipe(
    switchMap(([_options, builderName, cwd]) => {
      const ngxEnvOptions: DotenvRunOptions = {
        ...options.ngxEnv,
        ..._options.ngxEnv,
        cwd,
      };
      if (builderName === "@ngx-env/builder:application") {
        options.forceEsbuild = true;
        const { full, raw } = env({
          ...ngxEnvOptions,
          environment: getEnvironment(buildTarget.configuration),
        });
        return executeDevServerBuilder(
          options,
          context,
          {
            indexHtml: async (content) => devServerIndexHtml(content, raw),
          },
          {
            buildPlugins: [esbuildPlugin(full)],
          }
        );
      } else {
        return executeDevServerBuilder(
          options,
          context,
          webpackPlugin(ngxEnvOptions)
        );
      }
    })
  );
};

export default createBuilder<DevServerBuilderOptions>(buildWithPlugin);
