export default {
  createTransformer: () => {
    return {
      process: (src, filename) => {
        if (/.ts$/.test(filename)) {
          src = `
                import.meta.env = process.env;
                ${src}
            `;
        }
        return { code: src };
      },
    };
  },
};
