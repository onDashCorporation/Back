const mysql = require('mysql2');

require('dotenv')
.config()

function createDBConnection() {
    const db = mysql.createConnection({
        host: process.env.HOST_DATABASE || "localhost",
        user: 'root',
        password: '',
        database: process.env.DATABASE || 'signup'
    });
    
    return db;
}


 
module.exports = createDBConnection;