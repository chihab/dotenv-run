interface ImportMeta {
  env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly NG_APP_ENV: string;
  readonly API_USERS: string;
  readonly NGX_VERSION: string;
}
