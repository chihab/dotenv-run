import { NgJestTransformer } from "jest-preset-angular/build/ng-jest-transformer.js";
export default {
  createTransformer: (tsJestConfig) => {
    const ngT = new NgJestTransformer(tsJestConfig);
    return {
      process: (src, filename, config, options) => {
        if (/.ts$/.test(filename)) {
          src = `
                import.meta.env = process.env;
                ${src}
            `;
        }
        return ngT.process(src, filename, config, options);
      },
    };
  },
};
