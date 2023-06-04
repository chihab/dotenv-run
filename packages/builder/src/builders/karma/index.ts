import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import {
  executeKarmaBuilder,
  KarmaBuilderOptions,
} from "@angular-devkit/build-angular";
import { NgxEnvSchema } from "../ngx-env/ngx-env-schema";
import { plugin } from "../plugin";
import { from, switchMap } from "rxjs";
import { getProjectCwd } from "../../utils/project";

export const buildWithPlugin = (
  options: KarmaBuilderOptions & NgxEnvSchema,
  context: BuilderContext
): ReturnType<typeof executeKarmaBuilder> => {
  return from(getProjectCwd(context)).pipe(
    switchMap((cwd: string) =>
      executeKarmaBuilder(options, context, plugin(options.ngxEnv, cwd))
    )
  );
};
export default createBuilder<KarmaBuilderOptions>(buildWithPlugin);
