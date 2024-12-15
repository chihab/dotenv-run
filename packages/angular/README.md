<h1>@ngx-env/builder</h1>

<img src="https://github.com/chihab/dotenv-run/raw/main/packages/angular/logo.svg" alt="@ngx-env/builder" width="180px" align="right" />

[![npm version](https://badge.fury.io/js/%40ngx-env%2Fbuilder.svg)](https://www.npmjs.com/package/@ngx-env/builder)
[![monthly downloads](https://img.shields.io/npm/dm/@ngx-env/builder.svg)](https://www.npmjs.com/package/@ngx-env/builder)

**Easily inject environment variables into your Angular applications**

- ✅ Official recommendation in [dotenv documentation](https://www.dotenv.org/docs/frameworks/angular/vercel) 🔥
- ✅ Webpack and ESBuild support 🚀
- ✅ Runtime environment variables 🎉
- ✅ Loading priorities of environment variables with Monorepo Support ([Nx](https://nx.dev), [Turbo](https://turbo.build/), etc.) ✨
- ✅ Easy to use, no configuration required
- ✅ Up to date with latest Angular versions
- ✅ Supports all Angular CLI commands
- ✅ Supports `process.env` and `import.meta.env` usage in TypeScript
- ✅ Filters sensitive variables using a Regular Expression
- ✅ Used by popular repositories
  - [Official Microsoft Azure Samples](https://github.com/Azure-Samples/contoso-real-estate) ![GitHub Repo stars](https://img.shields.io/github/stars/Azure-Samples/contoso-real-estate)
  - [Official Quarkus Workshop](https://github.com/quarkusio/quarkus-workshops) ![GitHub Repo stars](https://img.shields.io/github/stars/quarkusio/quarkus-workshops)
  - [Scholarsome by Redhat](https://github.com/hwgilbert16/scholarsome) ![GitHub Repo stars](https://img.shields.io/github/stars/hwgilbert16/scholarsome)
  - [Dan Wahlin's Angular-JumpStart](https://github.com/DanWahlin/Angular-JumpStart) ![GitHub Repo stars](https://img.shields.io/github/stars/DanWahlin/Angular-JumpStart)
- ✅ Active development and support

## Testimonials

[motdotla](https://github.com/motdotla) - dotenv author and maintainer @**dotenvx**
![alt text](https://github.com/chihab/dotenv-run/raw/main/packages/angular/motdotla.png)
NB: Angular not Angular.js :)

[manekinekko](https://github.com/manekinekko) - SSE @**microsoft**
![Wassim Chegham](https://github.com/chihab/dotenv-run/raw/main/packages/angular/manekinekko.png)

## Quick Demo

- [v19 with vite/esbuild builder](https://stackblitz.com/edit/ngx-env-3ey8js?file=src%2Fapp.component.ts)
- [v16 with webpack builder](https://stackblitz.com/edit/ngx-env?file=src%2Fapp.component.ts)

<h2> Table of contents</h2>

- [Quick start](#quick-start)
- [Using Environment Variables](#using-environment-variables)
  - [`NG_APP_*` or Custom Prefix](#ng_app_-or-custom-prefix)
  - [`NG_APP_ENV`](#ng_app_env)
  - [Usage In Templates](#usage-in-templates)
  - [Usage in Index.html](#usage-in-indexhtml)
- [Defining Environment Variables](#defining-environment-variables)
  - [Command Line](#command-line)
    - [Windows (cmd.exe)](#windows-cmdexe)
    - [Windows (Powershell)](#windows-powershell)
    - [Linux, macOS (Bash)](#linux-macos-bash)
  - [In `.env` with loading priorities](#in-env-with-loading-priorities)
- [Cascading Environment Variables](#cascading-environment-variables)
- [Usage in Nx Monorepo](#usage-in-nx-monorepo)
- [Usage with Docker](#usage-with-docker)
- [Usage with custom builders 💡](#usage-with-custom-builders-)
- [Good Practices](#good-practices)
  - [Use `import.meta.env` notation](#use-importmetaenv-notation)
  - [Declare your environment variables in the generated `.env.d.ts` file](#declare-your-environment-variables-in-the-generated-envdts-file)
  - [Use `process.env` or `import.meta.env` inside `environment.ts` files](#use-processenv-or-importmetaenv-inside-environmentts-files)
- [Known Issues](#known-issues)
  - [`process` variable](#process-variable)
  - [Property comes from an index signature](#property-comes-from-an-index-signature)
- [How It Works](#how-it-works)
- [Credits](#credits)
- [License](#license)

# Quick start

1. **Add @ngx-env to your CLI project**

```sh
ng add @ngx-env/builder
```

2. **Define Environment Variables in `.env`** (optional)

```sh
NG_APP_VERSION=$npm_package_version
NG_APP_COMMIT=$GITHUB_SHA
NG_APP_ENABLE_SENTRY=false
```

3. **Usage in TS**

```ts
@Component({
  selector: "app-footer",
  template: `{{ branch }} - {{ commit }}`,
})
export class MainComponent {
  branch = import.meta.env.NG_APP_BRANCH_NAME; // Recommended
  commit = process.env.NG_APP_COMMIT; // Deprecated
}
```

```html
<!-- index.html -->
<head>
  <title>NgApp on %NG_APP_BRANCH_NAME% - %NG_APP_COMMIT%</title>
</head>
```

4. **Run your CLI commands**

```sh
npm start
# Command-line environment variables
NG_APP_BRANCH_NAME=$GITHUB_HEAD_REF ng test
NG_APP_ENABLE_SENTRY=true npm run build
```

# Using Environment Variables

Your project can consume variables declared in your environment as if they were declared locally in your JS files.

These environment variables can be useful for:

- displaying information conditionally based on where the project is deployed
- consuming sensitive data that lives outside of version control.

The environment variables will be defined for you on `process.env` (deprecated) and `import.meta.env`. For example, having an environment variable named `NG_APP_NOT_SECRET_CODE` will be exposed in your JS as `process.env.NG_APP_NOT_SECRET_CODE` and `import.meta.env.NG_APP_NOT_SECRET_CODE`.

**The environment variables are embedded during the build time**.

**⚠ Important**

> Do not store any secrets (such as private API keys) in your Angular app!
>
> Environment variables are embedded into the build, meaning anyone can view them by inspecting your app's files.

## `NG_APP_*` or Custom Prefix

You must create custom environment variables beginning with `NG_APP_` or using any custom prefix.

If you want to have a shorter prefix like `NG_` or if you want to access some domain specific variables directly, you can set the prefix in the `angular.json` configuration. You can use any valid regular expression to filter the variables.

```ts
  "architect": {
    "build": {
      "builder": "@ngx-env/builder:browser",
      "options": {
          ...
          "scripts": []
          "ngxEnv": {
            "prefix": "(ORG|GITHUB|)_"
          }
      }
    }
  }
```

or using `ng config`

```sh
ng config projects.YOUR_APP_NAME.architect.build.options.ngxEnv.prefix '(ORG|GITHUB|)_'
```

Any other variables not starting with `NG_APP_` or your custom prefix will be ignored to avoid accidentally exposing a private key on the machine that could have the same name.

See how to [use system environment variables](#expanding-env).

**Changing any environment variables will require you to restart the development server if it is running.**

## `NG_APP_ENV`

There is also a built-in environment variable called `NG_APP_ENV`. You can read it from `import.meta.env.NG_APP_ENV`.

By default `NG_APP_ENV` is set to `NODE_ENV` but you are free to override it.

Note that `NG_APP_ENV` remains available even if you define a custom prefix not matching `NG_APP`.

Having access to the `NG_APP_ENV` is also useful for performing actions conditionally:

```js
if (import.meta.env.NG_APP_ENV !== "production") {
  analytics.disable();
}
```

When you compile the app with `npm run build`, the minification step will strip out this condition, and the resulting bundle will be smaller.

## Usage In Templates

You have two options to consume an environment variable in your component's template.

1. **From your component class**

```ts
@Component({
  selector: "app-footer",
})
export class FooterComponent {
  version = import.meta.env.NG_APP_VERSION;
}
```

```
{{ version }}
```

2. **Using the `env` pipe**

```
npm install @ngx-env/core
```

```ts
import { NgxEnvModule } from "@ngx-env/core";

@NgModule({
  declarations: [FoooterComponent],
  imports: [CommonModule, NgxEnvModule],
})
export class FooterModule {}
```

```
{{ 'import.meta.env.NG_APP_ENV' | env }}
{{ 'NG_APP_ENV' | env }}
```

## Usage in Index.html

You can also access the environment variables starting with `NG_APP_` in the `index.html`.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>NgApp on %NG_APP_BRANCH_NAME%</title>
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>
```

## Runtime Environment Variables

By default, environment variables are embedded during the build time which means they are static and cannot be changed at runtime.

If you want to change the environment variables at runtime, you can use the `runtime` option in the `angular.json` configuration.

```json
"ngxEnv": {
  "prefix": "NG_APP_",
  "runtime": true
}
```

When you set the `runtime` option to `true`, a new environment file will be created during the build with the name `ngx-env.js` in the build output directory containing the environment variables that match the prefix. You can change the environment variables at runtime by modifying this file.

```ts
globalThis._NGX_ENV_ = {
  NG_APP_VERSION: "10.0.0",
};
```

If you are using server-side rendering, you should add `import '@ngx-env/builder/runtime'` at the top of the `main.server.ts` file.

# Defining Environment Variables

## Command Line

Defining environment variables can vary between OSes. It’s also important to know that this manner is temporary for the life of the shell session.

### Windows (cmd.exe)

```cmd
set "NG_APP_NOT_SECRET_CODE=abcdef" && npm start
```

(Note: Quotes around the variable assignment are required to avoid a trailing whitespace.)

### Windows (Powershell)

```Powershell
($env:NG_APP_NOT_SECRET_CODE = "abcdef") -and (npm start)
```

### Linux, macOS (Bash)

```sh
NG_APP_NOT_SECRET_CODE=abcdef npm start
```

## In `.env` with loading priorities

`@ngx-env/builder` uses [dotenv](https://github.com/motdotla/dotenv) to support loading environment variables from `.env` files.

`.env` files are to be stored alongside the `package.json`.

`@ngx-env/builder` loads `.env` files with these specific names for the following `NG_APP_ENV` values, files on the top have less priority than files on the bottom.

An env file for a specific mode (e.g. .env.production) will take higher priority than a generic one (e.g. .env).

| valid `.env` filenames     | `NG_APP_ENV=*` | `NG_APP_ENV=test` |
| -------------------------- | -------------- | ----------------- |
| `.env`                     | ✔️             | ✔️                |
| `.env.local`               | ✔️             | ✖️                |
| `.env.${NG_APP_ENV}`       | ✔️             | ✔️                |
| `.env.${NG_APP_ENV}.local` | ✔️             | ✔️                |

In addition, environment variables that already exist when the CLI is executed have the highest priority and will not be overwritten by .env files. For example, when running `NG_APP_SOME_KEY=123 ng serve`.

**Expanding `.env`**

You can expand variables already available on your machine for use in your `.env`

For example:

```shell
NG_APP_VERSION=$npm_package_version
NG_APP_HOSTNAME=$HOSTNAME
```

Or expand variables local to the current `.env` file:

```shell
DOMAIN=www.example.com
NG_APP_FOO=$DOMAIN/foo
NG_APP_BAR=$DOMAIN/bar
```

# Cascading Environment Variables

**@ngx-env/builder** supports monorepo projects with multiple applications.

When you have multiple applications in your monorepo, you can define a common `.env.*` file in the root of your monorepo and override it in each application or any other subdirectory below the root.

This is useful when you have a common configuration for all applications and want to override it for a specific application.

In order to do that, you need to define the `root` property in the `ngxEnv` section of your `angular.json` file.

```json
"ngxEnv": {
  "prefix": "NGX_",
  "root": "../../"
},
```

For example, you have the following directory structure:

```
/home/user/monorepo
 apps
    frontend1
       .env
    frontend2
       .env.dev
       .env
.env
.env.dev
```

and the configuration below in frontends' angular.json:

```json
"ngxEnv": {
  "prefix": "NGX_",
  "root": "../../"
},
```

Consumed dot env files will be ordered by hierarchy as follows:

- **frontend1**

```
/home/user/monorepo/apps/frontend1/.env
/home/user/monorepo/.env.dev
/home/user/monorepo/.env
```

- **frontend2**

```
/home/user/monorepo/apps/frontend2/.env.dev
/home/user/monorepo/apps/frontend2/.env
/home/user/monorepo/.env.dev
/home/user/monorepo/.env
```

These root configurations are equivalent:

- ` "root": "../../"`
- ` "root": "../../.env"`
- ` "root": "/home/user/monorepo"`
- ` "root": "/home/user/monorepo/.env"`

# Usage in Nx Monorepo

**@ngx-env/builder** supports [Nx](https://nx.dev) projects with multiple applications.

Currently the schematics only supports Angular CLI projects, so you need to install the package and uppdate `project.json` manually.

1. **Install the package**

```
npm add -D @ngx-env/builder
```

2. **Replace Angular builders in project.json**

Replace every occurence of `@angular-devkit/build-angular` with `@ngx-env/builder` in `project.json` file.

3. **Create .env.d.ts inside src/**

```ts
declare var process: {
  env: {
    NG_APP_ENV: string;
    [key: string]: any;
  };
};
```

When you have multiple applications in your Nx workspace, you can define common `.env.*` files in the root of your workspace and override them in each application or any other subdirectory below the root. See [Cascading Environment Variables](#cascading-environment-variables) for more details.

# Usage with Docker

@ngx-env/builder can be used with Docker to provide environment-specific configuration during the build and deployment of an Angular application.

The Dockerfile below will build an Angular application with the `NGX_API_URL` environment variable set to the value of the `NGX_API_URL` build argument.

```dockerfile
FROM node:18

# Get the arguments from the command line
ARG NGX_API_URL

# Set the environment variables
ENV NGX_API_URL=$NGX_API_URL

################### Build ans Serve the application ######################
# You can replace this part with your own build process
WORKDIR /app
RUN npx -y @angular/cli@15 new ng-app --defaults
WORKDIR /app/ng-app
# In your own project, you would rather have the dependencies in the package.json file
RUN npx ng add @ngx-env/builder --skip-confirmation
RUN npm add @ngx-env/core
# In your own project, you would rather have the configuration in the angular.json file
RUN npx ng config projects.ng-app.architect.build.options.ngxEnv.prefix 'NGX_'
# Some sample code to show that the environment variable is available
RUN echo 'console.log("NGX_API_URL", import.meta.env["NGX_API_URL"])' >>src/main.ts
RUN npm run build
EXPOSE 8080
CMD ["npx", "http-server", "dist/ng-app", "-p", "8080"]
################################################################
```

Build and run the Docker image:

```shell
docker build --build-arg NGX_API_URL=http://staging.api.com -t ngx-env-demo .
docker run -p 8080:8080 ngx-env-demo
```

# Usage with custom builders 💡

If you are already using a custom builder like `@angular-builders/custom-webpack` or `ngx-build-plus` and you cannot replace them with `@ngx-env/builder` you can still use `@dotenv-run/webpack`.

1. **Install the package**

```
npm add -D @dotenv-run/webpack
```

2. **Update your webpack config**

```js
import { DotenvRunPlugin } from "@dotenv-run/webpack";
import type { Configuration } from "webpack";

export default (config: Configuration) => {
  config.plugins?.push(
    new DotenvRunPlugin({ prefix: "NGX", verbose: true, root: "../../" })
  );
  return config;
};
```

The webpack configuration might be different depending on your custom builder but the important part is to add the `DotenvRunPlugin` plugin.

[@dotenv-run/webpack](https://github.com/chihab/dotenv-run) is created by the same author of `@ngx-env/builder` and is used by `@ngx-env/builder` under the hood.

You can find a sample project using `@dotenv-run/webpack` [here](https://github.com/chihab/dotenv-run/tree/main/examples/apps/ng-app).

Please give it a star if you find it useful. ❤️

# Good Practices

## Use `import.meta.env` notation

@ngx-env/builder supports both widely used but deprecated process.env and the newly adopted import.meta.env notations.

The [`import.meta`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta) notation is a part of the ECMAScript standard, specifically the ECMAScript modules, which is widely adopted and supported by modern browsers and JavaScript environments. On the other hand, `process.env` is specific to Node.js and not available in the browser by default.

Usage `process.env` might introduce typing issues depending on whether your workspace references `@types/node` or not, `process.env` requires different TS configurations between the webapp and the server.

## Declare your environment variables in the generated `.env.d.ts` file

```ts
declare interface Env {
  readonly NODE_ENV: string;
  // Replace the following with your own environment variables, for example:
  // readonly NG_APP_VERSION: string;
  [key: string]: any;
}

declare interface ImportMeta {
  readonly env: Env;
}
```

## Use `process.env` or `import.meta.env` inside `environment.ts` files

We recommend to consume environment variables in Angular environment files, for two reasons:

- To avoid using `process.env` / `import.meta.env` in your business code.

  If one day you decide that a variable is no longer linked to the environment but rather to an Angular configuration, you would only have to modify the environment files.

- To be ready for the day when Angular would implement the consumption of environment variables directly in the CLI.

  If the syntax proposed by Angular CLI to access the environment variables turns out to be different, you would only have to modify the environment files.

Note that `@ngx-env/builder` might eventually remove support of `process.env` in future releases.

Example:

`environment.ts`

```ts
export const environment = {
  production: false,
  baseUrl: import.meta.env.NG_APP.BASE_URL,
  version: import.meta.env.NG_APP_VERSION,
};
```

`footer.component.ts`

```ts
import { environment } from "src/environments/environment";

@Injectable()
export class SomeService {
  version = environment.version;
  baseUrl = environment.baseUrl;
}
```

# Known Issues

## `process` variable

If you have issues with the `process`, you probably don't have the `.env.d.ts` file in your source folder.

This file is created by running `ng add @ngx-env/builder`.

Depending on your Angular version and your TS config, the file should either be defined this way:

```ts
declare var process: {
  env: {
    NG_APP_ENV: string;
    [key: string]: any;
  };
};
```

or this way (if your project references `@types/node`):

```ts
declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NG_APP_ENV: string;
  }
}
```

In general prefer using `import.meta.env` notation.

## Property comes from an index signature

If you prefer using import.meta.env.NGX_SOME_VARIABLE instead of import.meta.env['NGX_SOME_VARIABLE'], you can update the following line in your `tsconfig.json` file:

```diff
-"noPropertyAccessFromIndexSignature": true,
+"noPropertyAccessFromIndexSignature": false,
```

# How It Works

I wrote an article on [InDepth.dev](https://indepth.dev/tutorials/angular/inject-environment-variables) explaining how it works.

# Credits

- [dotenv](https://github.com/motdotla/dotenv)

# License

MIT © [Chihab Otmani](https://twitter.com/chihabotmani)
