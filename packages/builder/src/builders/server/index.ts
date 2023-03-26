import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import {
  executeServerBuilder,
  ServerBuilderOptions,
} from "@angular-devkit/build-angular";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
import { plugin } from "../plugin";

export const buildWithPlugin = (
  options: ServerBuilderOptions & NgxEnvSchema,
  context: BuilderContext
): ReturnType<typeof executeServerBuilder> =>
  executeServerBuilder(options, context, plugin(options.ngxEnv, true))

export default createBuilder<ServerBuilderOptions>(buildWithPlugin);
