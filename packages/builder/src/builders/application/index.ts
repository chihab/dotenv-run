import {
  BuilderContext,
  createBuilder,
  fromAsyncIterable,
} from "@angular-devkit/architect";
import {
  ApplicationBuilderOptions,
  buildApplication,
} from "@angular-devkit/build-angular";
import { dotenvRun } from "@dotenv-run/esbuild";
import type { DotenvRunOptions } from "@dotenv-run/core";
import { from, switchMap, tap, map } from "rxjs";
import { indexHtml } from "../../utils/esbuild-index-html";
import { getProjectCwd } from "../../utils/project";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
import { join } from "path";

export const buildWithPlugin = (
  options: ApplicationBuilderOptions & NgxEnvSchema,
  context: BuilderContext
) => {
  const dotEnvOptions: DotenvRunOptions = {
    ...options.ngxEnv,
    appEnv: "NG_APP_ENV",
  };
  return from(getProjectCwd(context)).pipe(
    switchMap((cwd) =>
      fromAsyncIterable(
        buildApplication(options, context, [
          dotenvRun({ ...dotEnvOptions, cwd }),
        ])
      ).pipe(
        tap(() => {
          indexHtml(
            join(cwd, options.outputPath),
            dotEnvOptions,
            !!options.ssr
          );
        })
      )
    )
  );
};

export default createBuilder<ApplicationBuilderOptions>(buildWithPlugin);
