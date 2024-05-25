const mysql = require('mysql2')
require('dotenv').config();

module.exports = () => {
    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'amigo_do_pet'
    });
    console.log('Funcionou')
    return conn
}