import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import {
  executeExtractI18nBuilder,
  ExtractI18nBuilderOptions,
} from "@angular-devkit/build-angular";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
import { plugin } from "../plugin";

export const buildWithPlugin = (
  options: ExtractI18nBuilderOptions & NgxEnvSchema,
  context: BuilderContext
): ReturnType<typeof executeExtractI18nBuilder> => {
  return executeExtractI18nBuilder(options, context, plugin(options.ngxEnv));
};

export default createBuilder<ExtractI18nBuilderOptions>(buildWithPlugin);
