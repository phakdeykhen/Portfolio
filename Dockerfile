FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
# Only what Vite needs: the repo also holds old dist zips and screenshots.
COPY index.html vite.config.js ./
COPY src ./src
COPY public ./public
RUN npm run build

FROM nginx:stable-alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
# .htaccess is for the old Apache hosting; nginx ignores it, so do not serve it.
RUN rm -f /usr/share/nginx/html/.htaccess
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD wget -qO- http://127.0.0.1/healthz >/dev/null || exit 1
