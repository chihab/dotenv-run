import 'jest-preset-angular/setup-jest.mjs';
import { env } from '@dotenv-run/core';
env({ root: '../../..', files: ['.env', '.env.app'] });
