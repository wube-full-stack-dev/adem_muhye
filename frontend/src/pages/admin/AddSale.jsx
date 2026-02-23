import React, { useState } from "react";
import SaleForm from "../../components/SaleForm";
import { createSale } from "../../services/sale.service";

// 1. This component is the main page for adding a new sale
const AddSale = () => {
  // 2. loading → tells if the form is currently submitting to backend
  const [loading, setLoading] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  
  // 3. message → stores success or error message to show on screen
  const [message, setMessage] = useState({ text: "", type: "" });

  // 4. This function runs when SaleForm is submitted
  const handleSubmit = async (formData) => {
    // 5. Start loading and clear any previous message
    setLoading(true);
    setMessage({ text: "", type: "" });

    // 6. Send form data to backend API
    const result = await createSale(formData);

    // 7. If backend response says success → show success message
    if (result.success) {
      setMessage({ text: "✅ Sale added successfully!", type: "success" });
          setResetTrigger((prev) => prev + 1);

    }
      //reset form
    
    // 8. Otherwise → show error message
    else {
      setMessage({ text: "❌ Failed to add sale", type: "error" });
    }

    // 9. Stop loading after API response
    setLoading(false);
  };

  // 10. UI rendering starts here
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {/* 11. Center white card container */}
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        {/* 12. Page title */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          🥤 Add New Sale
        </h1>

        {/* 13. Show message only if message.text is not empty */}
        {message.text && (
          <div
            className={`mb-4 p-3 rounded-lg text-center ${
              // 14. Change color based on message type
              message.type === "success"
                ? "bg-green-100 text-green-700 border border-green-400"
                : "bg-red-100 text-red-700 border border-red-400"
            }`}
          >
            {/* 15. Display success or error text */}
            {message.text}
          </div>
        )}

        {/* 16. Render SaleForm component */}
        {/* 17. Pass handleSubmit so form can send data here */}
        {/* 18. Pass loading state to disable button and show "Adding..." */}
        <SaleForm onSubmit={handleSubmit} loading={loading}  resetTrigger={resetTrigger} />
      </div>
    </div>
  );
};

export default AddSale;
