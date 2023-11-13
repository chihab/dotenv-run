import {
  BuilderContext,
  createBuilder,
  targetFromTargetString,
} from "@angular-devkit/architect";
import {
  DevServerBuilderOptions,
  executeDevServerBuilder,
  DevServerBuilderOutput,
} from "@angular-devkit/build-angular";
import { Observable, combineLatest } from "rxjs";
import { switchMap } from "rxjs/operators";
import { plugin } from "../plugin";
import { plugin as esbuildPlugin } from "../esbuild-plugin";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
import { getProjectCwd } from "../../utils/project";

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
        return executeDevServerBuilder(options, context, null, {
          buildPlugins: esbuildPlugin(ngxEnvOptions),
        });
      } else {
        return executeDevServerBuilder(options, context, plugin(ngxEnvOptions));
      }
    })
  );
};

export default createBuilder<DevServerBuilderOptions>(buildWithPlugin);
