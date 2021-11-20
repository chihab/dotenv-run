import {
  BuilderContext,
  createBuilder,
  targetFromTargetString,
} from "@angular-devkit/architect";
import {
  DevServerBuilderOptions,
  executeDevServerBuilder,
} from "@angular-devkit/build-angular";
import { DevServerBuilderOutput } from "@angular-devkit/build-angular";
import { Observable, from } from "rxjs";
import { switchMap } from "rxjs/operators";
import { plugin } from "../plugin";

export const buildWithPlugin = (
  options: DevServerBuilderOptions,
  context: BuilderContext
): Observable<DevServerBuilderOutput> => {
  const browserTarget = targetFromTargetString(options.browserTarget);
  async function setup() {
    return context.getTargetOptions(
      browserTarget
    ) as unknown as DevServerBuilderOptions;
  }

  return from(setup()).pipe(
    switchMap((_options) => {
      options.sourceMap = _options.sourceMap || {
        vendor: false,
        hidden: false,
        scripts: false,
        styles: false,
      };
      options.optimization =
        _options.optimization ||
        ({
          scripts: true,
          styles: { minify: true, inlineCritical: true },
          fonts: { inline: true },
        } as any); // Retro-compatibility with <= Angular 12
      return executeDevServerBuilder(options, context, plugin());
    })
  );
};

export default createBuilder<DevServerBuilderOptions>(buildWithPlugin);
