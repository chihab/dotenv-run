import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import { executeUnitTestBuilder, UnitTestBuilderOptions } from "@angular/build";
import { env } from "@dotenv-run/core";
import { catchError, combineLatest, switchMap } from "rxjs";
import { getEnvironment } from "../utils/get-environment";
import { validateAndPrepareBuildContext } from "../utils/validate-prepare-context";
import { getProjectCwd } from "../utils/project";

export const executeWithEnv = (
  options: UnitTestBuilderOptions,
  context: BuilderContext
) => {
  let _options: UnitTestBuilderOptions = {
    ...options,
    buildTarget: options.buildTarget ?? "::development", // as in normalizeOptions
    // if browsers is set to an empty array, it breaks the unit test builder
    // if browsers is an empty array, set it to undefined, otherwise set it to the browsers array
    browsers: options.browsers?.length > 0 ? options.browsers : undefined,
  };
  return combineLatest([
    validateAndPrepareBuildContext(_options.buildTarget, context),
    getProjectCwd(context),
  ]).pipe(
    switchMap(([buildTarget, cwd]) => {
      const { full } = env({
        ...buildTarget.ngxEnv,
        runtime: false, // Runtime is not supported in unit tests
        cwd,
        environment: getEnvironment(buildTarget.configuration),
      });
      context.getTargetOptions = async () => ({
        ...buildTarget.options,
        define: full,
      });
      if (buildTarget.ngxEnv?.runtime) {
        console.warn(
          "NOTE: @ngx-env/builder runtime option is ignored in unit tests."
        );
      }
      console.warn("WARNING: @ngx-env/builder vitest support is experimental.");
      return executeUnitTestBuilder(_options, context);
    }),
    catchError((e) => {
      console.error(e);
      return executeUnitTestBuilder(_options, context);
    })
  );
};

export default createBuilder<UnitTestBuilderOptions>(executeWithEnv);
