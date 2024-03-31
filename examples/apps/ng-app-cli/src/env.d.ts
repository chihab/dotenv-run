// Define the type of the environment variables.
declare interface Env {
  readonly NODE_ENV: string;
  // Replace the following with your own environment variables.
  // Example: NGX_VERSION: string;
  NGX_BRANCH: string;
  NGX_VERSION: string;
  [key: string]: any;
}

declare interface ImportMeta {
  readonly env: Env;
}
