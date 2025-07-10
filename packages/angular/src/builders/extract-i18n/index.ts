import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import {
  ExtractI18nBuilderOptions,
  executeExtractI18nBuilder,
} from "@angular/build";
import { catchError, combineLatest, switchMap } from "rxjs";
import { validateAndPrepareBuildContext } from "../utils/validate-prepare-context";
import { getProjectCwd } from "../utils/project";
import { DotenvRunOptions, env } from "@dotenv-run/core";
import { getEnvironment } from "../utils/get-environment";

export const executeWithEnv = (
  options: ExtractI18nBuilderOptions,
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
      const { full } = env({
        ...dotenvRunOptions,
        environment: getEnvironment(buildTarget.configuration),
      });
      context.getTargetOptions = async () => ({
        ...buildTarget.options,
        define: full,
      });
      return executeExtractI18nBuilder(options, context);
    }),
    catchError((e) => {
      console.error(e.message);
      return executeExtractI18nBuilder(options, context);
    })
  );
};

export default createBuilder<ExtractI18nBuilderOptions>(executeWithEnv);
