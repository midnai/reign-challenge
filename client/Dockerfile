FROM node:16 AS reignchallenge

WORKDIR /reign/src/client

COPY package*.json ./

RUN yarn install
RUN yarn global add @angular/cli@14.0.5

COPY . .

RUN yarn build

EXPOSE 4200