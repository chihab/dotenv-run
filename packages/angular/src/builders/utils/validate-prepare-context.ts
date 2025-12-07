import {
  BuilderContext,
  targetFromTargetString,
} from "@angular-devkit/architect";
import { Schema } from "@angular-devkit/architect/src/input-schema";
import { Schema as ApplicationBuilderOptions } from "@angular/build/src/builders/application/schema";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
import { UnitTestBuilderOptions } from "@angular/build/src/builders/unit-test/builder";
import { DotenvRunOptions } from "@dotenv-run/core";

export async function validateAndPrepareBuildContext(
  buildTargetString: string,
  context: BuilderContext
) {
  if (!buildTargetString) {
    console.log("No build target string provided");
    return {
      ngxEnv: {} as DotenvRunOptions,
      name: "@ngx-env/builder:application",
      configuration: "development",
      options: {} as unknown as UnitTestBuilderOptions,
    };
  }
  const buildTarget = await targetFromTargetString(
    buildTargetString,
    context.target?.project,
    "build"
  );
  const builderName = await context.getBuilderNameForTarget(buildTarget);
  const targetOptions = (await context.getTargetOptions(
    buildTarget
  )) as Schema & NgxEnvSchema;
  if (builderName === "@ngx-env/builder:application") {
    await context.validateOptions(targetOptions, builderName);
    const ngxEnv = targetOptions.ngxEnv;
    delete targetOptions.ngxEnv;
    context.getTargetOptions = async () => targetOptions;
    return {
      ngxEnv: ngxEnv as DotenvRunOptions,
      name: builderName,
      configuration: buildTarget.configuration,
      options: targetOptions as unknown as ApplicationBuilderOptions,
    };
  }
  throw new Error(
    `Use @ngx-env/builder:application in ${buildTarget.project}:${buildTarget.target}`
  );
}
