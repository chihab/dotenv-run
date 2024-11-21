const jestConfig = {
  preset: 'jest-preset-angular/presets/defaults-esm',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  cache: false,
  testMatch: ['<rootDir>/src/app/**/*.(spec|jest).ts'],
  moduleNameMapper: {
    '^rxjs(/operators$)?$':
      '<rootDir>/../../node_modules/rxjs/dist/bundles/rxjs.umd.js',
    tslib: '<rootDir>/../../node_modules/tslib/tslib.es6.mjs',
  },
  transform: {
    '^.+\\.(ts)$': [
      '@dotenv-run/jest-angular',
      {
        useESM: true,
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
};

export default jestConfig;
