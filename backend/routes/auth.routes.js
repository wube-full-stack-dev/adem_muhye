const express = require("express");
const router = express.Router();

// ✅ MAKE SURE THESE ARE IMPORTED!
const { register, login } = require("../controllers/auth.controller");

// POST /api/register - Register new user
router.post("/register", register);

// POST /api/login - Login user
router.post("/login", login);

module.exports = router;
