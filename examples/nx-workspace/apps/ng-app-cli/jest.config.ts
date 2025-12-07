import type { Config } from 'jest';
import { default as preset } from 'jest-preset-angular/presets/index.js';

const basePreset: Config = preset.createEsmPreset();

const jestConfig = {
  ...basePreset,
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: ['<rootDir>/src/app/**/*.(spec|jest).ts'],
  cache: false,
  moduleNameMapper: {
    ...basePreset.moduleNameMapper,
    '^rxjs(/operators$)?$':
      '<rootDir>/node_modules/rxjs/dist/bundles/rxjs.umd.js',
    tslib: '<rootDir>/node_modules/tslib/tslib.es6.mjs',
  },
  transform: {
    '^.+\\.(ts)$': [
      '@dotenv-run/jest-angular',
      {
        useESM: true,
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
    ...basePreset.transform,
  },
};

export default jestConfig;
