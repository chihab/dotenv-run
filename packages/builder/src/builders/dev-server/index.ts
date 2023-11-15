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
import { dotenvRun } from "@dotenv-run/esbuild";
import { Observable, combineLatest, switchMap } from "rxjs";
import { devServerIndexHtml } from "../../utils/esbuild-index-html";
import { getProjectCwd } from "../../utils/project";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
import { plugin } from "../plugin";

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
      const ngxEnvOptions = {
        context,
        ...options.ngxEnv,
        ..._options.ngxEnv,
        cwd,
      };
      if (builderName === "@ngx-env/builder:application") {
        options.forceEsbuild = true;
        return executeDevServerBuilder(
          options,
          context,
          {
            indexHtml: async (content) =>
              devServerIndexHtml(content, {
                ...ngxEnvOptions,
                appEnv: "NG_APP_ENV",
              }),
          },
          {
            buildPlugins: [
              dotenvRun({ ...ngxEnvOptions, appEnv: "NG_APP_ENV" }),
            ],
          }
        );
      } else {
        return executeDevServerBuilder(options, context, plugin(ngxEnvOptions));
      }
    })
  );
};

export default createBuilder<DevServerBuilderOptions>(buildWithPlugin);
