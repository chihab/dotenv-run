---
title: Expanding Variables
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