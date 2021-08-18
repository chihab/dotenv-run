import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import {
  executeServerBuilder,
  ServerBuilderOptions,
} from "@angular-devkit/build-angular";
import { plugin } from "../plugin";

export const buildCustomWebpackServer = (
  options: ServerBuilderOptions,
  context: BuilderContext
): ReturnType<typeof executeServerBuilder> =>
  executeServerBuilder(
    options,
    context,
    plugin({ ...options, env: "production" })
  );

export default createBuilder<ServerBuilderOptions>(buildCustomWebpackServer);
