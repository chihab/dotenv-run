import {
  BuilderContext,
  createBuilder,
  targetFromTargetString,
} from "@angular-devkit/architect";
import {
  DevServerBuilderOptions,
  executeDevServerBuilder,
} from "@angular-devkit/build-angular";
import { DevServerBuilderOutput } from "@angular-devkit/build-angular";
import { Observable, from } from "rxjs";
import { switchMap } from "rxjs/operators";
import { plugin } from "../plugin";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";

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
  return from(setup()).pipe(
    switchMap((_options) => {
      const ngxEnvOptions  = {...options.ngxEnv, ..._options.ngxEnv};
      return executeDevServerBuilder(options, context, plugin(ngxEnvOptions));
    })
  );
};

export default createBuilder<DevServerBuilderOptions>(buildWithPlugin);
