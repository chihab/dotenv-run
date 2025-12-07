import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone/index.mjs';

setupZoneTestEnv();

import { env } from '@dotenv-run/core';
env({ root: '../../..', files: ['.env', '.env.app'] });

import '@angular/localize/init';
import { TextEncoder } from 'util';
Object.defineProperty(window, 'TextEncoder', {
  writable: true,
  value: TextEncoder,
});
