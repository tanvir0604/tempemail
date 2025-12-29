FROM node:25.2.0-alpine AS base
WORKDIR /app


FROM base AS pruner
RUN npm add -g turbo@latest
COPY . .
RUN turbo prune blog --docker


FROM base AS builder
RUN npm install -g pnpm
COPY --from=pruner /app/out/full/ .
RUN pnpm install
RUN pnpm dlx prisma generate --schema=./apps/blog/prisma/schema.prisma
RUN pnpm run build


FROM base AS production
RUN npm install -g pnpm
COPY --from=pruner /app/out/full/ .
RUN pnpm install --production

FROM base AS runner
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

COPY --from=builder --chown=nestjs:nodejs /app/apps/blog/dist ./apps/blog/dist
COPY --from=production --chown=nestjs:nodejs /app/apps/blog/node_modules ./apps/blog/node_modules
COPY --from=production --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=production --chown=nestjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nestjs:nodejs /app/packages ./packages
USER nestjs

ENV NODE_ENV=production

CMD ["node", "apps/blog/dist/main.js"]