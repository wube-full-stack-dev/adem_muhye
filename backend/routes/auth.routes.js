const express = require("express");
const router = express.Router();

// ✅ MAKE SURE THESE ARE IMPORTED!
const {
  register,
  login,
  promoteToAdmin,
  makeMeAdmin,
} = require("../controllers/auth.controller");
// POST /api/register - Register new user
router.post("/register", register);

// POST /api/login - Login user
router.post("/login", login);
router.post("/promote-admin", promoteToAdmin);
router.post("/make-admin", makeMeAdmin);

module.exports = router;
