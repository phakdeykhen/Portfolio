# servicelogi.com deployment

The site runs as one nginx container at `/opt/portfolio` on the shared VM
`35.187.239.210`, behind the Caddy edge proxy in `/opt/vm-edge`.

| Domain | Container | Loopback port |
|---|---|---|
| `https://servicelogi.com` | `portfolio-web-1` | `127.0.0.1:8086` |
| `https://www.servicelogi.com` | 301 redirect to the apex | — |

Pipeline (`.gitlab-ci.yml`, runner tag `hrms-vm`):
`lint` → `build_image` → `smoke_test` → `deploy_vm` (manual, on `main`).

## One-time setup

1. **GitLab project.** Create `phakdeyken2/portfolio` and push this repo:
   ```bash
   git remote add gitlab git@gitlab.com:phakdeyken2/portfolio.git
   git push gitlab main
   ```
   Then **Settings → CI/CD → Runners**: enable the existing VM runner (tag `hrms-vm`) for this
   project, and disable instance runners.

2. **VM stack.**
   ```bash
   ssh -i ~/.ssh/servicelogi_key servicelogi@35.187.239.210
   sudo install -d -o servicelogi -g gitlab-runner -m 2770 /opt/portfolio
   # from your Mac:
   scp -i ~/.ssh/servicelogi_key deploy/{docker-compose.yml,deploy.sh,.env.example} servicelogi@35.187.239.210:/opt/portfolio/
   # on the VM:
   cd /opt/portfolio && cp .env.example .env && chmod 660 .env && chmod 750 deploy.sh
   ```
   The container is started by the first CI deploy.

3. **Caddy.** Add `portfolio.Caddyfile` to `/opt/vm-edge/Caddyfile` through the existing inode,
   then validate and reload:
   ```bash
   cd /opt/vm-edge
   cp Caddyfile Caddyfile.bak-$(date -u +%Y%m%dT%H%M%SZ)
   cat Caddyfile /tmp/portfolio.Caddyfile > /tmp/Caddyfile.new && cat /tmp/Caddyfile.new > Caddyfile
   docker compose exec caddy caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
   docker compose exec caddy caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile
   ```
   DNS for `servicelogi.com` and `www` already points to the VM.

## Deploy and rollback

Run `deploy_vm` from the pipeline. By hand: `/opt/portfolio/deploy.sh <full-sha>`.
Every deploy is logged in `/opt/portfolio/.deploy-history`; to roll back, rerun
`deploy.sh` with the previous SHA from that file.
