import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import {
  executeServerBuilder,
  ServerBuilderOptions,
} from "@angular-devkit/build-angular";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
import { plugin } from "../utils/webpack-plugin";
import { from, switchMap } from "rxjs";
import { getProjectCwd } from "../utils/project";
import { getEnvironment } from "../utils/get-environment";

export const buildWithPlugin = (
  options: ServerBuilderOptions & NgxEnvSchema,
  context: BuilderContext
): ReturnType<typeof executeServerBuilder> => {
  return from(getProjectCwd(context)).pipe(
    switchMap((cwd: string) =>
      executeServerBuilder(
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
      )
    )
  );
};

export default createBuilder<ServerBuilderOptions>(buildWithPlugin);
