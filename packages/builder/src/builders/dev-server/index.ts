import {
  BuilderContext,
  createBuilder,
  targetFromTargetString,
} from "@angular-devkit/architect";
import {
  DevServerBuilderOptions,
  executeDevServerBuilder,
} from "@angular-devkit/build-angular";
import { serveWebpackBrowser } from "@angular-devkit/build-angular/src/dev-server";
import { from } from "rxjs";
import { switchMap } from "rxjs/operators";
import { plugin } from "../plugin";

export const buildWithPlugin = (
  options: DevServerBuilderOptions,
  context: BuilderContext
): ReturnType<typeof serveWebpackBrowser> => {
  const browserTarget = targetFromTargetString(options.browserTarget);
  async function setup() {
    return context.getTargetOptions(
      browserTarget
    ) as unknown as DevServerBuilderOptions;
  }

  return from(setup()).pipe(
    switchMap((_options) =>
      executeDevServerBuilder(
        options,
        context,
        plugin({ ..._options, env: browserTarget.configuration })
      )
    )
  );
};

export default createBuilder<DevServerBuilderOptions>(buildWithPlugin);
