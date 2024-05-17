const mysql = require('mysql2');

require('dotenv')
    .config()

function createDBConnection() {
    const db = mysql.createConnection({
        host: process.env.HOST_DATABASE || "localhost",
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        database: 'onDash',
        port: 3306,
    });

    return db;
}



module.exports = createDBConnection;