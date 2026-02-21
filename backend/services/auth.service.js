const { query } = require("../conf/db.cofig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Make sure this is imported!

async function registerUser(userData) {
  try {
    const { username, email, password, full_name } = userData;

    // Check if user already exists
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

// ✅ FIXED: Login user - GENERATE AND RETURN JWT TOKEN!
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

    // 🚀 GENERATE JWT TOKEN WITH USER DATA
    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET, // Use env variable with fallback
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    console.log("✅ Token generated for user:", user.email);

    // Return user data (without password) AND token
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
      token: token, // ← THIS WAS MISSING!
    };
  } catch (err) {
    console.log("Error in loginUser:", err);
    return { success: false, message: "Server error" };
  }
}

// Get all users (admin only)
async function getAllUsers() {
  try {
    const sql = `SELECT user_id, username, email, full_name, role, created_at 
                 FROM users ORDER BY created_at DESC`;
    const users = await query(sql);
    return users;
  } catch (err) {
    console.log("Error in getAllUsers:", err);
    return [];
  }
}

// Update user role (admin only)
async function updateUserRole(userId, newRole) {
  try {
    if (!["admin", "staff"].includes(newRole)) {
      return { success: false, message: "Invalid role" };
    }

    const sql = `UPDATE users SET role = ? WHERE user_id = ?`;
    const result = await query(sql, [newRole, userId]);

    if (result && result.affectedRows > 0) {
      return { success: true, message: "Role updated successfully" };
    }
    return { success: false, message: "User not found" };
  } catch (err) {
    console.log("Error in updateUserRole:", err);
    return { success: false, message: "Server error" };
  }
}

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  updateUserRole,
};
