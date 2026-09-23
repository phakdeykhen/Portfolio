#!/bin/sh
# Smoke-check a running website container: ./scripts/smoke-image.sh <container>
set -eu
C="${1:?usage: smoke-image.sh <container>}"

for i in $(seq 1 30); do
  docker exec "$C" wget -qO- http://127.0.0.1/healthz >/dev/null 2>&1 && break
  [ "$i" = 30 ] && { echo "FAIL: nginx never came up"; docker logs "$C"; exit 1; }
  sleep 1
done

echo "--- home page is the ServiceLogi build ---"
docker exec "$C" sh -c 'wget -qO- http://127.0.0.1/ | grep -q "https://servicelogi.com/"' \
  || { echo "FAIL: index.html missing canonical servicelogi.com"; exit 1; }

echo "--- bundle and public assets are served ---"
docker exec "$C" sh -c 'ls /usr/share/nginx/html/assets/*.js >/dev/null' \
  || { echo "FAIL: no JS bundle in /assets"; exit 1; }
docker exec "$C" wget -qO /dev/null http://127.0.0.1/og-image.png \
  || { echo "FAIL: og-image.png not served"; exit 1; }

echo "--- unknown paths fall back to index.html ---"
docker exec "$C" sh -c 'wget -qO /tmp/root http://127.0.0.1/ && wget -qO /tmp/deep http://127.0.0.1/some/deep/path && cmp /tmp/root /tmp/deep' \
  || { echo "FAIL: SPA fallback broken"; exit 1; }

echo "--- index.html must not be cacheable ---"
docker exec "$C" wget -S -O /dev/null http://127.0.0.1/index.html 2>&1 | grep -qi 'Cache-Control: no-store' \
  || { echo "FAIL: index.html missing Cache-Control: no-store"; exit 1; }

echo "smoke OK"
