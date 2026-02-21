import React, { useState, useEffect } from "react";
import ProductSelect from "./ProductSelect";
import { categories } from "../constants/productConstants";

// 1. This component collects all sale form data from user
const SaleForm = ({ onSubmit, loading, resetTrigger }) => {
  // 2. Store all form input values in one state object
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    category: "Select catagory",
    product: "",
    quantity: "",
    price: "",
  });

  // 3. Runs whenever any input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // 4. name = input field name, value = user typed value

    setFormData((prev) => ({
      ...prev, // 5. Keep old values
      [name]: value, // 6. Update only changed field

      // 7. If category changes → reset product selection
      ...(name === "category" && { product: "" }),
    }));
  };

  // 8. Runs when form is submitted
  const handleSubmit = (e) => {
    e.preventDefault(); // 9. Stop page reload
    onSubmit(formData); // 🔟 Send form data to parent component
  };
useEffect(() => {
  setFormData({
    customer_name: "",
    customer_phone: "",
    category: "Select catagory",
    product: "",
    quantity: "",
    price: "",
  });
  // 12. This runs only when resetTrigger changes
}, [resetTrigger]);
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 11. Customer Name input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Customer Name
        </label>
        <input
          type="text"
          name="customer_name"
          value={formData.customer_name} // 12. Controlled input from state
          onChange={handleChange} // 13. Update state when typing
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter customer name"
        />
      </div>

      {/* 14. Customer Phone input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          name="customer_phone"
          value={formData.customer_phone}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter phone number"
        />
      </div>

      {/* 15. Category dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          {/* 16. Loop through categories list */}
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* 17. Product dropdown filtered by selected category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product
        </label>
        <ProductSelect
          selectedCategory={formData.category} // 18. Send selected category
          value={formData.product} // 19. Current product value
          onChange={handleChange} // 20. Update state on change
        />
      </div>

      {/* 21. Quantity and Price inputs in one row */}
      <div className="grid grid-cols-2 gap-4">
        {/* 22. Quantity input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity (Crates)
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="1"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Qty"
          />
        </div>

        {/* 23. Price input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price ($)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Price"
          />
        </div>
      </div>

      {/* 24. Submit button */}
      <button
        type="submit"
        disabled={loading} // 25. Disable while submitting
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
      >
        {/* 26. Show loading text or normal text */}
        {loading ? "Adding..." : "➕ Add Sale"}
      </button>
    </form>
  );
};

export default SaleForm;
