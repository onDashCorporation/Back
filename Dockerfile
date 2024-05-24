# imagem base especifica 
FROM node:21-alpine@sha256:d44678a321331f2f003b51303cc5105f9787637e0524cf94d4323d08050a99c9

# roda o node em execução
ENV NODE_ENV production

# cria uma pasta backend para guaradar os arquivos
WORKDIR /backend

# copia as dependecias do projeto
COPY package*.json .

# instala os pacotes necessários
RUN npm ci --only=production

# copia os arquivos para o usuario node
COPY --chown=node:node . .

# usa um usuario padrão "node" que contem menos privilegios 
USER node

CMD ["npm","run","deploy"]