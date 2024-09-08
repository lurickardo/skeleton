FROM node:22 AS build

WORKDIR /app

COPY . .

RUN npm install typescript -g

RUN npm run pipe

FROM node:22-alpine

WORKDIR /app

COPY --from=build /app/dist /app

CMD ["node", "src/main.js"]