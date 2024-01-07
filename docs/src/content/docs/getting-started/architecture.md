---
title: Architecture
---

@dotenv-run/cli                        
 |- @dotenv-run/core
    * Locate .env files and creates a `dotenv` object
    * Expands variables in .env files
    * Filter variables by prefix

@dotenv-run/webpack
* Webpack plugin that injects environment variables into the build
 |- @dotenv-run/core

@angular-builders/custom-webpack
 |- @dotenv-run/webpack

@ngx-env/builder
 |- @dotenv-run/webpack

@ngx-env/esbuilder 
 |- @dotenv-run/esbuilder