FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --prefer-offline --no-audit --no-fund
COPY  . .
ENV NX_DAEMON=false
RUN npm run landing:build

FROM node:22-alpine AS runner
WORKDIR /app

COPY --from=builder /app/dist/apps/landing/.next/standalone .
COPY --from=builder /app/dist/apps/landing/public apps/landing/public
COPY --from=builder /app/dist/apps/landing/.next/static dist/apps/landing/.next/static

EXPOSE 3000

ENTRYPOINT ["node", "apps/landing/server.js"]