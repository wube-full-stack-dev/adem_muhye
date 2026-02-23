const { query } = require("../conf/db.cofig");

/**
 * ADMIN SERVICE - Only handles user management
 * Single Responsibility: Admin Operations
 */

// Allowed roles constant (single source of truth)
const ALLOWED_ROLES = ["admin", "manager", "staff"];

// Get all users (admin only)
async function getAllUsers() {
  try {
    const sql = `
      SELECT 
        user_id, 
        username, 
        email, 
        full_name, 
        role, 
        created_at 
      FROM users 
      ORDER BY created_at DESC
    `;

    const users = await query(sql);
    return users;
  } catch (err) {
    console.log("Error in getAllUsers:", err);
    throw err;
  }
}

// Get single user by ID (admin only)
async function getUserById(userId) {
  try {
    const sql = `
      SELECT 
        user_id, 
        username, 
        email, 
        full_name, 
        role, 
        created_at 
      FROM users 
      WHERE user_id = ?
    `;

    const users = await query(sql, [userId]);
    return users[0] || null;
  } catch (err) {
    console.log("Error in getUserById:", err);
    throw err;
  }
}

// Update user role (admin only)
async function updateUserRole(userId, newRole) {
  try {
    // Validate role
    if (!ALLOWED_ROLES.includes(newRole)) {
      return {
        success: false,
        message: `Invalid role. Must be one of: ${ALLOWED_ROLES.join(", ")}`,
      };
    }

    // Check if user exists
    const checkSql = `SELECT user_id, role FROM users WHERE user_id = ?`;
    const existing = await query(checkSql, [userId]);

    if (existing.length === 0) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // Don't update if same role
    if (existing[0].role === newRole) {
      return {
        success: false,
        message: `User already has ${newRole} role`,
      };
    }

    // Update the role
    const sql = `UPDATE users SET role = ? WHERE user_id = ?`;
    const result = await query(sql, [newRole, userId]);

    if (result && result.affectedRows > 0) {
      return {
        success: true,
        message: `Role updated to ${newRole} successfully`,
      };
    }

    return {
      success: false,
      message: "Failed to update role",
    };
  } catch (err) {
    console.log("Error in updateUserRole:", err);
    throw err;
  }
}

// Delete user (admin only) - Optional
async function deleteUser(userId) {
  try {
    // Prevent deleting yourself (check in controller)
    const sql = `DELETE FROM users WHERE user_id = ?`;
    const result = await query(sql, [userId]);

    if (result && result.affectedRows > 0) {
      return {
        success: true,
        message: "User deleted successfully",
      };
    }
    return {
      success: false,
      message: "User not found",
    };
  } catch (err) {
    console.log("Error in deleteUser:", err);
    throw err;
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser, // Optional
  ALLOWED_ROLES, // Export for controllers to use
};
