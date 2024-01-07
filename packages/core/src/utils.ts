import * as fs from "fs";
import * as path from "path";

export function isSubfolder(parent: string, child: string) {
  return path.relative(parent, child).startsWith("..");
}

export function getAbsoluteEnvPath(envPath: string, cwd: string) {
  const _envPath = path.isAbsolute(envPath)
    ? envPath
    : path.resolve(cwd, envPath);
  return fs.existsSync(_envPath)
    ? fs.lstatSync(_envPath).isDirectory()
      ? _envPath
      : path.dirname(_envPath)
    : cwd;
}

export function getPathsDownTo(envPath: string, destination: string) {
  let currentPath = destination;
  const paths = [currentPath];
  while (currentPath !== envPath && currentPath !== "/") {
    currentPath = path.dirname(currentPath);
    paths.push(currentPath);
  }
  return paths;
}
