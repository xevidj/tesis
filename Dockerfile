FROM node:latest

ARG PORT

WORKDIR /root/src

COPY package*.json ./

RUN npm install --only=prod

COPY ./dist ./

COPY ./public ./public

EXPOSE $PORT

CMD [ "node", "server.js" ]