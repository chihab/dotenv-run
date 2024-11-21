import { createBuilder, type BuilderContext } from "@angular-devkit/architect";
import {
  ServerBuilderOptions,
  executeServerBuilder,
} from "@angular-devkit/build-angular";
import { from, switchMap } from "rxjs";
import { type NgxEnvSchema } from "../ngx-env/ngx-env-schema";
import { getEnvironment } from "../utils/get-environment";
import { getProjectCwd } from "../utils/project";
import { plugin } from "../utils/webpack-plugin";

export const buildWithPlugin = (
  options: ServerBuilderOptions & NgxEnvSchema,
  context: BuilderContext
): ReturnType<typeof executeServerBuilder> => {
  return from(getProjectCwd(context)).pipe(
    switchMap((cwd: string) => {
      return executeServerBuilder(
        options,
        context,
        plugin(
          {
            ...options.ngxEnv,
            cwd,
            environment: getEnvironment(context.target.configuration),
          },
          true
        )
      );
    })
  );
};

export default createBuilder<ServerBuilderOptions>(buildWithPlugin);
