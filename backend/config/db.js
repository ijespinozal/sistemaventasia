const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config(); // lee backend/.env

let con = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'inventory_user',
  password: ''
});


// Test simple de conexión (puedes llamarlo en server.js al iniciar)
async function testConnection() {
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    });
}

module.exports = {
  testConnection
};
