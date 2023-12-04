FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN pnpm add --global turbo
COPY . .
RUN turbo prune --scope=@knowledge-management/api --docker

FROM base as install
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
COPY --from=build /app/out/json .
COPY --from=build /app/out/pnpm-lock.yaml .
RUN pnpm i --frozen-lockfile
COPY --from=build /app/out/full .
COPY turbo.json .
RUN pnpm turbo build --filter=api...

FROM base as run
WORKDIR /app
COPY --from=install /app .
EXPOSE 3000

CMD ["pnpm", "run", "dev", "--filter=api..."]