# imagem base 
FROM node:21-alpine

WORKDIR /backend

ENV PORT=5000
ENV JWT_KEY = 'Iy5poqD9MhZIIzvyH65f9c6ce10ce9'
ENV DB_EMAIL = 'ondashseguranca@gmail.com'

ENV HOST_DATABASE="container-acai-database"
ENV DATABASE="onDash"

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm","start"]