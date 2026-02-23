import React, { useState } from "react";
import ProductCard from "../../components/products/ProductCard";

const ProductsPage = () => {
  const [category, setCategory] = useState("all");

  const products = [
    {
      id: 1,
      name: "Coca Cola",
      category: "Soft Drink",
      price: 25,
      popular: true,
      description: "Classic refreshing cola taste since 1886",
    },
    {
      id: 2,
      name: "Pepsi",
      category: "Soft Drink",
      price: 24,
      popular: true,
      description: "The choice of a new generation",
    },
    {
      id: 3,
      name: "Sprite",
      category: "Soft Drink",
      price: 23,
      description: "Crisp, refreshing lemon-lime flavor",
    },
    {
      id: 4,
      name: "Fanta",
      category: "Soft Drink",
      price: 22,
      discount: 10,
      description: "Fun, fruity orange taste",
    },
    {
      id: 5,
      name: "Orange Juice",
      category: "Juice",
      price: 30,
      popular: true,
      description: "Freshly squeezed orange juice",
    },
    {
      id: 6,
      name: "Mineral Water",
      category: "Water",
      price: 15,
      description: "Pure natural spring water",
    },
  ];

  const categories = ["all", "Soft Drink", "Juice", "Water"];
  const filteredProducts =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Our Premium Beverages
          </h1>
          <p className="text-xl text-gray-600">
            Choose from our wide selection of refreshing drinks
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                category === cat
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {cat === "all" ? "All Products" : cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
