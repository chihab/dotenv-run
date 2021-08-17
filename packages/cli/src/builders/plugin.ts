import { config } from 'dotenv';
import * as dotenv_expand from 'dotenv-expand';
import { Configuration } from 'webpack';
import * as webpack from 'webpack';

const env = config();
dotenv_expand(env);
function getClientEnvironment(prefix: RegExp) {
  return Object.keys(process.env)
    .filter((key) => prefix.test(key))
    .reduce((env, key) => {
      const value = env[key] || process.env[key];
      if (value !== undefined) env[key] = JSON.stringify(value);
      return env;
    }, {});
}

export function plugin(options?: any) {
  return {
    webpackConfiguration: async (webpackConfig: Configuration) => {
      const env = getClientEnvironment(/^NG_APP_/i);
      webpackConfig.plugins.push(
        new webpack.DefinePlugin({ 'process.env': env })
      );
      return webpackConfig;
    },
    indexHtml: async (content: string) => {
      return content.replace('%NG_APP_WEBSITE_NAME%', 'Hello World');
    },
  };
}
