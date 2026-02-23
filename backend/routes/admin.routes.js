const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/auth.middleware");
const { getUsers, changeUserRole } = require("../controllers/admin.controller");

// ✅ CORRECT PATHS (no extra /admin)

// GET /api/admin/users
router.get("/users", [verifyToken, isAdmin], getUsers);

// PUT /api/admin/users/7/role
router.put("/users/:userId/role", [verifyToken, isAdmin], changeUserRole);

module.exports = router;
