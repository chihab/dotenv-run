import { DotenvRunPlugin } from '@dotenv-run/webpack';
import type { Configuration } from 'webpack';

export default (config: Configuration) => {
  config.plugins?.push(new DotenvRunPlugin({ prefix: 'NGX', verbose: true }));
  return config;
};
