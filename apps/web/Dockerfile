FROM node:25.2.0-alpine AS base
WORKDIR /app
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_SERVER_API_URL

RUN echo "API_URL during build: $NEXT_PUBLIC_SERVER_API_URL"
RUN echo "NEXT_PUBLIC_API_URL during build: $NEXT_PUBLIC_API_URL"

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_SERVER_API_URL=$NEXT_PUBLIC_SERVER_API_URL

FROM base AS prepare
RUN npm install -g turbo
COPY . .
RUN turbo prune web --docker


FROM base AS builder
RUN npm install -g pnpm
COPY --from=prepare /app/out/json/ .
RUN pnpm install
COPY --from=prepare /app/out/full/ .
RUN pnpm turbo build


FROM base AS runner
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

CMD node apps/web/server.js