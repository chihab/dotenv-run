#!/usr/bin/env bash
#
# Smoke-test the packed @ngx-env/builder tarball against a freshly generated
# Angular application.
#
# This exercises the *real* install graph (peer-dep resolution, a single
# deduped webpack/Angular instance) the way a downstream consumer would get it
# from the registry -- something the in-repo examples cannot verify because
# they resolve the builder through the pnpm workspace. Using `pnpm pack`
# (not `npm pack`) is required so the `workspace:^` protocol on the builder's
# internal dependencies is rewritten to concrete, registry-resolvable ranges.
#
# The generated app is created in a throwaway temp dir OUTSIDE the workspace so
# it does not inherit the monorepo's node_modules or pnpm-workspace globs.
#
# Usage: tools/smoke-pack.sh
# Assumes packages have already been built (`pnpm build`).
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PKG_DIR="$REPO_ROOT/packages/angular"
NG_CLI_VERSION="22"
SENTINEL="ngx-env-smoke-$$"

echo "==> Packing @ngx-env/builder (rewrites workspace:^ -> concrete versions)"
PACK_DIR="$(mktemp -d)"
( cd "$PKG_DIR" && pnpm pack --pack-destination "$PACK_DIR" >/dev/null )
TARBALL="$(ls "$PACK_DIR"/*.tgz | head -n1)"
echo "    tarball: $TARBALL"

WORK_DIR="$(mktemp -d)"
cleanup() { rm -rf "$PACK_DIR" "$WORK_DIR"; }
trap cleanup EXIT

echo "==> Generating a fresh Angular $NG_CLI_VERSION app outside the workspace"
(
  cd "$WORK_DIR"
  CI=true npx --yes "@angular/cli@$NG_CLI_VERSION" new smoke-app \
    --style=css --ssr=false --defaults --skip-git --package-manager=npm
)

APP_DIR="$WORK_DIR/smoke-app"
cd "$APP_DIR"

echo "==> Installing the packed builder into the fresh app"
npm install "$TARBALL"

echo "==> Wiring up the builder (ng add)"
CI=true npx ng add @ngx-env/builder --skip-confirmation

echo "==> Declaring an env var and referencing it via import.meta.env"
printf 'NG_APP_SMOKE=%s\n' "$SENTINEL" > .env
node -e "const fs=require('fs');fs.appendFileSync('src/main.ts', \"\nconsole.log('NGX_ENV_SMOKE:', import.meta.env['NG_APP_SMOKE']);\n\");"

echo "==> Production build (the real single-webpack/single-Angular test)"
npx ng build --configuration production

echo "==> Asserting the env value was injected into the emitted bundle"
if grep -rq "$SENTINEL" dist/; then
  echo "PASS: '$SENTINEL' found in the built bundle -- env injection works end-to-end"
else
  echo "FAIL: '$SENTINEL' not found in dist/ -- env var was not injected" >&2
  exit 1
fi
