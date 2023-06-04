/**
 * @deprecated process.env usage
 * prefer using meta.env
 * */
declare var process: {
  env: {
    NG_APP_ENV: string;
    [key: string]: any;
  };
};
