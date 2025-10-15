FROM node:22-alpine

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build:ts

EXPOSE 3000

CMD yarn start 
