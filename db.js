const mysql = require('mysql2');

require('dotenv')
    .config()

function createDBConnection() {
    const db = mysql.createConnection({
        host: process.env.HOST_DATABASE || "localhost",
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        database: 'onDash'
    });

    return db;
}


// tempo de persistencia de inatividade de uma conexão
const connection_lifetime = 60 * 60 * 10 // 10 minutos

async function getDBConnection() {
    const db = mysql.createPool({
        host: process.env.HOST_DATABASE || "localhost",
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        database: 'onDash',
        waitForConnections: true,
        connectionLimit: 2,
        enableKeepAlive: true,
        keepAliveInitialDelay: connection_lifetime,
        queueLimit: 0
    });

    return await db.promise().getConnection();
}


module.exports = createDBConnection;