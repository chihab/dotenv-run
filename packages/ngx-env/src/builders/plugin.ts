import { config } from 'dotenv';
import { Configuration } from 'webpack';
import * as webpack from 'webpack';

const dotenv = config().parsed;
function getClientEnvironment(prefix: RegExp) {
  return Object.keys(process.env)
    .concat(Object.keys(dotenv))
    .filter((key) => prefix.test(key))
    .reduce((env, key) => {
      const value = dotenv[key] || process.env[key];
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
      return Promise.resolve(webpackConfig);
    },
    indexHtml: (content: string) => {
      // Inject variables in Window
      console.log(content);
      return Promise.resolve(content);
    },
  };
}
