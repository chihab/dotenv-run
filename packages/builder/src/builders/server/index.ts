import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import {
  executeServerBuilder,
  ServerBuilderOptions,
} from "@angular-devkit/build-angular";
import { plugin } from "../plugin";

export const buildWithPlugin = (
  options: ServerBuilderOptions,
  context: BuilderContext
): ReturnType<typeof executeServerBuilder> =>
  executeServerBuilder(options, context, plugin());

export default createBuilder<ServerBuilderOptions>(buildWithPlugin);
