const { query } = require("../conf/db.cofig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * AUTH SERVICE - Only handles login/register
 * Single Responsibility: User Authentication
 */

// Register new user
async function registerUser(userData) {
  try {
    const { username, email, password, full_name } = userData;

    // Check if user exists
    const checkSql = `SELECT * FROM users WHERE email = ? OR username = ?`;
    const existing = await query(checkSql, [email, username]);

    if (existing.length > 0) {
      return {
        success: false,
        message: "User with this email or username already exists",
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user (default role = 'staff')
    const sql = `INSERT INTO users (username, email, password, full_name, role) 
                 VALUES (?, ?, ?, ?, 'staff')`;

    const result = await query(sql, [
      username,
      email,
      hashedPassword,
      full_name || null,
    ]);

    if (result && result.insertId) {
      return {
        success: true,
        message: "User registered successfully",
        user_id: result.insertId,
      };
    }

    return { success: false, message: "Registration failed" };
  } catch (err) {
    console.log("Error in registerUser:", err);
    return { success: false, message: "Server error" };
  }
}

// Login user - Generate JWT
async function loginUser(credentials) {
  try {
    const { email, password } = credentials;

    const sql = `SELECT * FROM users WHERE email = ?`;
    const users = await query(sql, [email]);

    if (users.length === 0) {
      return { success: false, message: "Invalid email or password" };
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return { success: false, message: "Invalid email or password" };
    }

    // Generate JWT
    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
    );

    // Return user data without password
    const userData = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
      created_at: user.created_at,
    };

    return {
      success: true,
      message: "Login successful",
      user: userData,
      token: token,
    };
  } catch (err) {
    console.log("Error in loginUser:", err);
    return { success: false, message: "Server error" };
  }
}

// Get user by ID (helper for other services)
async function getUserById(userId) {
  try {
    const sql = `SELECT user_id, username, email, full_name, role, created_at 
                 FROM users WHERE user_id = ?`;
    const users = await query(sql, [userId]);
    return users[0] || null;
  } catch (err) {
    console.log("Error in getUserById:", err);
    return null;
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUserById, // Only expose what's needed
};
