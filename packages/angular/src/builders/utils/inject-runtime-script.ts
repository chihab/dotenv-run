const BASE_TAG = /<base\s[^>]*>/i;

/**
 * Injects the runtime `ngx-env.js` script.
 *
 * When the document has a `<base href>`, the script is placed right after it
 * with a relative src, so it resolves against the base href. This covers apps
 * served under a sub-path (`--base-href /app/`), per-locale output
 * (`browser/<locale>/ngx-env.js`), and base hrefs that are only set at deploy
 * time. Without a base tag, the root-absolute `/ngx-env.js` is kept.
 */
export function injectRuntimeScript(html: string): string {
  return BASE_TAG.test(html)
    ? html.replace(BASE_TAG, (base) => `${base}<script src="ngx-env.js"></script>`)
    : html.replace(/<head>/, `<head><script src="/ngx-env.js"></script>`);
}
