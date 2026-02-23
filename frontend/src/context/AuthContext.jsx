import React, { createContext, useState, useEffect, useContext } from "react";
import {
  getCurrentUser,
  logoutUser as logoutService,
} from "../services/auth.service";
import { decodeToken, isTokenExpired } from "../utils/tokenUtils";
import {
  ROLES,
  hasPermission,
  isAtLeastRole,
  getRoleDisplayName,
} from "../utils/roleUtils";

// Create Context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on initial load
  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const loadUserFromStorage = async () => {
    try {
      const storedUser = getCurrentUser();
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken && !isTokenExpired(storedToken)) {
        // Decode token to get full user data including role
        const decodedToken = decodeToken(storedToken);

        // Enhance user with decoded token data
        const enhancedUser = {
          ...storedUser,
          ...decodedToken,
          role: storedUser.role || decodedToken?.role || "staff",
        };

        setUser(enhancedUser);
        setToken(storedToken);
      } else {
        // Clear invalid data
        logoutService();
        setUser(null);
        setToken(null);
      }
    } catch (error) {
      console.error("Error loading user:", error);
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  // Login - called from Login component
  const login = (userData, authToken) => {
    const decodedToken = decodeToken(authToken);

    const enhancedUser = {
      ...userData,
      ...decodedToken,
      role: userData.role || decodedToken?.role || "staff",
    };

    setUser(enhancedUser);
    setToken(authToken);
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout
  const logout = () => {
    logoutService();
    setUser(null);
    setToken(null);
  };

  // ===== ROLE CHECKING FUNCTIONS =====

  // Check if user has a specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.role === ROLES.ADMIN;
  };

  // Check if user is manager
  const isManager = () => {
    return user?.role === ROLES.MANAGER;
  };

  // Check if user is staff
  const isStaff = () => {
    return user?.role === ROLES.STAFF;
  };

  // Check if user has at least a certain role (e.g., isAtLeast('manager') returns true for admin and manager)
  const isAtLeast = (minimumRole) => {
    return isAtLeastRole(user?.role, minimumRole);
  };

  // Check if user has specific permission
  const can = (permission) => {
    return hasPermission(user?.role, permission);
  };

  // Get user role display name
  const getRoleDisplay = () => {
    return getRoleDisplayName(user?.role);
  };

  // Value object to be provided to consumers
  const value = {
    user,
    token,
    loading,
    login,
    logout,
    hasRole,
    isAdmin,
    isManager,
    isStaff,
    isAtLeast,
    can,
    getRoleDisplay,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
