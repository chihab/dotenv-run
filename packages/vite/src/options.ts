import type { DotenvRunOptions } from "@dotenv-run/core";
import { pick } from "lodash-es";

/**
 * Options for configuring the @dotenv-run/vite plugin.
 * 
 * @interface ViteDotenvRunOptions
 * @extends {Pick<DotenvRunOptions, 'verbose' | 'unsecure' | 'builtIn' | 'global' | 'nodeEnv' | 'runtime' | 'dotenv' | 'files'>}
 * 
 * @property {DotenvConfigOptions} [dotenv] - Options for configuring dotenv.
 * @property {string[]} [files] - Environment files to load. Defaults to `['.env.vault', '.env']`.
 * @property {boolean} [unsecure] - Display environment variables in debug output.
 * @property {boolean} [nodeEnv] -  Node environment.
 * @property {boolean} [verbose] - Print verbose output.
 * @property {Dict} [builtIn] - Built-in environment variables.
 * @property {boolean} [runtime] - Whether to use runtime variables.
 * @property {string} [global] - Global variable name.
 */
export type ViteDotenvRunOptions = Pick<DotenvRunOptions, 'verbose' | 'unsecure' | 'builtIn' | 'global' | 'nodeEnv' | 'runtime' | 'dotenv' | 'files'>;

export const sanitizeOptions = <T extends ViteDotenvRunOptions>(options?: T): ViteDotenvRunOptions | undefined => {
    return pick(options, 'verbose', 'unsecure', 'builtIn', 'global', 'nodeEnv', 'runtime', 'dotenv', 'files');
}