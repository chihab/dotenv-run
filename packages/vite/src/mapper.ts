import {
  castArray,
  escapeRegExp,
  first,
  isEmpty,
  isNil,
  negate,
} from "lodash-es";
import { DEFAULT_PREFIX } from "./constants.js";

/**
 * Converts a Vite `envPrefix` configuration value into a usable prefix or RegExp for @dotenv-run/core.
 *
 * @param {string | string[] | undefined} prefixes - The prefix or list of prefixes to filter environment variables.
 * @returns {string | RegExp} - A single prefix as a string if only one is provided, or a RegExp if multiple prefixes are given.
 *
 * @throws {Error} If an empty string (`''`) is included in the prefixes, as this could expose all environment variables.
 *
 * @example
 * viteEnvPrefixToPrefix("VITE_") // Returns: "VITE_"
 * viteEnvPrefixToPrefix(["VITE_", "CUSTOM_"]) // Returns: /^VITE_|CUSTOM_/
 * viteEnvPrefixToPrefix(undefined) // Returns: DEFAULT_PREFIX
 *
 * @see {@link https://vite.dev/config/shared-options.html#envprefix Vite Documentation on envPrefix}
 *
 * @security
 * The `envPrefix` option should **never** be set to an empty string (`''`),
 * as this will expose **all** environment variables, potentially leaking sensitive information.
 * Vite has a built-in safeguard that throws an error when detecting `''` as a prefix.
 *
 * If you need to expose an unprefixed environment variable, use the `define` option instead:
 *
 * ```
 * define: {
 *   "process.env.MY_VAR": JSON.stringify(process.env.MY_VAR)
 * }
 * ```
 */
export const viteEnvPrefixToPrefix = (
  prefixes: string | string[] | undefined
): string | RegExp => {
  prefixes = castArray(prefixes).filter(negate(isNil));

  if (isEmpty(prefixes)) {
    return DEFAULT_PREFIX;
  }

  if (prefixes.includes("")) {
    throw new Error(
      `envPrefix option contains value '', which could lead unexpected exposure of sensitive information.`
    );
  }

  if (prefixes.length === 1) {
    return first(prefixes);
  }

  return new RegExp(`^(${prefixes.map(escapeRegExp).join("|")})`);
};
