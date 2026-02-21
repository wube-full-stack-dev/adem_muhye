// 1. Get backend API base URL from environment variable
const API_URL = import.meta.env.VITE_API_URL;

// 2. Function to send new sale data to backend
export const createSale = async (saleData) => {
  try {
    // 3. Send POST request with JSON body
    const response = await fetch(`${API_URL}/addsale`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(saleData),
    });
    console.log(response);
    // 4. Return server response as JSON
    return await response.json();
  } catch (error) {
    // 5. Handle network/server error
    console.error("API Error:", error);
    return { success: false, message: "Server error" };
  }
};

// 6. Function to fetch all sales from backend
export const getSales = async () => {
  try {
    // 7. Send GET request
    const response = await fetch(`${API_URL}/getsale`);
    console.log(response);
    // 8. Return sales list
    return await response.json();
  } catch (error) {
    // 9. Handle error and return empty array
    console.error("API Error:", error);
    return [];
  }
};
export const deleteSale = async (saleId) => {
  try {
    const response = await fetch(`${API_URL}/deletesale/${saleId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return { success: false, message: "Server error" };
  }
};