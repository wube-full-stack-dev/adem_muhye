require("dotenv").config();
const mysql = require("mysql2");
const fs = require("fs");

console.log("Connecting to Aiven MySQL on Render...");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca: fs.readFileSync("./ca.pem"),
  },
});

const hashedPassword =
  "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW";

const sql = `
INSERT INTO users (username, email, password, full_name, role) 
SELECT * FROM (SELECT 'admin' as username, 'admin@ademcoca.com' as email, '${hashedPassword}' as password, 'Admin User' as full_name, 'admin' as role) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@ademcoca.com');
`;

connection.connect((err) => {
  if (err) {
    console.error("❌ Connection error:", err.message);
    process.exit(1);
  }

  console.log("✅ Connected to Aiven MySQL!");
  console.log("📦 Creating admin user...");

  connection.query(sql, (err, result) => {
    if (err) {
      console.error("❌ Error:", err.message);
    } else {
      console.log("✅ Admin user created successfully!");
      console.log("📋 Login credentials:");
      console.log("   Email: admin@ademcoca.com");
      console.log("   Password: admin123");
    }
    connection.end();
  });
});
