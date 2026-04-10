const mysql = require("mysql2");
const fs = require("fs");
require("dotenv").config();

console.log("Connecting to Aiven MySQL...");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca: fs.readFileSync("./ca.pem"),
  },
  multipleStatements: true, // ← This allows multiple SQL statements
});

const createTables = `
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  role ENUM('admin', 'manager', 'staff') DEFAULT 'staff',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create sale table
CREATE TABLE IF NOT EXISTS sale (
  sale_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  category VARCHAR(50) NOT NULL,
  product VARCHAR(50) NOT NULL,
  quantity_crate INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert admin user (if not exists)
INSERT INTO users (username, email, password, full_name, role) 
SELECT * FROM (SELECT 'admin' as username, 'admin@ademcoca.com' as email, '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW' as password, 'Admin User' as full_name, 'admin' as role) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@ademcoca.com');
`;

connection.connect((err) => {
  if (err) {
    console.error("❌ Connection error:", err.message);
    return;
  }

  console.log("✅ Connected to Aiven MySQL!");
  console.log("📦 Creating tables...");

  connection.query(createTables, (err, results) => {
    if (err) {
      console.error("❌ Query error:", err.message);
    } else {
      console.log("✅ Tables created successfully!");
      console.log(
        "📋 Admin user created (email: admin@ademcoca.com, password: admin123)",
      );
    }
    connection.end();
  });
});
