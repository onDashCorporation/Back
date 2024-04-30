const mysql = require('mysql2');

require('dotenv')
.config()

function createDBConnection() {
    const db = mysql.createConnection({
        host: "localhost",
        //process.env.HOST_DATABASE || 
        user: 'root',
        //process.env.MYSQL_USER || 
        password: '',
        //process.env.MYSQL_PASSWORD || 
        database: 'onDash'
        //process.env.MYSQL_DATABASE || 
    });
    
    return db;
}


 
module.exports = createDBConnection;