import { Dict } from "@dotenv-run/core";
import { escapeStringRegexp } from "./escape-string-regexp";

export const replaceHtmlVars = (content: string, raw: Dict) => {
  return Object.keys(raw).reduce(
    (html, key) =>
      html.replace(
        new RegExp("%" + escapeStringRegexp(key) + "%", "g"),
        raw[key]
      ),
    content
  );
};
