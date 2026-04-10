import React from "react";
import { Link } from "react-router-dom";
import { getProductImage } from "../../constants/images";

const ProductCard = ({ product }) => {
  const { id, name, category, price, description, popular, discount } = product;

  // Get category badge color
  const getCategoryBadgeColor = () => {
    const colors = {
      "Soft Drink": "bg-blue-500/80",
      Juice: "bg-orange-500/80",
      Water: "bg-cyan-500/80",
    };
    return colors[category] || "bg-green-500/80";
  };

  return (
    <div className="group bg-white/10 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
      {/* Product Image Container */}
      <div className="relative h-56 bg-gradient-to-br from-gray-800/30 to-gray-900/30 overflow-hidden">
        <img
          src={getProductImage(name)}
          alt={name}
          className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=200";
          }}
        />

        {/* Badges Container */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {popular && (
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
              🔥 Popular
            </span>
          )}
          {discount && (
            <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
              -{discount}% OFF
            </span>
          )}
        </div>

        {/* Category Badge - Bottom Right */}
        <span
          className={`absolute bottom-3 right-3 px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-md ${getCategoryBadgeColor()}`}
        >
          {category}
        </span>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-xl text-white group-hover:text-green-400 transition-colors">
            {name}
          </h3>
          <div className="text-right">
            <span className="text-2xl font-bold text-green-400">${price}</span>
            <span className="text-xs text-gray-400 ml-1">/crate</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {description ||
            (category === "Soft Drink"
              ? "Refreshing carbonated beverage"
              : category === "Juice"
                ? "Freshly squeezed fruit juice"
                : "Pure natural spring water")}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            to={`/product/${id}`}
            className="flex-1 border border-white/30 text-white text-center py-2.5 rounded-xl hover:bg-white/10 transition font-medium text-sm"
          >
            Details
          </Link>
          <Link
            to="/order"
            state={{ selectedProduct: product }}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-2.5 rounded-xl hover:from-green-600 hover:to-green-700 transition font-medium text-sm flex items-center justify-center gap-2"
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
