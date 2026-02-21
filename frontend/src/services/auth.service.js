// Comment out the env variable for now
// const API_URL = import.meta.env.VITE_API_URL;

// Hardcode for testing
const API_URL = "http://localhost:5666/api";

console.log("🔍 Using API_URL:", API_URL);

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

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return { success: false, message: "Server error" };
  }
};
