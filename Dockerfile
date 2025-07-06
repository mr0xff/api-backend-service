FROM node:22-alpine
WORKDIR /app
COPY . .
RUN yarn install
# RUN yarn test
RUN yarn build:ts
#RUN npx prisma generate --schema=./src/db/schema.prisma
#RUN npx prisma db push --schema=./src/db/schema.prisma

EXPOSE 3000

CMD yarn start 
