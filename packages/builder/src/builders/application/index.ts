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
import { DotenvRunOptions } from "@dotenv-run/webpack";
import { from, switchMap, mergeMap, map } from "rxjs";
import { indexHtml } from "../../utils/esbuild-index-html";
import { getProjectCwd } from "../../utils/project";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";

export const buildWithPlugin = (
  options: ApplicationBuilderOptions & NgxEnvSchema,
  context: BuilderContext
) => {
  const dotEnvOptions: DotenvRunOptions = {
    ...options.ngxEnv,
    appEnv: "NG_APP_ENV",
  };
  return from(getProjectCwd(context)).pipe(
    switchMap((cwd) => {
      dotEnvOptions.cwd = cwd;
      return fromAsyncIterable(
        buildApplication(options, context, [dotenvRun(dotEnvOptions)])
      );
    }),
    mergeMap((result) =>
      from(indexHtml(options, dotEnvOptions)).pipe(map(() => result))
    )
  );
};

export default createBuilder<ApplicationBuilderOptions>(buildWithPlugin);
