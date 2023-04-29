<h1>@ngx-env/builder</h1>

<img src="https://raw.githubusercontent.com/chihab/ngx-env/main/logo.png" alt="dotenv" width="90px" align="right" />

[![npm version](https://badge.fury.io/js/%40ngx-env%2Fbuilder.svg)](https://www.npmjs.com/package/@ngx-env/builder)
[![monthly downloads](https://img.shields.io/npm/dm/@ngx-env/builder.svg)](https://www.npmjs.com/package/@ngx-env/builder)

**Easily inject environment variables into your Angular applications**


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
  - [In `.env`](#in-env)
- [Good Practices](#good-practices)
  - [Property comes from an index signature](#property-comes-from-an-index-signature)
- [Usage with Docker](#usage-with-docker)
- [Known Issues](#known-issues)
  - [`process` variable](#process-variable)
- [How It Works?](#how-it-works)
- [Credits](#credits)
- [License](#license)

# Quick start

1. **Add @ngx-env to your CLI project**

```sh
ng add @ngx-env/builder
```

2. **Define Environment Variables in `.env`**

```sh
NG_APP_VERSION=$npm_package_version
NG_APP_COMMIT=$GITHUB_SHA
NG_APP_ENABLE_SENTRY=false
```

3. **Use in TS and HTML**

```ts
@Component({
  selector: "app-main",
})
export class MainComponent {
  branch = process.env.NG_APP_BRANCH_NAME;
}
```

```html
<span> {{ branch }} </span>
<!-- Using env pipe from @ngx-env/core -->
<span> {{ 'process.env.NG_APP_VERSION' | env }} </span>
<span> {{ 'NG_APP_COMMIT' | env }} </span>
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
NG_APP_BRANCH_NAME=$GITHUB_HEAD_REF ng test
NG_APP_ENABLE_SENTRY=true npm run build
```

# Using Environment Variables

Your project can consume variables declared in your environment as if they were declared locally in your JS files.

These environment variables can be useful for:

- displaying information conditionally based on where the project is deployed
- consuming sensitive data that lives outside of version control.

The environment variables will be defined for you on `process.env`. For example, having an environment variable named `NG_APP_NOT_SECRET_CODE` will be exposed in your JS as `process.env.NG_APP_NOT_SECRET_CODE`.

**The environment variables are embedded during the build time**.

**⚠ Important**

> Do not store any secrets (such as private API keys) in your Angular app!
>
> Environment variables are embedded into the build, meaning anyone can view them by inspecting your app's files.

## `NG_APP_*` or Custom Prefix

You must create custom environment variables beginning with `NG_APP_` or using your custom prefix.

If you want to have a shorter prefix like `NG_` or if you want to access some domain specific variables directly, you can set the prefix in the `angular.json` configuration

```ts
  "architect": {
    "build": {
      "builder": "@ngx-env/builder:browser",
      "options": {
          ...
          "scripts": []
          "ngxEnv": {
            "prefix": "ORG_"
          }
      }
    }
  }
```

or using `ng config`

```sh
ng config projects.YOUR_APP_NAME.architect.build.options.ngxEnv.prefix 'ORG_'
```

Any other variables not starting with `NG_APP_` or your custom prefix will be ignored to avoid accidentally exposing a private key on the machine that could have the same name.

See how to [use system environment variables](#expanding-env).

**Changing any environment variables will require you to restart the development server if it is running.**

## `NG_APP_ENV`

There is also a built-in environment variable called `NG_APP_ENV`. You can read it from `process.env.NG_APP_ENV`.

By default `NG_APP_ENV` is set to `NODE_ENV` but you are free to override it.

Note that `NG_APP_ENV` remains available even if you define a custom prefix not matching `NG_APP`.

Having access to the `NG_APP_ENV` is also useful for performing actions conditionally:

```js
if (process.env.NG_APP_ENV !== "production") {
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
  public version = process.env.NG_APP_VERSION;
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
{{ 'process.env.NG_APP_ENV' | env }}
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

## In `.env`

`@ngx-env/builder` uses [dotenv](https://github.com/motdotla/dotenv) to support loading environment variables from `.env` files.

`.env` files are to be stored alongside the `package.json`.

`@ngx-env/builder` loads `.env` files with these specific names for the following `NG_APP_ENV` values, files on the bottom have less priority than files on the top.

| valid `.env` filenames     | `NG_APP_ENV=*` | `NG_APP_ENV=test` |
| -------------------------- | -------------- | ----------------- |
| `.env`                     | ✔️             | ✔️                |
| `.env.local`               | ✔️             | ✖️                |
| `.env.${NG_APP_ENV}`       | ✔️             | ✔️                |
| `.env.${NG_APP_ENV}.local` | ✔️             | ✔️                |


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

# Good Practices

**Declare your environment variables in the generated `.env.d.ts` file**

```ts
declare namespace NodeJS {
  export interface ProcessEnv {
    NG_APP_ENV: string;
    NG_APP_BASE_URL: string;
    NG_APP_VERSION: string;
  }
}
```

**Use `process.env` inside `environment.ts` files**

We recommend to consume environment variables in Angular environment files, for two reasons:

- To avoid using `process.env` in your business code.

  If one day you decide that a variable is no longer linked to the environment but rather to an Angular configuration, you would only have to modify the environment files.

- To be ready for the day when Angular would implement the consumption of environment variables directly in the CLI.

  If the syntax proposed by Angular CLI to access the environment variables turns out to be different, you would only have to modify the environment files.

Example:

`environment.ts`

```ts
export const environment = {
  production: false,
  baseUrl: process.env.NG_APP.BASE_URL,
  version: process.env.NG_APP_VERSION,
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

## Property comes from an index signature

If you prefer using process.env.NGX_SOME_VARIABLE instead of process.env['NGX_SOME_VARIABLE'], you can update the following line in your `tsconfig.json` file:

```diff
-"noPropertyAccessFromIndexSignature": true,
+"noPropertyAccessFromIndexSignature": false,
```

# Usage with Docker

@ngx-env/builder can be used with Docker to provide environment-specific configuration during the build and deployment of an Angular application.

The Dockerfile below will build an Angular application with the `NGX_VERSION` environment variable set to the value of the `NGX_VERSION` build argument.

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
RUN echo 'console.log("NGX_API_URL", process.env["NGX_API_URL"])' >>src/main.ts
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
# How It Works?

I wrote an article on [InDepth.dev](https://indepth.dev/tutorials/angular/inject-environment-variables) explaining how it works.

# Credits

- [create-react-app](https://github.com/facebook/create-react-app)
- [dotenv](https://github.com/motdotla/dotenv)

# License

MIT © [Chihab Otmani](https://twitter.com/chihabotmani)
