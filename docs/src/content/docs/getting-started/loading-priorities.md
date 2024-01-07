---
title: Loading Priorities
---

`@dotenv-run/cli` uses [dotenv](https://github.com/motdotla/dotenv) to support loading environment variables from `.env` files.

`@dotenv-run/cli` loads `.env` files with these specific names for the following `-e ENV` value, files on the top have less priority than files on the bottom.

An env file for a specific mode (e.g. .env.production) will take higher priority than a generic one (e.g. .env).

| valid `.env` filenames     | `ENV=*`   | `ENV=test` |
| -------------------------- | -------------- | --------------- |
| `.env`                     | ✔️              | ✔️               |
| `.env.local`               | ✔️              | ✖️               |
| `.env.${ENV}`         | ✔️              | ✔️               |
| `.env.${ENV}.local`   | ✔️              | ✔️               |

In addition, environment variables that already exist when the CLI is executed have the highest priority and will not be overwritten by .env files. For example, when running `SOME_KEY=123 dotenv-run`.


