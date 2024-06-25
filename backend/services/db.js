const mysql = require('mysql');
const conn = mysql.createConnection({
 host: "db4free.net",
 user: "ecabral",
 password: "12345678",
 database: "ecabral",
});

conn.connect();


module.exports = conn;