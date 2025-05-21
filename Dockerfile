FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./ yarn.lock ./

RUN npm install

RUN npm i -g @nestjs/cli

COPY . .

EXPOSE 7000

CMD [ "npm","run", "start:dev" ]

