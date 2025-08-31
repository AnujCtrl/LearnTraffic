FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yml ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

FROM node:24-alpine AS production

RUN apk add --no-cache dumb-init

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --prod

COPY --from=builder /app/dist ./dist

RUN chown -R nestjs:nodejs /app
USER nestjs

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]

CMD ["node", "dist/main"]