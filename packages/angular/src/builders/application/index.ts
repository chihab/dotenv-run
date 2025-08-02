import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
  fromAsyncIterable,
} from "@angular-devkit/architect";
import { ApplicationBuilderOptions, buildApplication } from "@angular/build";
import { env, type DotenvRunOptions } from "@dotenv-run/core";
import { join } from "path";
import { from, switchMap, tap } from "rxjs";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
import { getEnvironment } from "../utils/get-environment";
import { writeRuntimeFile } from "../utils/write-ngx-env-runtime";
import { getProjectCwd } from "../utils/project";
import { indexHtmlTransformer } from "../utils/index-html-transform";

export const executeWithEnv = (
  options: ApplicationBuilderOptions & NgxEnvSchema,
  context: BuilderContext
) => {
  const dotEnvOptions: DotenvRunOptions = options.ngxEnv;
  return from(getProjectCwd(context)).pipe(
    switchMap((cwd) => {
      const { full, raw } = env({
        ...dotEnvOptions,
        cwd,
        global: "_NGX_ENV_",
        environment: getEnvironment(context.target.configuration),
      });
      options.define = full;
      return fromAsyncIterable<BuilderOutput>(
        buildApplication(options, context, {
          indexHtmlTransformer: async (html) => {
            return indexHtmlTransformer(
              html,
              raw,
              false,
              dotEnvOptions.runtime
            );
          },
        })
      ).pipe(
        tap(() => {
          if (dotEnvOptions.runtime) {
            const outputDir = join(
              context.workspaceRoot,
              options.outputPath?.toString() ?? `dist/${context.target.project}`
            );
            writeRuntimeFile(
              join(outputDir, "browser"),
              Array.isArray(options.localize) ? options.localize : [],
              raw
            );
          }
        })
      );
    })
  );
};

export default createBuilder<ApplicationBuilderOptions>(executeWithEnv);
