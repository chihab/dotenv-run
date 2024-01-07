---
title: Rollup
---

## install


```console
npm add @dotenv-run/rollup --save-dev
```

## usage

Create a `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) and import the plugin:

```js
import env from '@dotenv-run/rollup';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
  },
  plugins: [
    env({ prefix: 'API', verbose: true, root: '../../..' })
  ]
};
```

Then call `rollup` either via the [CLI](https://www.rollupjs.org/guide/en/#command-line-reference) or the [API](https://www.rollupjs.org/guide/en/#javascript-api).


The list of options is the same as the ones supported by `@dotenv-run/core`. Please refer to the [API](#api) section for more details.