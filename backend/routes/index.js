const express = require("express");
const router = express.Router();
const saleRoutes = require("./sale.routes");
const installRoutes = require("./install.routes");
const authRoutes = require("./auth.routes"); // ADD THIS
const adminRoutes=require('./admin.routes')

router.use("/api", saleRoutes);
router.use("/api", installRoutes);
router.use("/api", authRoutes); // ADD THIS
router.use("/api", adminRoutes); // ADD THIS

module.exports = router;
