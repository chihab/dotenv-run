# @ngx-env/cli

<img src="./logo.png" alt="dotenv" width="100px" align="right" />

[![npm version](https://badge.fury.io/js/%40ngx-env%2Fcli.svg)](https://www.npmjs.com/package/@ngx-env/cli)

**Add environment variables to your Angular apps**

# Quick start

1. Fork and clone the project

```sh
ng add @ngx-env/cli
```

2. Define Environment Variables

```sh
NG_APP_ENABLE_ANALYTICS=false
NG_APP_VERSION=$npm_package_version
```

3. Run CLI commands

```sh
npm start
NG_APP_BRANCH_NAME=`git branch --show-current` npm run build
```

4. Usage in TypeScript

```ts
@Component({
  selector: "app-footer",
})
export class FooterComponent {
  public version = process.env.NG_APP_VERSION;
  public branch = process.env.NG_APP_BRANCH_NAME;
}
```

# Table of contents

# Comsuming Environment Variables

Your project can consume variables declared in your environment as if they were declared locally in your JS files.

These environment variables can be useful for displaying information conditionally based on where the project is deployed or consuming sensitive data that lives outside of version control.

By default you will have `NODE_ENV` defined for you, and any other environment variables starting with `NG_APP_`.

> Do not store any secrets (such as private API keys) in your Angular app!
>
> Environment variables are embedded into the build, meaning anyone can view them by inspecting your app's files.

## NG_APP

**The environment variables are embedded during the build time**.

Since Angular CLI produces a static HTML/CSS/JS bundle, it can’t possibly read them at runtime. To read them at runtime, you would need to load HTML into memory on the server and replace placeholders in runtime.

You must create custom environment variables beginning with `NG_APP_`.
Any other variables except `NODE_ENV` will be ignored to avoid accidentally exposing a private key on the machine that could have the same name.

**Changing any environment variables will require you to restart the development server if it is running.**

These environment variables will be defined for you on `process.env`. For example, having an environment variable named `NG_APP_NOT_SECRET_CODE` will be exposed in your JS as `process.env.NG_APP_NOT_SECRET_CODE`.

## NODE_ENV

There is also a built-in environment variable called `NODE_ENV`. You can read it from `process.env.NODE_ENV`.

When you run `npm start`, it is always equal to `'development'`, when you run `npm test` it is always equal to `'test'`, and when you run `npm run build` to make a production bundle, it is always equal to `'production'`.

**You cannot override `NODE_ENV` manually.** This prevents developers from accidentally deploying a slow development build to production.

Having access to the `NODE_ENV` is also useful for performing actions conditionally:

```js
if (process.env.NODE_ENV !== "production") {
  analytics.disable();
}
```

When you compile the app with `npm run build`, the minification step will strip out this condition, and the resulting bundle will be smaller.

## Usage In Templates

You have two options to consume an environment variable in your component's template.

1. From your component class

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

2. Using the `env` pipe

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
{{ 'process.env.NODE_ENV' | env }}
{{ 'NODE_ENV' | env }}
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

To define permanent environment variables, create a file called `.env` in the root of your project:

```shell
NG_APP_NOT_SECRET_CODE=abcdef
```

> Note: You need to restart the development server after changing `.env` files.

`.env` files **should be** checked into source control (with the exclusion of `.env*.local`).

### What other `.env` files can be used?

- `.env`: Default.
- `.env.local`: Local overrides. **This file is loaded for all environments except test.**
- `.env.development`, `.env.test`, `.env.production`: Environment-specific settings.
- `.env.development.local`, `.env.test.local`, `.env.production.local`: Local overrides of environment-specific settings.

Files on the left have more priority than files on the right:

- `npm start`: `.env.development.local`, `.env.local`, `.env.development`, `.env`
- `npm run build`: `.env.production.local`, `.env.local`, `.env.production`, `.env`
- `npm test`: `.env.test.local`, `.env.test`, `.env` (note `.env.local` is missing)

These variables will act as the defaults if the machine does not explicitly set them.

Please refer to the [dotenv documentation](https://github.com/motdotla/dotenv) for more details.

> Note: If you are defining environment variables for development, your CI and/or hosting platform will most likely need
> these defined as well. Consult their documentation how to do this. For example, see the documentation for [Travis CI](https://docs.travis-ci.com/user/environment-variables/) or [Heroku](https://devcenter.heroku.com/articles/config-vars).

### Expanding Environment Variables In `.env`

Expand variables already on your machine for use in your `.env` file (using [dotenv-expand](https://github.com/motdotla/dotenv-expand)).

For example, to get the environment variable `npm_package_version`:

```shell
NG_APP_VERSION=$npm_package_version
# also works:
# NG_APP_VERSION=${npm_package_version}
```

Or expand variables local to the current `.env` file:

```shell
DOMAIN=www.example.com
NG_APP_FOO=$DOMAIN/foo
NG_APP_BAR=$DOMAIN/bar
```

# Credits

- Inspired by [create-react-app](https://github.com/facebook/create-react-app)
- [dotenv](https://github.com/motdotla/dotenv)
