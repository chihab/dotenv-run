import { SchematicsException, Tree } from '@angular-devkit/schematics';

export interface WorkspaceProject {
  projectType?: string;
  architect?: Record<
    string,
    { builder: string; options?: Record<string, any> }
  >;
}

export interface Workspace {
  defaultProject?: string;
  projects: Record<string, WorkspaceProject>;
}

export function getWorkspace(host: Tree): {
  path: string;
  workspace: Workspace;
} {
  const possibleFiles = ['/angular.json', './angular.json'];
  const path = possibleFiles.find((path) => host.exists(path));
  const configBuffer = path ? host.read(path) : undefined;

  if (!path || !configBuffer) {
    throw new SchematicsException(`Could not find angular.json`);
  }

  const content = configBuffer.toString();
  let workspace: Workspace;
  try {
    workspace = JSON.parse(content);
  } catch (e: any) {
    throw new SchematicsException(
      `Could not parse angular.json: ${e?.message}`
    );
  }

  return { path, workspace };
}
