<h1>@dotenv-run/cli</h1>

A CLI tool to load command line and .env environment variables with monorepo support.

* ✅ Load environment variables from `.env` files
* ✅ Expand environment variables using dotenv-expand
* ✅ Load priorities of environment variables defined in `.env.*` files
* ✅ Define environment variables for a specific mode using `NODE_ENV` (e.g. `.env.production`)
* ✅ Supports hierarchical cascading configuration in monorepo projects ([Nx](https://nx.dev), [Turbo](https://turbo.build/), etc.)
  

# Quick Start

## Installation
```sh
npm add -D @dotenv-run/cli
```

## Prompt
```sh
$> dotenv-run -h

Usage: dotenv-run [options] -- <command>

Options:

    -h, --help   output usage information
    -p, --print  print the paths that will be loaded
    -r, --root   root directory to search for .env files

Examples:

    dotenv-run -- npm start
    dotenv-run -s -r . -- npm run build
```

## Usage

In addition to loading environment variables, **@dotenv-run/cli** supports monorepo projects with multiple applications.

In a monorepo configuration, `.env.*` files can be defined in the root workspace and overriden by each application.

**Root workspace**

`dotenv-run` will search and load `.env.*` files located in the root workspace down to the current working directory. 

If no root workspace is found, `dotenv-run` will load environment files within the current working directory.

You can specify a root workspace with the `-r` option.

**Example**

```sh
/platform
 apps
    frontend1
       .env.local # API_USERS=http://localhost:3001/users
       src/
    frontend2
       src/
.env.dev # API_BASE=https://dotenv-run.dev
.env.prod # API_BASE=https://dotenv-run.app
.env # API_USERS=$API_BASE/api/v1/users API_AUTH=https://$API_BASE/auth
package.json
```

```sh
$> cd /platform
$> NODE_ENV=prod dotenv-run -- bash -c 'echo "✨ $API_USERS"'
✔ /platform/.env.prod
✔ /platform/.env
✨ https://dotenv-run.app/api/v1/users
```

```sh
$> cd /platform/apps/frontend1
$> NODE_ENV=dev dotenv-run -- bash -c 'printf "✨ API_USERS $API_USERS\n✨ API_AUTH $API_AUTH"'
✔ /platform/apps/frontend1/.env.local
✔ /platform/.env.dev
✔ /platform/.env
✨ API_USERS http://localhost:3001/users
✨ API_AUTH https://dotenv-run.dev/api/v1/auth
```

```sh
$> cd /platform/apps/frontend2
$> API_BASE=$CI_CONTAINER_API dotenv-run -- bash -c 'echo "✨ $API_USERS"'
✔ /platform/.env
✨ https://XAE221D1DE-ci-provider.cloud/api/v1/users

# CI_CONTAINER_API could be an environment variable provided by some CI provider 
```

**-r option**

```sh
$> cd /platform/apps/frontend1
$> dotenv-run -r . -- bash -c 'echo "✨ $API_USERS"'
✔ /platform/apps/frontend1/.env.local
✨ http://localhost:3001/users
```


Paths to the root workspace can be relative or absolute, the following are all valid :
* ` -r ../..`
* ` -r ../...env`
* ` -r /platform`
* ` -r /platform/.env`


## Loading Priorities

`@dotenv-run/cli` uses [dotenv](https://github.com/motdotla/dotenv) to support loading environment variables from `.env` files.

`@dotenv-run/cli` loads `.env` files with these specific names for the following `NODE_ENV` values, files on the top have less priority than files on the bottom.

An env file for a specific mode (e.g. .env.production) will take higher priority than a generic one (e.g. .env).

| valid `.env` filenames     | `NODE_ENV=*`   | `NODE_ENV=test` |
| -------------------------- | -------------- | --------------- |
| `.env`                     | ✔️              | ✔️               |
| `.env.local`               | ✔️              | ✖️               |
| `.env.${NODE_ENV}`         | ✔️              | ✔️               |
| `.env.${NODE_ENV}.local`   | ✔️              | ✔️               |

In addition, environment variables that already exist when the CLI is executed have the highest priority and will not be overwritten by .env files. For example, when running `SOME_KEY=123 dotenv-run`.

## Expanding `.env`

You can expand variables already available on your machine for use in your `.env`

For example:

```shell
VERSION=$npm_package_version
HOSTNAME=$HOSTNAME
```

Or expand variables local to the current `.env` file:

```shell
DOMAIN=www.example.com
FOO=$DOMAIN/foo
BAR=$DOMAIN/bar
```


## Command Line

Defining environment variables can vary between OSes. It’s also important to know that this manner is temporary for the life of the shell session.

### Windows (cmd.exe)

```cmd
set "API_URL=abcdef" && dotenv-run -- npm start
```

(Note: Quotes around the variable assignment are required to avoid a trailing whitespace.)

### Windows (Powershell)

```Powershell
($env:API_URL = "abcdef") -and (dotenv-run -- npm start)
```

### Linux, macOS (Bash)

```sh
API_URL=abcdef dotenv-run -- npm start
```

# In the browser

In order to consume environment variables in your webapps, you need to expose them to the browser. The bundler you use will need to support replacing the environment variables at build time.

**React, Vue.js...**

Use [Vite](https://vitejs.dev/guide/env-and-mode.html)

**Angular**

Use [@ngx-env/builder](https://www.npmjs.com/package/@ngx-env/builder)

# License

MIT © [Chihab Otmani](https://twitter.com/chihabotmani)


