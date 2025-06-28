import { env as loadEnv } from "@dotenv-run/core";
import { Plugin } from "vite";
import { viteEnvPrefixToPrefix } from "./mapper.js";
import { sanitizeOptions, ViteDotenvRunOptions } from "./options.js";
import replace from "@rollup/plugin-replace";
import { DEFAULT_ENV_FILES } from "./constants.js";

/**
 * Vite plugin to load environment variables from .env files using `@dotenv-run/core`.
 *
 * This plugin seamlessly integrates with Vite by automatically deriving the root,
 * prefix and environment options from Vite's `envDir`, `envPrefix` and `mode`,
 * ensuring a more cohesive experience.
 *
 * @param {ViteDotenvRunOptions} [options] - Options for configuring the plugin.
 *                                           See {@link ViteDotenvRunOptions} for more details.
 *
 * @returns {Plugin} Vite plugin object that enhances the Vite configuration.
 *
 * @example
 * // Usage in a Vite config file
 * import dotenvRun from 'vite-plugin-dotenv-run';
 *
 * export default {
 *      envDir: '../..',
 *      envPrefix: ['VITE_', 'CUSTOM_'],
 *      plugins: [
 *          dotenvRun(),
 *       ],
 * };
 */
const dotenvRun = (options?: ViteDotenvRunOptions): Plugin => {
  options = sanitizeOptions(options);
  const files = options?.files ?? DEFAULT_ENV_FILES;

  return {
    name: "vite-plugin-dotenv-run",
    config: (config, configEnv) => {
      const prefix = viteEnvPrefixToPrefix(config.envPrefix);

      const { full } = loadEnv({
        files,
        prefix,
        root: config.envDir as string,
        environment: configEnv.mode,
        ...options,
      });

      return {
        ...config,
        ...replace({
          preventAssignment: true,
          values: full,
        }),
      };
    },
  };
};

export { dotenvRun, ViteDotenvRunOptions };
export default dotenvRun;
