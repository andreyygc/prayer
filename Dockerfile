FROM node:18-slim

WORKDIR /app/build

COPY . .
RUN npm install

RUN npx tsc
RUN cp -r ./dist ../
RUN cp -r ./node_modules ../
WORKDIR /app
RUN rm -rf ./build

ENTRYPOINT node dist/prayer.js