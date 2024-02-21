import {
  BuilderContext,
  createBuilder,
  targetFromTargetString,
} from "@angular-devkit/architect";
import {
  ExtractI18nBuilderOptions,
  executeExtractI18nBuilder,
} from "@angular-devkit/build-angular";
import { combineLatest, switchMap } from "rxjs";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";

export const buildWithPlugin = (
  options: ExtractI18nBuilderOptions & NgxEnvSchema,
  context: BuilderContext
) => {
  const buildTarget = targetFromTargetString(
    options.buildTarget ?? options.browserTarget
  );
  // options.buildTarget = "@angular-devkit/build-angular:application";
  async function setup() {
    const targetOptions = await context.getTargetOptions(buildTarget);
    if ((await builderName()) === "@ngx-env/builder:application") {
      // Because of validateOptions being ignored, we need to validate options manually
      await context.validateOptions(
        targetOptions,
        "@ngx-env/builder:application"
      );
    }
    return targetOptions;
  }
  async function builderName() {
    return context.getBuilderNameForTarget(buildTarget);
  }
  return combineLatest([setup(), builderName()]).pipe(
    switchMap(([_options, builderName]) => {
      if (builderName === "@ngx-env/builder:browser") {
        return executeExtractI18nBuilder(options, context);
      } else {
        return executeExtractI18nBuilder(options, {
          ...context,
          getBuilderNameForTarget: async () =>
            "@angular-devkit/build-angular:" + builderName.split(":")[1],
          validateOptions: async (options) => options as any,
        });
      }
    })
  );
};

export default createBuilder<ExtractI18nBuilderOptions>(buildWithPlugin);
