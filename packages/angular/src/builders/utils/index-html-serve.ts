import type { Dict } from "@dotenv-run/core";
import { variablesReducer } from "./variables-reducer";

export function indexHtml(content: string, raw: Dict, runtime = false) {
  const html = variablesReducer(content, raw);
  return runtime
    ? html.replace(
        /<head>/,
        `<head><script>globalThis._NGX_ENV_ = ${JSON.stringify(raw)}</script>`
      )
    : html;
}
