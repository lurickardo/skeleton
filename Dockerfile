FROM node:22 AS build

RUN curl -fsSL https://bun.sh/install | bash -s "bun-v1.1.26"

ENV PATH="/root/.bun/bin:${PATH}"

WORKDIR /app

COPY . .

RUN npm run pipe

FROM node:22-alpine

WORKDIR /app

COPY --from=build /app/dist /app

CMD ["node", "src/main.js"]