const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5666/api";

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return { success: false, message: "Server error.." };
  }
};

// Login user - STORE TOKEN!
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    // Store token and user data
    if (data.success && data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    return { success: false, message: "Server error" };
  }
};

// ✅ FIX: Add getCurrentUser function
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

// ✅ FIX: Add getToken function
export const getToken = () => {
  return localStorage.getItem("token");
};

// ✅ FIX: Add logoutUser function
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// ✅ FIX: Add isAuthenticated function
export const isAuthenticated = () => {
  return !!getToken();
};

// ✅ FIX: Add isAdmin function
export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.role === "admin";
};

// ✅ FIX: Add isManager function
export const isManager = () => {
  const user = getCurrentUser();
  return user?.role === "manager";
};
