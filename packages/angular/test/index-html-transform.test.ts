import { describe, expect, it } from "vitest";
import { indexHtmlTransformer } from "../src/builders/utils/index-html-transform";

const raw = { NG_APP_API: "https://api.example.com" };

describe("indexHtmlTransformer with runtime", () => {
  it("injects a relative script right after <base href> so it resolves under the base", () => {
    const html = `<html><head><meta charset="utf-8"><base href="/app/"><title>App</title></head></html>`;

    expect(indexHtmlTransformer(html, raw, false, true)).toBe(
      `<html><head><meta charset="utf-8"><base href="/app/"><script src="ngx-env.js"></script><title>App</title></head></html>`
    );
  });

  it("handles a self-closing base tag", () => {
    const html = `<head><base href="/fr/" /></head>`;

    expect(indexHtmlTransformer(html, raw, false, true)).toBe(
      `<head><base href="/fr/" /><script src="ngx-env.js"></script></head>`
    );
  });

  it("keeps the root-absolute script when there is no base tag", () => {
    const html = `<html><head><title>App</title></head></html>`;

    expect(indexHtmlTransformer(html, raw, false, true)).toBe(
      `<html><head><script src="/ngx-env.js"></script><title>App</title></head></html>`
    );
  });

  it("keeps the root-absolute script when the base tag has no href", () => {
    const html = `<html><head><base target="_blank"><title>App</title></head></html>`;

    expect(indexHtmlTransformer(html, raw, false, true)).toBe(
      `<html><head><script src="/ngx-env.js"></script><base target="_blank"><title>App</title></head></html>`
    );
  });

  it("inlines the variables on the dev server", () => {
    const html = `<head><base href="/"></head>`;

    expect(indexHtmlTransformer(html, raw, true, true)).toBe(
      `<head><script>globalThis._NGX_ENV_ = {"NG_APP_API":"https://api.example.com"}</script><base href="/"></head>`
    );
  });
});

describe("indexHtmlTransformer without runtime", () => {
  it("only replaces %VARIABLES%", () => {
    const html = `<head><base href="/"></head><body>%NG_APP_API%</body>`;

    expect(indexHtmlTransformer(html, raw, false, false)).toBe(
      `<head><base href="/"></head><body>https://api.example.com</body>`
    );
  });
});
