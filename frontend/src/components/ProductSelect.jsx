import React from "react";
import { productsByCategory } from "../constants/productConstants";

// 1. This component shows product dropdown based on selected category
const ProductSelect = ({ selectedCategory, value, onChange }) => {
  // 2. Get products list for the chosen category
  //    If category not found, return empty array
  const products = productsByCategory[selectedCategory] || [];

  return (
    <select
      name="product" // 3. Name used to store value inside formData
      value={value} // 4. Current selected product from parent state
      onChange={onChange} // 5. When user selects product → update parent form state
      required
      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      {/* 6. Default empty option */}
      <option value="">Select Product</option>

      {/* 7. Loop through products and create dropdown options */}
      {products.map((product) => (
        <option key={product} value={product}>
          {product}
        </option>
      ))}
    </select>
  );
};

export default ProductSelect;
