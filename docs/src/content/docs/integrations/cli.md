---
title: CLI
---

`@dotenv-run/cli` is a standalone CLI that can be used to run a script with environment variables defined in a `.env` file.


## install

```sh
npm install -D @dotenv-run/cli
```

## usage

```sh
$> dotenv-run -h

Usage: dotenv-run [options] -- <command>

Options:

    -h, --help     output usage information
    -e, --env      environment name (e.g. dev, prod)
    -s, --silent   do not print .env file paths
    -r, --root     root directory to search for .env files

Examples:

    dotenv-run -- npm start
    dotenv-run -r ../.. -- npm start
    dotenv-run -e prod -- npm start
```

## .env file
Create a `.env` file with the following content:

```sh
# .env
API_HOST=api-sandbox.com
API_INSTANCE=$USER-instance
API_BASE=https://$API_INSTANCE.$API_HOST/
```

## npx dotenv-run

Run `dotenv-run` using npx:

```sh
npx dotenv-run -- printenv
✔ /home/chihab/sample/.env
...
API_HOST=api-sandbox.com
API_INSTANCE=c.otmani-instance
API_BASE=https://c.otmani-instance.api-sandbox.com/
```


## command line

Override the value of `API_INSTANCE` from the command line:

```sh
API_INSTANCE=prod-instance npx dotenv-run -- printenv
✔ /home/chihab/sample/.env
...
API_HOST=api-sandbox.com
API_INSTANCE=prod-instance
API_BASE=https://prod-instance.api-sandbox.com/
```

## multiple .env files

Override the value of `API_INSTANCE` and `API_HOST` from the `.env.prod` file:

```sh
# .env.prod
API_HOST=api.com
API_INSTANCE=prod-instance
```

```sh
NODE_ENV=prod npx dotenv-run -- printenv
✔ /home/chihab/sample/.env.prod
✔ /home/chihab/sample/.env
...
API_HOST=api.com
API_INSTANCE=prod-instance
API_BASE=https://prod-instance.api.com/
```

## process.env

Environment variables are available in `process.env`:

```sh
NODE_ENV=prod npx dotenv-run -- node -e "console.log(process.env.API_BASE)"
✔ /home/chihab/sample/.env.prod
✔ /home/chihab/sample/.env
https://prod-instance.api.com/
```

The list of options is the same as the ones supported by `@dotenv-run/core`. Please refer to the [API](#api) section for more details.


