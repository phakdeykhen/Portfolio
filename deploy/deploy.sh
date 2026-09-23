#!/usr/bin/env bash
# ServiceLogi website — deploy a CI-built image tag.
#
#   /opt/portfolio/deploy.sh <full-commit-sha>
#
# Pins the tag in .env, restarts, waits for healthy, and rolls back to the
# previous tag if it does not come up. Called by the GitLab runner; safe by hand.
set -euo pipefail
cd "$(dirname "$0")"

TAG="${1:?usage: deploy.sh <full-commit-sha>}"
[[ "$TAG" =~ ^[a-f0-9]{40}$ ]] || { echo 'Expected a full commit SHA' >&2; exit 2; }
[ -f .env ] || { echo '.env missing — copy .env.example' >&2; exit 1; }

exec 9>.deploy.lock
flock -w 300 9

CURRENT="$(sed -n 's/^WEB_IMAGE=//p' .env)"
REPO="${PORTFOLIO_IMAGE_REPO:-registry.gitlab.com/phakdeyken2/portfolio}"
NEXT="$REPO:$TAG"

# Pull before touching .env so a registry failure leaves the site as it was.
docker pull "$NEXT"

# Rewrite through the existing inode so owner/group/mode survive (see HRMS deploy.sh).
pin() {
  local tmp
  tmp="$(mktemp)"
  sed "s|^WEB_IMAGE=.*|WEB_IMAGE=$1|" .env > "$tmp"
  cat "$tmp" > .env
  rm -f "$tmp"
}

pin "$NEXT"
if docker compose up -d --no-deps --wait --wait-timeout 120 web \
   && curl -fsS --max-time 10 http://127.0.0.1:8086/healthz >/dev/null; then
  printf '%s\t%s\t%s\tOK\n' "$(date -u +%FT%TZ)" "$CURRENT" "$NEXT" >> .deploy-history
else
  echo "!!! web failed to become healthy — restoring $CURRENT" >&2
  pin "$CURRENT"
  docker compose up -d --no-deps --wait --wait-timeout 120 web || true
  printf '%s\t%s\t%s\tFAILED-ROLLED-BACK\n' "$(date -u +%FT%TZ)" "$CURRENT" "$NEXT" >> .deploy-history
  exit 1
fi

# The boot disk is small; drop dangling layers. Running images are never removed.
docker image prune -f >/dev/null 2>&1 || true
echo "==> deployed $NEXT"
