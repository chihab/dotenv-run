import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import {
  ExtractI18nBuilderOptions,
  executeExtractI18nBuilder,
} from "@angular-devkit/build-angular";
import { getProjectCwd } from "../utils/project";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
import { plugin } from "../utils/webpack-plugin";

export const buildWithPlugin = (
  options: ExtractI18nBuilderOptions & NgxEnvSchema,
  context: BuilderContext
): ReturnType<typeof executeExtractI18nBuilder> => {
  const environment =
    process.env.NG_APP_ENV || // @deprecated
    process.env.NODE_ENV || // default in @dotenv-run/core
    context.target.configuration;
  return getProjectCwd(context).then((cwd: string) =>
    executeExtractI18nBuilder(
      options,
      context,
      plugin({ ...options.ngxEnv, cwd, environment })
    )
  );
};

export default createBuilder<ExtractI18nBuilderOptions>(buildWithPlugin);
