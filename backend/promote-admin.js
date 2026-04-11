require('dotenv').config();
const mysql = require('mysql2');
const fs = require('fs');

console.log('Connecting to Aiven MySQL...');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca: fs.readFileSync('./ca.pem')
  }
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Connection error:', err.message);
    return;
  }
  
  console.log('✅ Connected! Promoting user to admin...');
  
  const sql = "UPDATE users SET role = 'admin' WHERE email = 'ademadmin@test.com'";
  
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('❌ Error:', err.message);
    } else {
      console.log('✅ User promoted to admin successfully!');
      console.log('Email: ademadmin@test.com is now admin');
      
      connection.query("SELECT user_id, username, email, role FROM users WHERE email = 'ademadmin@test.com'", (err, rows) => {
        if (!err && rows.length > 0) {
          console.log('📋 Verification:', rows[0]);
        }
        connection.end();
      });
    }
  });
});
