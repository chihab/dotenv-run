export const environment = {
  production: true,
  env: {
    NGX_VERSION: import.meta.env['NGX_VERSION'],
    API_USERS: import.meta.env['API_USERS'],
  },
};
