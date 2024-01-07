import {
  BuilderContext,
  createBuilder,
  fromAsyncIterable,
  targetFromTargetString,
} from "@angular-devkit/architect";
import {
  ApplicationBuilderOptions,
  buildApplication,
} from "@angular-devkit/build-angular";
import { dotenvRunDefine } from "@dotenv-run/esbuild";
import { env, type DotenvRunOptions } from "@dotenv-run/core";
import { from, switchMap, tap } from "rxjs";
import { indexHtml } from "../utils/esbuild-index-html";
import { getProjectCwd } from "../utils/project";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
import { join } from "path";
import { getEnvironment } from "../utils/get-environment";

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
          indexHtml(join(cwd, options.outputPath), raw, !!options.ssr);
        })
      );
    })
  );
};

export default createBuilder<ApplicationBuilderOptions>(buildWithPlugin);
