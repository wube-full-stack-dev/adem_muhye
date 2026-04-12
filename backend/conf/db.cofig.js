const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

// Check multiple possible locations for ca.pem
let caPath = null;
const possiblePaths = [
  "./ca.pem",
  "/etc/secrets/ca.pem", // Render secret files location
  path.join(__dirname, "../isrgrootx1.pem"),
];

for (const p of possiblePaths) {
  if (fs.existsSync(p)) {
    caPath = p;
    break;
  }
}

const sslConfig = caPath ? { ssl: { ca: fs.readFileSync(caPath) } } : {};

const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
  ...sslConfig,
};

console.log("📦 Database config:", {
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  database: dbConfig.database,
  ssl: !!sslConfig.ssl,
});

const pool = mysql.createPool(dbConfig);

async function query(sql, params) {
  try {
    const [rows] = await pool.promise().execute(sql, params);
    return rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

module.exports = { query };
