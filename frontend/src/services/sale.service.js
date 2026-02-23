import { getToken } from "./auth.service";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5666/api";

// Get all sales - WITH TOKEN
export const getSales = async () => {
  try {
    const token = getToken();

    const response = await fetch(`${API_URL}/getsale`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("📥 getSales response:", data);

    // Return the data array or empty array
    return data.data || [];
  } catch (error) {
    console.error("Error fetching sales:", error);
    return [];
  }
};

// Create new sale - WITH TOKEN
export const createSale = async (saleData) => {
  try {
    const token = getToken();

    const response = await fetch(`${API_URL}/addsale`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saleData),
    });

    return await response.json();
  } catch (error) {
    console.error("Error creating sale:", error);
    return { success: false, message: "Server error" };
  }
};

// Delete sale - WITH TOKEN
export const deleteSale = async (saleId) => {
  try {
    const token = getToken();

    const response = await fetch(`${API_URL}/deletesale/${saleId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Error deleting sale:", error);
    return { success: false, message: "Server error" };
  }
};
