// import { BuilderContext, createBuilder } from "@angular-devkit/architect";
// import { executeUnitTestBuilder, UnitTestBuilderOptions } from "@angular/build";
// import { env } from "@dotenv-run/core";
// import { catchError, combineLatest, switchMap, throwError } from "rxjs";
// import { getEnvironment } from "../utils/get-environment";
// import { validateAndPrepareBuildContext } from "../utils/validate-prepare-context";
// import { getProjectCwd } from "../utils/project";
// import browser from "../browser";

import { createBuilder } from "@angular-devkit/architect";
import { UnitTestBuilderOptions } from "@angular/build";

export const executeWithEnv = () =>
  // options: UnitTestBuilderOptions,
  // context: BuilderContext
  {
    // return error and that it is not supported yet by @ngx-env/builder

    throw new Error(
      "@ngx-env/builder doest not support yet the experimental unit-test builder"
    );
    // return combineLatest([
    //   validateAndPrepareBuildContext(options.buildTarget, context),
    //   getProjectCwd(context),
    // ]).pipe(
    //   switchMap(([buildTarget, cwd]) => {
    //     const { full } = env({
    //       ...buildTarget.ngxEnv,
    //       runtime: false, // Runtime is not supported in unit tests
    //       cwd,
    //       environment: getEnvironment(buildTarget.configuration),
    //     });
    //     // delete config.test.browser;
    //     // config.test.environment = 'jsdom';
    //     context.getTargetOptions = async () => ({
    //       ...buildTarget.options,
    //       define: full,
    //     });
    //     if (buildTarget.ngxEnv.runtime) {
    //       console.warn(
    //         "NOTE: @ngx-env/builder runtime option is not supported in unit tests."
    //       );
    //       console.log();
    //     }
    //     return executeUnitTestBuilder(options, context);
    //   }),
    //   catchError((e) => {
    //     return executeUnitTestBuilder(options, context);
    //   })
    // );
  };

export default createBuilder<UnitTestBuilderOptions>(executeWithEnv);
