FROM node:16.18.1-alpine AS build

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install --frozen-lockfile

COPY ./vite.config.js ./
COPY ./public ./public/
COPY ./src ./src/

RUN yarn build

#################
# Запуск
FROM node:16.18.1-alpine AS deploy

WORKDIR /app

RUN yarn global add serve

COPY --from=build /app/dist ./dist

# Команда для запуска сервера внутри контейнера
CMD [ "serve", "-s", "dist" ]