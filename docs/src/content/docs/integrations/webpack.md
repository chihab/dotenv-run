---
title: Webpack
---

## install

```console
npm add @dotenv-run/webpack --save-dev
```

## usage

Create a `webpack.config.js` [configuration file](https://www.webpackjs.org/guide/en/#configuration-files) and import the plugin:

```js
import { DotenvRunPlugin } from '@dotenv-run/webpack';
import path from 'path';

const __dirname = path.resolve();

export default {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new DotenvRunPlugin(
      { prefix: 'API', verbose: true, root: '../../..' },
      __dirname
    )
  ]
}
```

The list of options is the same as the ones supported by `@dotenv-run/core`. Please refer to the [API](#api) section for more details.