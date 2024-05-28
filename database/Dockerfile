FROM mysql:8.3.0

# copia o script para a pasta de inicialização de banco de dados do container
COPY ./signup.sql /docker-entrypoint-initdb.d/

# ENV MYSQL_PASSWORD="lzmkamxlkndsj"
# ENV MYSQL_USER="admin_qualquer"
# ENV MYSQL_DATABASE="onDash"
# ENV MYSQL_ROOT_PASSWORD="szxwnfcerbvjgnjktynhtjrnwei"

# expoe a porta padrão do mysql
EXPOSE 3306

# preserva os dados em /data da maquina que está executando
VOLUME [ "/data/" ]
