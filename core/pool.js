const util = require('util');
const mysql = require('mysql');
/**
 * Conection to the database
 */
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost:3306',
    user: 'root',
    password: 'root1234',
    database: 'nodelogin'
});

pool.getConnection((err, connection) => {
    if (err)
        console.error("Something went wrong to the database...");

    if (connection)
        connection.release();
});

pool.query = util.promisify(pool.query);

module.exports = pool;