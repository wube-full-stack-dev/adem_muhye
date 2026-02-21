const jwt = require("jsonwebtoken");
const { query } = require("../conf/db.cofig");

/**
 * SENIOR APPROACH:
 * Middleware are "security gates" - each has ONE job
 * They pass data via req object to next middleware
 */

// ===== GATE 1: Verify JWT Token =====
// Job: Confirm identity - "Do you have a valid key?"
const verifyToken = async (req, res, next) => {
  try {
    // Get token from header (standard: Bearer token)
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Extract token (remove "Bearer " prefix)
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🚀 SENIOR MOVE: Attach user data to request object
    // Now ALL subsequent middleware and controllers have access!
    req.user = {
      user_id: decoded.user_id,
      email: decoded.email,
      username: decoded.username,
      role: decoded.role,
    };

    // Optional: Log for debugging
    console.log(`🔐 User authenticated: ${decoded.email} (${decoded.role})`);

    next(); // Proceed to next gate or controller
  } catch (error) {
    // Different error types for better security
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({
        success: false,
        message: "Invalid token. Please login again.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Authentication error",
    });
  }
};

// ===== GATE 2: Role-Based Authorization =====
// Job: Check permissions - "Are you allowed in this room?"

// Admin only gate
const isAdmin = (req, res, next) => {
  // User data comes from verifyToken
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  if (req.user.role === "admin") {
    console.log(`✅ Admin access granted: ${req.user.email}`);
    next(); // Admin access granted
  } else {
    console.log(
      `❌ Admin access denied: ${req.user.email} (role: ${req.user.role})`,
    );
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin privileges required.",
    });
  }
};

// Staff or Admin gate (any authenticated user)
const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }
  next(); // Any authenticated user can proceed
};

// Optional: Specific role gate (if you add more roles later)
const hasRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (allowedRoles.includes(req.user.role)) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required roles: ${allowedRoles.join(", ")}`,
      });
    }
  };
};

module.exports = {
  verifyToken,
  isAuthenticated,
  isAdmin,
  hasRole,
};
