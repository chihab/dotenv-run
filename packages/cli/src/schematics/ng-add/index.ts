import {
  chain,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { getWorkspace, WorkspaceProject } from '../../utils/workspace';

function writeBuilder(
  project: WorkspaceProject,
  target: string,
  builder: string,
  mandatory = false
) {
  if (!project?.architect?.[target]) {
    if (mandatory) {
      throw new SchematicsException(
        `Cannot read the output path(architect.build.serve.builder) in angular.json`
      );
    }
    return;
  }
  project.architect[target] = {
    ...project.architect[target],
    builder,
  };
}

export function builder(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const { path: workspacePath, workspace } = getWorkspace(tree);
    console.log(workspacePath);
    console.log(workspace);
    // // get the workspace details

    // // getting project name
    if (!options.project) {
      if (workspace.defaultProject) {
        options.project = workspace.defaultProject;
      } else {
        throw new SchematicsException(
          'No Angular project selected and no default project in the workspace'
        );
      }
    }

    // // Validating project name
    const project: WorkspaceProject = workspace.projects[options.project];
    if (!project) {
      throw new SchematicsException(
        'The specified Angular project is not defined in this workspace'
      );
    }

    // Checking if it is application
    if (project.projectType !== 'application') {
      throw new SchematicsException(
        `Deploy requires an Angular project type of "application" in angular.json`
      );
    }

    writeBuilder(project, 'build', '@ngx-env/cli:browser', true);
    writeBuilder(project, 'serve', '@ngx-env/cli:dev-server', true);
    writeBuilder(project, 'test', '@ngx-env/cli:karma');
    writeBuilder(project, 'server', '@ngx-env/cli:server');

    tree.overwrite(workspacePath, JSON.stringify(workspace, null, 2));
    return tree;
  };
}

export default function (options: any): Rule {
  return chain([builder(options)]);
}
