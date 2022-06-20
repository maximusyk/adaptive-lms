FROM node:16.15.1-alpine

RUN apk add --no-cache curl \
    && curl -sL https://unpkg.com/@pnpm/self-installer | node

WORKDIR /usr/src/app

COPY package.json ./

COPY pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build