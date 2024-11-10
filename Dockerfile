# Use the node image from official Docker Hub
FROM node:lts-alpine

RUN mkdir -p /usr/src/app/node_modules && chown -R node:node /usr/src/app

WORKDIR /usr/src/app

RUN npm install -g http-server

COPY package*.json .

USER node

RUN npm install

COPY . .

COPY --chown=node:node . .

RUN npm run build

EXPOSE 8080

CMD [ "http-server", "dist" ]