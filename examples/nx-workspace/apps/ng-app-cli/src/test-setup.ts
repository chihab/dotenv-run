import 'jest-preset-angular/setup-jest.mjs';

// import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone/index.mjs';
// setupZoneTestEnv();

import { env } from '@dotenv-run/core';
env({ root: '../../..', files: ['.env', '.env.app'] });
