FROM node:12.16.1-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install

RUN npm install -g pm2

COPY . .

CMD ["pm2-runtime", "pm2.config.js"]