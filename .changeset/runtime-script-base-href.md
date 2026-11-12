---
"@ngx-env/builder": minor
---

Runtime mode now injects `ngx-env.js` right after `<base href>` with a relative src, so it resolves against the base href.

Before, the tag was always the root-absolute `/ngx-env.js` at the start of `<head>`, which failed for apps served under a sub-path (`--base-href /app/`) and for localized builds. Documents without a `<base href>` keep the root-absolute `/ngx-env.js`.

Localized builds (`localize: true` or a list of locales) now write `ngx-env.js` next to every locale's `index.html`, plus the root one if there is one.

**This changes the URL the browser requests.** If you overwrite `ngx-env.js` at deploy time, or rewrite the script tag in `index.html`, check your scripts: with a base href, the file is now loaded from `<base href>ngx-env.js` instead of `/ngx-env.js`, and localized builds have one file per locale.
