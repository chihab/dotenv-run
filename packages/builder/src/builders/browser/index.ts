import {
  BuilderContext,
  createBuilder,
  targetFromTargetString,
} from "@angular-devkit/architect";
import {
  BrowserBuilderOptions,
  executeBrowserBuilder,
} from "@angular-devkit/build-angular";
import { plugin } from "../plugin";

export const buildWithPlugin = (
  options: BrowserBuilderOptions,
  context: BuilderContext
): ReturnType<typeof executeBrowserBuilder> => {
  return executeBrowserBuilder(options, context, plugin());
};

export default createBuilder<BrowserBuilderOptions>(buildWithPlugin);
