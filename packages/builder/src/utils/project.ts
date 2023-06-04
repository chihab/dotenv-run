import { BuilderContext } from "@angular-devkit/architect";
import * as path from "path";

export async function getProjectCwd(context: BuilderContext) {
  const metadata = (await context.getProjectMetadata(
    context.target.project
  )) as { root: string };
  return path.resolve(context.workspaceRoot, metadata.root);
}
