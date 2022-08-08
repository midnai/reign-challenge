FROM node:16 AS reignchallenge

WORKDIR /reign/src/server

COPY package*.json ./

RUN yarn install
# RUN yarn build

EXPOSE 3000