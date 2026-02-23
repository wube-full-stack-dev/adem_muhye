import React from "react";
import { Link } from "react-router-dom";
import { getProductImage } from "../../constants/images";

const ProductCard = ({ product }) => {
  const { id, name, category, price, description, popular, discount } = product;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <img
          src={getProductImage(name)}
          alt={name}
          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-2">
          {popular && (
            <span className="bg-yellow-400 text-xs font-bold px-2 py-1 rounded">
              🔥 Popular
            </span>
          )}
          {discount && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-sm text-gray-600">{category}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-600">${price}</p>
            <p className="text-xs text-gray-500">per crate</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {description || "Refreshing beverage perfect for any occasion"}
        </p>

        {/* Actions */}
        <div className="flex space-x-2">
          <Link
            to={`/product/${id}`}
            className="flex-1 border border-green-600 text-green-600 text-center py-2 rounded-lg hover:bg-green-50 transition"
          >
            View Details
          </Link>
          <Link
            to="/admin/addsale"
            state={{ selectedProduct: product }}
            className="flex-1 bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-1"
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
