import { DotenvRunPlugin } from '@dotenv-run/webpack';
import type { Configuration } from 'webpack';

export default (config: Configuration) => {
  config.plugins?.push(
    new DotenvRunPlugin({
      root: "../..",
      cwd: process.cwd(),
      prefix: /^API|NGX/,
      verbose: true,
      files: ['.env.app'],
      nodeEnv: false,
    })
  );
  return config;
};
