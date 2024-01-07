import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import {
  executeKarmaBuilder,
  KarmaBuilderOptions,
} from "@angular-devkit/build-angular";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
import { plugin } from "../utils/webpack-plugin";
import { from, switchMap } from "rxjs";
import { getProjectCwd } from "../utils/project";

export const buildWithPlugin = (
  options: KarmaBuilderOptions & NgxEnvSchema,
  context: BuilderContext
): ReturnType<typeof executeKarmaBuilder> => {
  const environment =
    process.env.NG_APP_ENV || // @deprecated
    process.env.NODE_ENV || // default in @dotenv-run/core
    context.target.configuration;
  return from(getProjectCwd(context)).pipe(
    switchMap((cwd: string) =>
      executeKarmaBuilder(
        options,
        context,
        plugin({ ...options.ngxEnv, cwd, environment })
      )
    )
  );
};
export default createBuilder<KarmaBuilderOptions>(buildWithPlugin);
