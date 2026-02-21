const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/auth.middleware");
const { getUsers, changeUserRole } = require("../controllers/admin.controller");

// All admin routes require verifyToken + isAdmin
router.get("/users", [verifyToken, isAdmin], getUsers);
router.put("/users/:userId/role", [verifyToken, isAdmin], changeUserRole);

module.exports = router;
