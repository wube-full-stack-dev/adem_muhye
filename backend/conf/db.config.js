const mysql = require("mysql2");
const fs = require("fs");

// Load SSL certificate if it exists
let sslConfig = {};
try {
  if (fs.existsSync('./ca.pem')) {
    sslConfig = { ssl: { ca: fs.readFileSync('./ca.pem') } };
    console.log('✅ SSL Certificate loaded from file');
  } else if (process.env.SSL_CA) {
    sslConfig = { ssl: { ca: process.env.SSL_CA } };
    console.log('✅ SSL Certificate loaded from env');
  }
} catch (err) {
  console.warn('⚠️ SSL Certificate not found:', err.message);
}

const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
  ...sslConfig
};

console.log('📦 Database config:', {
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  database: dbConfig.database,
  ssl: !!dbConfig.ssl
});

const pool = mysql.createPool(dbConfig);

// ✅ FIXED: Proper async/await query function
async function query(sql, params) {
  try {
    const [rows, fields] = await pool.promise().execute(sql, params);
    return rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

module.exports = { query };
