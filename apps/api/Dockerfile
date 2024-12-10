FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apk update && apk add --no-cache git bash
RUN pnpm add -g turbo@2.3.3

FROM base AS builder
WORKDIR /app
COPY . .
RUN turbo prune @knowledge-management/api --docker

FROM base AS installer
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/turbo.json ./turbo.json
RUN pnpm install --frozen-lockfile

FROM base AS sourcer
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build --filter=@knowledge-management/api

FROM base AS runner
WORKDIR /app
COPY --from=sourcer /app/ .

EXPOSE 3000

CMD ["node", "apps/api/dist/main.js"]