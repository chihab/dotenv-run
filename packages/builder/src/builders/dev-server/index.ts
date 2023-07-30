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
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
import { getProjectCwd } from "../../utils/project";

export const buildWithPlugin = (
  options: DevServerBuilderOptions & NgxEnvSchema,
  context: BuilderContext
): Observable<DevServerBuilderOutput> => {
  const browserTarget = targetFromTargetString(options.browserTarget);
  async function setup() {
    return context.getTargetOptions(
      browserTarget
    ) as unknown as DevServerBuilderOptions & NgxEnvSchema;
  }
  return combineLatest([setup(), getProjectCwd(context)]).pipe(
    switchMap(([_options, cwd]) => {
      const ngxEnvOptions = {
        context,
        ...options.ngxEnv,
        ..._options.ngxEnv,
        cwd,
      };
      return executeDevServerBuilder(options, context, plugin(ngxEnvOptions));
    })
  );
};

export default createBuilder<DevServerBuilderOptions>(buildWithPlugin);
