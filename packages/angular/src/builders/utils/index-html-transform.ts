import type { Dict } from "@dotenv-run/core";
import { replaceHtmlVars } from "./replace-html-vars";

export function indexHtmlTransformer(
  content: string,
  raw: Dict,
  devServer: boolean,
  runtime = false
) {
  const html = replaceHtmlVars(content, raw);
  return runtime
    ? html.replace(
        /<head>/,
        devServer
          ? `<head><script>globalThis._NGX_ENV_ = ${JSON.stringify(
              raw
            )}</script>`
          : `<head><script src="ngx-env.js"></script>`
      )
    : html;
}
