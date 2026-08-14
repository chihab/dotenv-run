---
title: Expanding Variables
description: Reference environment variables inside other variables (API_URL=$API_BASE/users) with dotenv-run variable expansion.
---


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