import React from "react";
import { Link } from "react-router-dom";
import { getProductImage } from "../../constants/images";

const ProductCard = ({ product }) => {
  const { id, name, category, price, description, popular, discount } = product;

  // Get category color
  const getCategoryColor = (cat) => {
    const colors = {
      "Soft Drink": "bg-blue-50 text-blue-700 border-blue-200",
      Juice: "bg-orange-50 text-orange-700 border-orange-200",
      Water: "bg-cyan-50 text-cyan-700 border-cyan-200",
    };
    return colors[cat] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-100 hover:border-green-200">
      {/* Image Container */}
      <div className="relative md:h-56 bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <img
          src={getProductImage(name)}
          alt={name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/200x200?text=Product";
          }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {popular && (
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
              🔥 Popular
            </span>
          )}
          {discount && (
            <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
              -{discount}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category Badge */}
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 border ${getCategoryColor(category)}`}
        >
          {category}
        </span>

        {/* Title & Price */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-xl text-gray-800">{name}</h3>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-600">${price}</p>
            <p className="text-xs text-gray-500">per crate</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
          {description || "Refreshing beverage perfect for any occasion"}
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            to={`/product/${id}`}
            className="px-4 py-2.5 border-2 border-green-600 text-green-600 text-center rounded-xl hover:bg-green-50 transition font-medium text-sm"
          >
            Details
          </Link>
          <Link
            to="/order"
            state={{ selectedProduct: product }}
            className="px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white text-center rounded-xl hover:from-green-700 hover:to-green-800 transition font-medium text-sm flex items-center justify-center gap-2"
          >
            <span>🛒</span>
            <span>Order</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
