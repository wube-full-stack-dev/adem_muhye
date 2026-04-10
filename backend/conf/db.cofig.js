const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca: fs.readFileSync(path.join(__dirname, "../ca.pem")),
  },
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
};

const pool = mysql.createPool(dbConfig);

async function query(sql, params) {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

module.exports = { query };
