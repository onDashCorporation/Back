FROM mysql:8.3.0

# configura que não é necessário o uso da senha para acessar o root
ENV MYSQL_ALLOW_EMPTY_PASSWORD=true

# copia o script para a pasta de inicialização de banco de dados do container
COPY ./database/signup.sql /docker-entrypoint-initdb.d/

# expoe a porta padrão do mysql
EXPOSE 3306

# preserva os dados em /data da maquina que está executando
VOLUME [ "/data/" ]
