---
"@ngx-env/builder": patch
---

Runtime mode now injects `ngx-env.js` right after `<base href>` with a relative src, so it resolves against the base href.

Before, the tag was always the root-absolute `/ngx-env.js` at the start of `<head>`, which failed for apps served under a sub-path (`--base-href /app/`) and for localized builds, where the file is written to `browser/<locale>/ngx-env.js`. Documents without a base tag keep the root-absolute `/ngx-env.js`.
