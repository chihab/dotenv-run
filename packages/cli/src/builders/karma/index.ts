import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import {
  executeKarmaBuilder,
  KarmaBuilderOptions,
} from "@angular-devkit/build-angular";
import { plugin } from "../plugin";

export const buildWithPlugin = (
  options: KarmaBuilderOptions,
  context: BuilderContext
): ReturnType<typeof executeKarmaBuilder> =>
  executeKarmaBuilder(options, context, plugin({ ...options, env: "test" }));
export default createBuilder<KarmaBuilderOptions>(buildWithPlugin);
