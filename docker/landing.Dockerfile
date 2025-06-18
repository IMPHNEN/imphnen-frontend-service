FROM node:22-alpine AS deps
WORKDIR /app
COPY  . .
RUN npm install
ENV NEXT_PRIVATE_STANDALONE=true
RUN npm run landing:build

RUN ls -lah /app/dist/apps/landing/.next

FROM node:22-alpine AS runner
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=deps --chown=nextjs:nodejs /app/dist/apps/landing/.next/standalone /app
COPY --from=deps --chown=nextjs:nodejs /app/dist/apps/landing/.next/static /app/.next/static
COPY --from=deps --chown=nextjs:nodejs /app/dist/apps/landing/public /app/public

RUN mkdir -p /app/.next/cache/images
RUN chown -R nextjs:nodejs /app/.next

USER nextjs:nodejs

EXPOSE 3000

CMD ["node", "/app/server.js"]