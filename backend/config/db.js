// backend/config/db.js
const mysql = require('mysql');
const util = require('util');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'inventorydb',
  multipleStatements: false
});

// Verifica que el pool se crea sin errores
pool.getConnection((err, conn) => {
  if (err) {
    console.error('❌ Error creando el pool MySQL:', err.code || err.message);
    return;
  }
  conn.release();
});

const query = util.promisify(pool.query).bind(pool);

async function testConnection() {
  const rows = await query('SELECT 1 AS ok');
  console.log('✅ MySQL OK:', rows[0].ok === 1);
}

module.exports = { pool, query, testConnection };