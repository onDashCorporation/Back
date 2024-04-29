# imagem base 
FROM node:21-alpine

WORKDIR /backend

# copia as dependecias do projeto
COPY package*.json .


# instala os pacotes necessários
RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["npm","start"]