import {
  BuilderContext,
  BuilderOutput,
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
import { Observable, from, switchMap, tap } from "rxjs";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
import { indexHtml } from "../utils/esbuild-index-html";
import { getEnvironment } from "../utils/get-environment";
import { getProjectCwd } from "../utils/project";

export const buildWithPlugin = (
  options: ApplicationBuilderOptions & NgxEnvSchema,
  context: BuilderContext
): Observable<BuilderOutput> => {
  const dotEnvOptions: DotenvRunOptions = options.ngxEnv;
  return from(getProjectCwd(context)).pipe(
    switchMap((cwd) => {
      const { full, raw } = env({
        ...dotEnvOptions,
        cwd,
        global: "_NGX_ENV_",
        environment: getEnvironment(context.target.configuration),
      });
      return fromAsyncIterable<BuilderOutput>(
        buildApplication(options, context, [dotenvRunDefine(full)])
      ).pipe(
        tap(() => {
          const outputDir = join(
            context.workspaceRoot,
            options.outputPath.toString()
          );
          indexHtml(
            outputDir,
            Array.isArray(options.localize) ? options.localize : [],
            raw,
            !!options.ssr,
            dotEnvOptions.runtime
          );
        })
      );
    })
  );
};

export default createBuilder<ApplicationBuilderOptions>(buildWithPlugin);
