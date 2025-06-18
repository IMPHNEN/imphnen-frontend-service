FROM node:22-alpine as deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN npm install --legacy-peer-deps
RUN npm install sharp

FROM node:22-alpine as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run landing:build

FROM node:22-alpine as runner
WORKDIR /app
RUN apk add --no-cache libc6-compat

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/landing/.next/standalone /app
COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/landing/.next/static /app/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/landing/public /app/public

RUN mkdir -p /app/.next/cache/images
RUN chown -R nextjs:nodejs /app/.next

USER nextjs:nodejs

ARG port=3000
ENV PORT $port
EXPOSE $port

CMD ["node", "/app/server.js"]