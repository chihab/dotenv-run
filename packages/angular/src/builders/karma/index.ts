import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import {
  executeKarmaBuilder,
  KarmaBuilderOptions,
} from "@angular-devkit/build-angular";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
import { plugin } from "../utils/webpack-plugin";
import { from, switchMap } from "rxjs";
import { getProjectCwd } from "../utils/project";
import { getEnvironment } from "../utils/get-environment";
import { env } from "@dotenv-run/core";

export const buildWithPlugin = (
  options: KarmaBuilderOptions & NgxEnvSchema,
  context: BuilderContext
): ReturnType<typeof executeKarmaBuilder> => {
  return from(getProjectCwd(context)).pipe(
    switchMap((cwd: string) => {
      const { full, raw } = env({
        ...options.ngxEnv,
        cwd,
        environment: getEnvironment(context.target.configuration),
      });
      (options as any).define = full;
      return executeKarmaBuilder(options, context);
    })
  );
};
export default createBuilder<KarmaBuilderOptions>(buildWithPlugin);

// import { BuilderContext, createBuilder } from "@angular-devkit/architect";
// import {
//   executeKarmaBuilder,
//   KarmaBuilderOptions,
// } from "@angular-devkit/build-angular";
// import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
// import { plugin } from "../utils/webpack-plugin";
// import { from, switchMap } from "rxjs";
// import { getProjectCwd } from "../utils/project";
// import { getEnvironment } from "../utils/get-environment";
// import { env } from "@dotenv-run/core";

// export const buildWithPlugin = (
//   options: KarmaBuilderOptions & NgxEnvSchema,
//   context: BuilderContext
// ): ReturnType<typeof executeKarmaBuilder> => {
//   return from(getProjectCwd(context)).pipe(
//     switchMap((cwd: string) => {
//       const { full, raw } = env({
//         ...options.ngxEnv,
//         cwd,
//         environment: getEnvironment(context.target.configuration),
//       });
//       (options as any).define = full;
//       return executeKarmaBuilder(
//         {
//           ...options,
//         } as any,
//         context
//       );
//     })
//   );
// };
// export default createBuilder<KarmaBuilderOptions>(buildWithPlugin);
