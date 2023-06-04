import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import {
  BrowserBuilderOptions,
  executeBrowserBuilder,
} from "@angular-devkit/build-angular";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
import { plugin } from "../plugin";
import { from, switchMap } from "rxjs";
import { getProjectCwd } from "../../utils/project";

export const buildWithPlugin = (
  options: BrowserBuilderOptions & NgxEnvSchema,
  context: BuilderContext
): ReturnType<typeof executeBrowserBuilder> => {
  return from(getProjectCwd(context)).pipe(
    switchMap((cwd: string) =>
      executeBrowserBuilder(options, context, plugin(options.ngxEnv, cwd))
    )
  );
};

export default createBuilder<BrowserBuilderOptions>(buildWithPlugin);
