import {
  BuilderContext,
  createBuilder,
  fromAsyncIterable,
} from "@angular-devkit/architect";
import {
  ApplicationBuilderOptions,
  buildApplication,
} from "@angular-devkit/build-angular";
import { env, type DotenvRunOptions } from "@dotenv-run/core";
import { dotenvRunDefine } from "@dotenv-run/esbuild";
import { join } from "path";
import { from, switchMap, tap } from "rxjs";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
import { indexHtml } from "../utils/esbuild-index-html";
import { getEnvironment } from "../utils/get-environment";
import { getProjectCwd } from "../utils/project";

export const buildWithPlugin = (
  options: ApplicationBuilderOptions & NgxEnvSchema,
  context: BuilderContext
) => {
  const dotEnvOptions: DotenvRunOptions = options.ngxEnv;
  return from(getProjectCwd(context)).pipe(
    switchMap((cwd) => {
      const { full, raw } = env({
        ...dotEnvOptions,
        cwd,
        environment: getEnvironment(context.target.configuration),
      });
      return fromAsyncIterable(
        buildApplication(options, context, [dotenvRunDefine(full)])
      ).pipe(
        tap(() => {
          indexHtml(
            join(context.workspaceRoot, options.outputPath.toString()),
            raw,
            !!options.ssr
          );
        })
      );
    })
  );
};

export default createBuilder<ApplicationBuilderOptions>(buildWithPlugin);
