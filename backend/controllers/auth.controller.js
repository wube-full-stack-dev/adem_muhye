const { registerUser, loginUser } = require("../services/auth.service");

// ✅ MAKE SURE THESE FUNCTIONS ARE EXPORTED!
async function register(req, res) {
  try {
    const { username, email, password, full_name } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email and password are required",
      });
    }

    const result = await registerUser({ username, email, password, full_name });

    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (err) {
    console.error("Error in register:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const result = await loginUser({ email, password });

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(401).json(result);
    }
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
async function promoteToAdmin(req, res) {
  try {
    const { email } = req.body;
    const { query } = require("../conf/db.config");
    await query("UPDATE users SET role = 'admin' WHERE email = ?", [email]);
    res.json({ success: true, message: "User promoted to admin" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
}

// ✅ MAKE SURE TO EXPORT!
module.exports = {
  register,
  login,
  promoteToAdmin,
};
