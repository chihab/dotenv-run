import type { DotenvConfigOptions } from "dotenv";
import { Dict } from "./build";

export interface DotenvRunOptions {
  cwd?: string; // Path to current working directory
  dotenv?: DotenvConfigOptions;
  environment?: string; // Environment to load
  files?: string[]; // Environment files to load
  prefix?: string | RegExp; // Filter keys to inject
  unsecure?: boolean; // Display environment variables in debug output
  root?: string; // Path to root workspace
  nodeEnv?: boolean; // Node environment
  verbose?: boolean; // Print verbose output
  builtIn?: Dict; // Built-in environment variables
}
