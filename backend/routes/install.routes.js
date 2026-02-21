const express = require("express");
const router = express.Router();
const { install } = require("../controllers/install.controller");

// Protect install route with a secret key
router.get(
  "/install",
  (req, res, next) => {
    const installKey = req.query.key;

    if (installKey === process.env.INSTALL_KEY) {
      next(); // Access granted
    } else {
      res.status(401).json({
        success: false,
        message: "Not authorized to run installer",
      });
    }
  },
  install,
);

module.exports = router;
