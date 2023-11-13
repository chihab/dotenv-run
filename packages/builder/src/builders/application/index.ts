import {
  BuilderContext,
  createBuilder,
  fromAsyncIterable,
} from "@angular-devkit/architect";
import {
  ApplicationBuilderOptions,
  buildApplication,
} from "@angular-devkit/build-angular";
import { from, switchMap, tap } from "rxjs";
import { getProjectCwd } from "../../utils/project";
import { plugin, indexHtml } from "../esbuild-plugin";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";

export const buildWithPlugin = (
  options: ApplicationBuilderOptions & NgxEnvSchema,
  context: BuilderContext
) => {
  let cwd: string;
  return from(getProjectCwd(context)).pipe(
    switchMap((_cwd) => {
      cwd = _cwd;
      return fromAsyncIterable(
        buildApplication(options, context, plugin({ ...options.ngxEnv, cwd }))
      );
    }),
    tap(() => {
      indexHtml(options, { ...options.ngxEnv, cwd });
    })
  );
};

export default createBuilder<ApplicationBuilderOptions>(buildWithPlugin);
