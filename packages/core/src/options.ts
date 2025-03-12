import type { DotenvConfigOptions } from "dotenv";
import { Dict } from "./build";

export type Prefix = string | RegExp;

export interface DotenvRunOptions {
  cwd?: string; // Path to current working directory
  dotenv?: DotenvConfigOptions;
  environment?: string; // Environment to load
  files?: string[]; // Environment files to load
  prefix?: Prefix | Prefix[]; // Filter keys to inject
  unsecure?: boolean; // Display environment variables in debug output
  root?: string; // Path to root workspace
  nodeEnv?: boolean; // Node environment
  verbose?: boolean; // Print verbose output
  builtIn?: Dict; // Built-in environment variables
  runtime?: boolean; // Whether to use runtime variables
  define?: string; // Define key to replace in code
  global?: string; // Global variable name
}
