export * from "./env.js";
export * from "./options.js";
export * from "./root.js";
export * from "./build.js";

declare global {
  interface ImportMeta {
    env: ImportMetaEnv;
  }

  interface ImportMetaEnv {
    [key: string]: any;
  }
}
