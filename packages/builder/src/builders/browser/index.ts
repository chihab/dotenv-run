import {
  BuilderContext,
  createBuilder,
} from "@angular-devkit/architect";
import {
  BrowserBuilderOptions,
  executeBrowserBuilder,
} from "@angular-devkit/build-angular";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
import { plugin } from "../plugin";

export const buildWithPlugin = (
  options: BrowserBuilderOptions & NgxEnvSchema,
  context: BuilderContext
): ReturnType<typeof executeBrowserBuilder> => {
  return executeBrowserBuilder(options, context, plugin(options.ngxEnv));
};

export default createBuilder<BrowserBuilderOptions>(buildWithPlugin);
