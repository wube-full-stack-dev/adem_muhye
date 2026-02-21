const { query } = require("../conf/db.cofig");

// Get all users (excluding passwords)
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

// Update user role
async function updateUserRole(userId, newRole) {
  try
  {
    // Inside updateUserRole function, update this line:
    const allowedRoles = ["admin", "manager", "staff"]; // ✅ Add 'manager'
    // First check if user exists
    // ✅ Validate role first
    if (!allowedRoles.includes(newRole)) {
      return {
        success: false,
        message: "Invalid role",
      };
    }
    const checkSql = `SELECT user_id FROM users WHERE user_id = ?`;
    const existing = await query(checkSql, [userId]);

    if (existing.length === 0) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // Update the role
    const sql = `UPDATE users SET role = ? WHERE user_id = ?`;
    const result = await query(sql, [newRole, userId]);

    if (result && result.affectedRows > 0) {
      return {
        success: true,
        message: "Role updated successfully",
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

module.exports = {
  getAllUsers,
  updateUserRole,
};
