export interface NgxEnvOptions {
  prefix?: string;
  root?: string;
  verbose?: boolean;
  unsecure?: boolean;
  files?: string[];
}
export interface NgxEnvSchema {
  ngxEnv?: NgxEnvOptions;
}
