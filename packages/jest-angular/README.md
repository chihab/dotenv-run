## Install

The package requires `jest-preset-angular@14` to be installed as a peer dependency.

```sh
npm install --save-dev @dotenv-run/jest-angular
```

## Usage

Add the following to your `jest.config.js`, more information can be found in the [jest-preset-angular](https://thymikee.github.io/jest-preset-angular/docs/guides/esm-support/).

ESM support is required for Jest to understand `import.meta.env` notation.

```js
const jestConfig = {
  // Required for ESM support
  preset: "jest-preset-angular/presets/defaults-esm",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testMatch: ["<rootDir>/src/app/**/*.(spec|jest).ts"],
  moduleNameMapper: {
    "^rxjs(/operators$)?$":
      "<rootDir>/node_modules/rxjs/dist/bundles/rxjs.umd.js",
    tslib: "<rootDir>/node_modules/tslib/tslib.es6.mjs",
  },

  // @dotenv-run/jest-angular transformer
  transform: {
    "^.+\\.(ts)$": [
      "@dotenv-run/jest-angular",
      {
        useESM: true,
      },
    ],
  },
};

export default jestConfig;
```

Add the following to your `setup-jest.ts` file.

```ts
// Required for ESM support
import "jest-preset-angular/setup-jest.mjs";

// Load environment variables for Jest
import { env } from "@dotenv-run/core";
env({ root: "../../..", files: [".env", ".env.app"] });
```

Run your tests with `jest`. More information can be found in the [Jest documentation](https://jestjs.io/docs/ecmascript-modules).

```sh
NODE_OPTIONS=--experimental-vm-modules npx jest
```
