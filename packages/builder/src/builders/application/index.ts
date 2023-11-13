import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import {
    ApplicationBuilderOptions,
    buildApplication,
} from "@angular-devkit/build-angular";
import { from, switchMap } from "rxjs";
import { getProjectCwd } from "../../utils/project";
import { plugin } from "../esbuild-plugin";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";

export const buildWithPlugin = (
  options: ApplicationBuilderOptions & NgxEnvSchema,
  context: BuilderContext
) => {
  return from(getProjectCwd(context)).pipe(
    switchMap((cwd) =>
      buildApplication(options, context, plugin({ ...options.ngxEnv, cwd }))
    )
  );
};

export default createBuilder<ApplicationBuilderOptions>(buildWithPlugin);
