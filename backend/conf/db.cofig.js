const mysql = require("mysql2/promise");

// Create a clean config object with ONLY valid MySQL options
const dbConfig = {
  host: process.env.DB_HOST ,
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_NAME,
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
  waitForConnections: true,
  queueLimit: 0,
};

// Create connection pool with clean config
const pool = mysql.createPool(dbConfig);

// Prepare a function that will execute the SQL queries asynchronously
async function query(sql, params) {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows;
    
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

// Export the query function for use in the application
module.exports = { query };
