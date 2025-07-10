import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import { executeKarmaBuilder, KarmaBuilderOptions } from "@angular/build";
import { env } from "@dotenv-run/core";
import { from, switchMap } from "rxjs";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
import { getEnvironment } from "../utils/get-environment";
import { getProjectCwd } from "../utils/project";

export const executeWithEnv = (
  options: KarmaBuilderOptions & NgxEnvSchema,
  context: BuilderContext
) => {
  return from(getProjectCwd(context)).pipe(
    switchMap((cwd: string) => {
      if (options.ngxEnv.runtime) {
        throw new Error(
          "@ngx-env/builder runtime option is not supported in karma tests"
        );
      }
      const { full } = env({
        ...options.ngxEnv,
        cwd,
        environment: getEnvironment(context.target.configuration),
      });
      options.define = full;
      return executeKarmaBuilder(options, context);
    })
  );
};
export default createBuilder<KarmaBuilderOptions>(executeWithEnv);
