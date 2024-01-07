import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import {
  BrowserBuilderOptions,
  executeBrowserBuilder,
} from "@angular-devkit/build-angular";
import { from, switchMap } from "rxjs";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
import { getEnvironment } from "../utils/get-environment";
import { getProjectCwd } from "../utils/project";
import { plugin } from "../utils/webpack-plugin";

export const buildWithPlugin = (
  options: BrowserBuilderOptions & NgxEnvSchema,
  context: BuilderContext
): ReturnType<typeof executeBrowserBuilder> => {
  return from(getProjectCwd(context)).pipe(
    switchMap((cwd: string) =>
      executeBrowserBuilder(
        options,
        context,
        plugin({
          ...options.ngxEnv,
          cwd,
          environment: getEnvironment(context.target.configuration),
        })
      )
    )
  );
};

export default createBuilder<BrowserBuilderOptions>(buildWithPlugin);
