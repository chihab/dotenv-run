import { normalize } from "@angular-devkit/core";
import {
  apply,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
  url,
} from "@angular-devkit/schematics";
import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks";
import { getWorkspace, WorkspaceProject } from "../../builders/utils/workspace";

function writeBuilder(
  project: WorkspaceProject,
  target: string,
  builder: string,
  mandatory = false,
  options?: Record<string, any>
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
    options: {
      ...project.architect[target].options,
      ...options,
    },
    builder,
  };
}

function hasTargetBuilder(
  project: WorkspaceProject,
  target: string,
  builderType: string
) {
  return project.architect[target]?.builder.endsWith(`:${builderType}`);
}

export function builder(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const { path: workspacePath, workspace } = getWorkspace(tree);

    if (!options.project) {
      throw new SchematicsException(
        "No Angular project found in the workspace"
      );
    }

    const project: WorkspaceProject = workspace.projects[options.project];
    if (!project) {
      throw new SchematicsException(
        "The specified Angular project is not defined in this workspace"
      );
    }

    if (project.projectType !== "application") {
      throw new SchematicsException(
        `@ngx-env/builder requires an Angular project type of "application" in angular.json`
      );
    }
    if (
      !hasTargetBuilder(project, "build", "application") &&
      !hasTargetBuilder(project, "build", "browser")
    ) {
      throw new SchematicsException(
        `@ngx-env/builder requires one of "application" or "browser" builder`
      );
    }
    if (hasTargetBuilder(project, "build", "application")) {
      writeBuilder(project, "build", "@ngx-env/builder:application", true);
    } else {
      writeBuilder(project, "build", "@ngx-env/builder:browser", true);
      writeBuilder(project, "server", "@ngx-env/builder:server");
      const webpackDependency = {
        name: "@dotenv-run/webpack",
        version: "~1.5.2",
      };
      try {
        addPackageJsonDependency(tree, webpackDependency);
        _context.addTask(new NodePackageInstallTask());
      } catch {
        console.log(
          `Cannot write ${webpackDependency.name}@${webpackDependency.version} to package.json`
        );
        console.log(
          `Add ${webpackDependency.name}@${webpackDependency.version} to package.json manually`
        );
      }
    }
    writeBuilder(project, "serve", "@ngx-env/builder:dev-server", true);
    if (hasTargetBuilder(project, "test", "unit-test")) {
      writeBuilder(project, "test", "@ngx-env/builder:unit-test");
    } else if (hasTargetBuilder(project, "test", "karma")) {
      writeBuilder(project, "test", "@ngx-env/builder:karma");
    }
    writeBuilder(project, "extract-i18n", "@ngx-env/builder:extract-i18n");

    tree.overwrite(workspacePath, JSON.stringify(workspace, null, 2));
    return tree;
  };
}

function getPackageJson(tree: Tree) {
  const packageJson = JSON.parse(tree.read("package.json")!.toString());
  return packageJson;
}

function addPackageJsonDependency(
  tree: Tree,
  dependency: { name: string; version: string }
) {
  const packageJson = getPackageJson(tree);
  packageJson.devDependencies = packageJson.dependencies || {};
  packageJson.devDependencies[dependency.name] = dependency.version;
  tree.overwrite("package.json", JSON.stringify(packageJson, null, 2));
}

export default function (options: any): Rule {
  return chain([
    mergeWith(
      apply(url("./template"), [move(normalize("./src"))]),
      MergeStrategy.Overwrite
    ),
    builder(options),
  ]);
}
