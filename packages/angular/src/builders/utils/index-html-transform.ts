import type { Dict } from "@dotenv-run/core";
import { injectRuntimeScript } from "./inject-runtime-script";
import { replaceHtmlVars } from "./replace-html-vars";

export function indexHtmlTransformer(
  content: string,
  raw: Dict,
  devServer: boolean,
  runtime = false
) {
  const html = replaceHtmlVars(content, raw);
  if (!runtime) {
    return html;
  }
  return devServer
    ? html.replace(
        /<head>/,
        `<head><script>globalThis._NGX_ENV_ = ${JSON.stringify(raw)}</script>`
      )
    : injectRuntimeScript(html);
}
