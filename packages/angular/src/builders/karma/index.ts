import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import {
  executeKarmaBuilder,
  KarmaBuilderOptions,
} from "@angular-devkit/build-angular";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
// import { plugin } from "../utils/webpack-plugin";
import { from, of, switchMap, throwError } from "rxjs";
import { getProjectCwd } from "../utils/project";
import { env } from "@dotenv-run/core";
import { getEnvironment } from "../utils/get-environment";
import { plugin } from "../utils/webpack-plugin";
// import { getEnvironment } from "../utils/get-environment";
// import { env } from "@dotenv-run/core";

export const buildWithPlugin = (
  options: KarmaBuilderOptions & NgxEnvSchema,
  context: BuilderContext
): ReturnType<typeof executeKarmaBuilder> => {
  return from(getProjectCwd(context)).pipe(
    switchMap((cwd: string) => {
      const { full } = env({
        ...options.ngxEnv,
        cwd,
        environment: getEnvironment(context.target.configuration),
      });
      switch (options.builderMode) {
        case "application":
        case "detect":
          console.warn(
            "@ngx-env/builder: Karma builder is not supported yet with application due to a limitation in the Angular CLI, use browser builder instead"
          );
          (options as any).define = full; // Does not work with application builder yet see: https://github.com/chihab/dotenv-run/issues/113 and https://github.com/angular/angular-cli/issues/29003
          return executeKarmaBuilder(options, context);
        case "browser":
          return executeKarmaBuilder(options, context, plugin(full));
        default:
          return throwError(() => "@ngx-env/builder: Invalid builder mode");
      }
    })
  );
};
export default createBuilder<KarmaBuilderOptions>(buildWithPlugin);
