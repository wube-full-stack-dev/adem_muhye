const express = require("express");
const router = express.Router();
const {
  verifyToken,
  isAuthenticated,
  isAdmin,
} = require("../middleware/auth.middleware");
const {
  addSale,
  getSales,
  removeSale,
} = require("../controllers/sale.controller");

// ===== PUBLIC ROUTES =====
// None - all sale routes require authentication

// ===== PROTECTED ROUTES (Any authenticated user) =====
// Apply verifyToken first, then isAuthenticated
router.post("/addsale", [verifyToken, isAuthenticated], addSale);
router.get("/getsale", [verifyToken, isAuthenticated], getSales);

// ===== ADMIN ONLY ROUTES =====
// Triple gate: verifyToken → isAuthenticated → isAdmin
router.delete(
  "/deletesale/:id",
  [verifyToken, isAuthenticated, isAdmin],
  removeSale,
);

module.exports = router;
