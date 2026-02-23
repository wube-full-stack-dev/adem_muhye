const { getAllUsers, updateUserRole } = require("../services/admin.service");
//                                    ↑ Make sure this is spelled correctly!

// Get all users
async function getUsers(req, res) {
  try {
    const users = await getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    console.error("Error in getUsers:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

// Update user role
async function changeUserRole(req, res) {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    
    console.log("📦 Updating user:", userId, "to role:", role);
    
    // ✅ Make sure updateUserRole is a function
    const result = await updateUserRole(userId, role);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (err) {
    console.error("❌ Error in changeUserRole:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

module.exports = {
  getUsers,
  changeUserRole
};