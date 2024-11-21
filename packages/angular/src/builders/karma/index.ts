import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import {
  executeKarmaBuilder,
  KarmaBuilderOptions,
} from "@angular-devkit/build-angular";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
// import { plugin } from "../utils/webpack-plugin";
import { from, of, switchMap } from "rxjs";
import { getProjectCwd } from "../utils/project";
// import { getEnvironment } from "../utils/get-environment";
// import { env } from "@dotenv-run/core";

export const buildWithPlugin = (
  options: KarmaBuilderOptions & NgxEnvSchema,
  context: BuilderContext
): ReturnType<typeof executeKarmaBuilder> => {
  return from(getProjectCwd(context)).pipe(
    switchMap((cwd: string) => {
      console.warn(
        "@ngx-env/builder: Karma builder is not supported yet due to a limitation in the Angular CLI, use jest instead"
      );
      return of({ success: false });
      // switch (options.builderMode) {
      //   case "application":
      //   case "detect":
      //     const { full } = env({
      //       ...options.ngxEnv,
      //       cwd,
      //       environment: getEnvironment(context.target.configuration),
      //     });
      //     (options as any).define = full;
      //     return executeKarmaBuilder(options, context);
      //   case "browser":
      //     return executeKarmaBuilder(
      //       options,
      //       context,
      //       plugin({
      //         ...options.ngxEnv,
      //         cwd,
      //         environment: getEnvironment(context.target.configuration),
      //       })
      //     );
      //   default:
      //     return throwError(() => "@ngx-env/builder: Invalid builder mode");
      // }
    })
  );
};
export default createBuilder<KarmaBuilderOptions>(buildWithPlugin);
