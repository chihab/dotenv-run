import * as findUp from "find-up";
import { readFileSync } from "fs";
import * as path from "path";

/**
 * Return root `turbo.json` file path if found, else return original input.
 *
 * @param turboPath existing turbo.json file path.
 * @throws {Error} if `turboPath` is not exist.
 */
function findTurboRootPath(turboPath: string): string {
  // test if file content has `"extends": ["//"]`
  const isSubProject = readFileSync(turboPath, "utf8").includes('"extends"');
  if (isSubProject) {
    const parent = path.dirname(path.dirname(turboPath));
    const rootPath = findUp.sync("turbo.json", { cwd: parent });
    if (rootPath) return rootPath;
  }
  return turboPath;
}

export function findRootPath() {
  if (process.env.NX_WORKSPACE_ROOT) {
    return process.env.NX_WORKSPACE_ROOT;
  }
  let p = findUp.sync([
    "turbo.json",
    "nx.json", // Just in case NX_WORKSPACE_ROOT is not set
    "lerna.json",
    "pnpm-workspace.yaml",
  ]);

  if (p && p.endsWith("turbo.json")) {
    p = findTurboRootPath(p);
  }

  if (!p) p = findUp.sync(["package.json"]);
  return p ? path.dirname(p) : process.cwd();
}
