FROM node:25.2.0-alpine AS base
WORKDIR /app


FROM base AS pruner
RUN npm add -g turbo@latest
COPY . .
RUN turbo prune email --docker


FROM base AS builder
RUN npm install -g pnpm
COPY --from=pruner /app/out/full/ .
RUN pnpm install
RUN pnpm run build


FROM base AS production
RUN npm install -g pnpm
COPY --from=pruner /app/out/full/ .
RUN pnpm install --production

FROM base AS runner
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

COPY --from=builder --chown=nestjs:nodejs /app/apps/email/dist ./apps/email/dist
COPY --from=production --chown=nestjs:nodejs /app/apps/email/node_modules ./apps/email/node_modules
COPY --from=production --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=production --chown=nestjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nestjs:nodejs /app/packages ./packages
USER nestjs

ENV NODE_ENV=production

CMD ["node", "apps/email/dist/main.js"]