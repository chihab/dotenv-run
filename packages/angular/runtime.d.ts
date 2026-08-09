// Type declaration for the side-effect only runtime entry (`runtime.mjs`).
// It populates `globalThis._NGX_ENV_` with `process.env` at runtime and has no
// exports; this empty module declaration lets consumers
// `import "@ngx-env/builder/runtime";` without a module-resolution error.
export {};
