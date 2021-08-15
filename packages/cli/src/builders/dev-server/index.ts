import {
  BuilderContext,
  createBuilder,
  targetFromTargetString,
} from '@angular-devkit/architect';
import {
  DevServerBuilderOptions,
  executeDevServerBuilder,
} from '@angular-devkit/build-angular';
import { serveWebpackBrowser } from '@angular-devkit/build-angular/src/dev-server';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import browser from '../browser';
import { plugin } from '../plugin';

export const buildWithPlugin = (
  pluginOptions: DevServerBuilderOptions,
  context: BuilderContext
): ReturnType<typeof serveWebpackBrowser> => {
  async function setup() {
    const browserTarget = targetFromTargetString(pluginOptions.browserTarget);
    return context.getTargetOptions(
      browserTarget
    ) as unknown as DevServerBuilderOptions;
  }

  return from(setup()).pipe(
    switchMap((options) =>
      executeDevServerBuilder(pluginOptions, context, plugin(options))
    )
  );
};

export default createBuilder<DevServerBuilderOptions>(buildWithPlugin);
