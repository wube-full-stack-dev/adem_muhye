const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5666/api";

// Get all users (admin only)
export const getUsers = async (token) => {
  try {
    const response = await fetch(`${API_URL}/admin/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return { success: false, message: "Server error" };
  }
};

// Update user role (admin only)
export const updateUserRole = async (userId, role, token) => {
  try {
    const response = await fetch(`${API_URL}/admin/users/${userId}/role`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role }),
    });
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return { success: false, message: "Server error" };
  }
};
