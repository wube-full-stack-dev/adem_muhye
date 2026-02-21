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
-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL, 
  full_name VARCHAR(100),
  role ENUM('admin','manager', 'staff') DEFAULT 'staff',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

UPDATE users 
SET role = 'admin' 
WHERE email = 'ademadmin@gmail.com';