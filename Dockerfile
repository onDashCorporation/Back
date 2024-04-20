# imagem base 
FROM node:21-alpine

WORKDIR /backend

ENV PORT=5000

ENV HOST_DATABASE="container-acai-database"
ENV DATABASE="onDash"

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm","start"]