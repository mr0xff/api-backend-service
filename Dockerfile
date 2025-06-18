FROM node:22 
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn test
RUN yarn build:ts
CMD yarn start 
EXPOSE 3000