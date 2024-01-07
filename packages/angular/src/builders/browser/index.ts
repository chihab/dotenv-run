import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import {
  BrowserBuilderOptions,
  executeBrowserBuilder,
} from "@angular-devkit/build-angular";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
import { plugin } from "../utils/webpack-plugin";
import { from, switchMap } from "rxjs";
import { getProjectCwd } from "../utils/project";

export const buildWithPlugin = (
  options: BrowserBuilderOptions & NgxEnvSchema,
  context: BuilderContext
): ReturnType<typeof executeBrowserBuilder> => {
  const environment =
    process.env.NG_APP_ENV || // @deprecated
    process.env.NODE_ENV || // default in @dotenv-run/core
    context.target.configuration;
  return from(getProjectCwd(context)).pipe(
    switchMap((cwd: string) =>
      executeBrowserBuilder(
        options,
        context,
        plugin({ ...options.ngxEnv, cwd, environment })
      )
    )
  );
};

export default createBuilder<BrowserBuilderOptions>(buildWithPlugin);
