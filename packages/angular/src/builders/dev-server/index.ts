import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import {
  DevServerBuilderOptions,
  executeDevServerBuilder,
} from "@angular/build";
import type { DotenvRunOptions } from "@dotenv-run/core";
import { env } from "@dotenv-run/core";
import { catchError, combineLatest, switchMap } from "rxjs";
import { getEnvironment } from "../utils/get-environment";
import { indexHtmlTransformer } from "../utils/index-html-transform";
import { getProjectCwd } from "../utils/project";
import { validateAndPrepareBuildContext } from "../utils/validate-prepare-context";

export const executeWithEnv = (
  options: DevServerBuilderOptions,
  context: BuilderContext
) => {
  return combineLatest([
    validateAndPrepareBuildContext(options.buildTarget, context),
    getProjectCwd(context),
  ]).pipe(
    switchMap(([buildTarget, cwd]) => {
      const dotenvRunOptions: DotenvRunOptions = {
        ...buildTarget.ngxEnv,
        cwd,
      };
      const { full, raw } = env({
        ...dotenvRunOptions,
        global: "_NGX_ENV_",
        environment: getEnvironment(buildTarget.configuration),
      });
      context.getTargetOptions = async () => ({
        ...buildTarget.options,
        define: full,
      });
      return executeDevServerBuilder(options, context, {
        indexHtmlTransformer: async (content: string) =>
          indexHtmlTransformer(content, raw, true, dotenvRunOptions.runtime),
      });
    }),
    catchError((e) => {
      console.error(e.message);
      return executeDevServerBuilder(options, context);
    })
  );
};

export default createBuilder<DevServerBuilderOptions>(executeWithEnv);
