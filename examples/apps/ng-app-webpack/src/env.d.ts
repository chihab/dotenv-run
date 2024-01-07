interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  /**
   * Built-in environment variable.
   * @see Docs https://github.com/chihab/dotenv-run/packages/angular#ng_app_env.
   */
  readonly NG_APP_ENV: string;
  readonly API_USERS: string;
  // Add your environment variables below
  // readonly NG_APP_API_URL: string;
  [key: string]: any;
}

declare var process: {
  env: {
    NG_APP_ENV: string;
    [key: string]: any;
  };
};
