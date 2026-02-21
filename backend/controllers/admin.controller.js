const { getAllUsers, updateUserRole } = require("../services/auth.service");

// Get all users (admin only)
async function getUsers(req, res) {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (err) {
    console.error("Error in getUsers:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}

// Update user role (admin only)
async function changeUserRole(req, res) {
  try {
     const { userId } = req.params;
     const { role } = req.body;

     // ✅ FIXED: Include 'manager'
     const allowedRoles = ["admin", "manager", "staff"];

     if (!role || !allowedRoles.includes(role)) {
       return res.status(400).json({
         success: false,
         message: `Invalid role. Must be one of: ${allowedRoles.join(", ")}`,
       });
    }
    
    if (parseInt(userId) === req.user.user_id) {
      return res.status(400).json({
        success: false,
        message: "Cannot change your own role",
      });
    }

    const result = await updateUserRole(userId, role);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (err) {
    console.error("Error in changeUserRole:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}

module.exports = {
  getUsers,
  changeUserRole
};