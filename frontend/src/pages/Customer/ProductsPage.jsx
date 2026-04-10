import React, { useState } from "react";
import ProductCard from "../../components/products/ProductCard";

const ProductsPage = () => {
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const products = [
    // Soft Drinks
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
      name: "softy",
      category: "Soft Drink",
      price: 26,
      description: "Zero sugar, same great taste",
    },
    {
      id: 3,
      name: "softy2",
      category: "Soft Drink",
      price: 26,
      description: "Light and refreshing",
    },
    {
      id: 4,
      name: "softy3",
      category: "Soft Drink",
      price: 26,
      description: "The choice of a new generation",
    },
    {
      id: 5,
      name: "softy4",
      category: "Soft Drink",
      price: 26,
      description: "Maximum taste, zero sugar",
    },
    {
      id: 6,
      name: "Sprite",
      category: "Soft Drink",
      price: 23,
      description: "Crisp, refreshing lemon-lime",
    },
    {
      id: 7,
      name: "Fanta",
      category: "Soft Drink",
      price: 22,
      discount: 10,
      description: "Fun, fruity orange taste",
    },
    {
      id: 12,
      name: "7up",
      category: "Soft Drink",
      price: 23,
      description: "Crisp and clear",
    },
    // Juices
    {
      id: 13,
      name: "mangor",
      category: "Juice",
      price: 30,
      popular: true,
      description: "Freshly squeezed oranges",
    },
    {
      id: 14,
      name: "kk",
      category: "Juice",
      price: 28,
      description: "Pure apple goodness",
    },
    {
      id: 15,
      name: "avo",
      category: "Juice",
      price: 32,
      popular: true,
      description: "Tropical mango delight",
    },
    {
      id: 16,
      name: "yoyo",
      category: "Juice",
      price: 29,
      description: "5 fruits in one",
    },
    {
      id: 17,
      name: "mango cr",
      category: "Juice",
      price: 31,
      description: "Sweet pineapple taste",
    },
    {
      id: 18,
      name: "alang yo",
      category: "Juice",
      price: 30,
      description: "Rich grape flavor",
    },
    // Water
    {
      id: 19,
      name: "one",
      category: "Water",
      price: 15,
      description: "Pure natural minerals",
    },
    {
      id: 20,
      name: "dega",
      category: "Water",
      price: 18,
      description: "Refreshing bubbles",
    },
    {
      id: 21,
      name: "woa",
      category: "Water",
      price: 16,
      description: "From natural springs",
    },
    {
      id: 22,
      name: "top",
      category: "Water",
      price: 20,
      description: "Hint of lemon",
    },
    {
      id: 23,
      name: "delt",
      category: "Water",
      price: 25,
      popular: true,
      description: "Natural electrolytes",
    },
    {
      id: 24,
      name: "delp",
      category: "Water",
      price: 25,
      popular: true,
      description: "Natural electrolytes",
    },
    {
      id: 25,
      name: "ff",
      category: "Water",
      price: 25,
      popular: true,
      description: "Natural electrolytes",
    },
    {
      id: 26,
      name: "topp",
      category: "Water",
      price: 25,
      popular: true,
      description: "Natural electrolytes",
    },
  ];

  const categories = [
    { id: "all", name: "All Products", icon: "📦", color: "gray" },
    { id: "Soft Drink", name: "Soft Drinks", icon: "🥤", color: "blue" },
    { id: "Juice", name: "Juices", icon: "🧃", color: "orange" },
    { id: "Water", name: "Water", icon: "💧", color: "cyan" },
  ];

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  // Filter by category
  const filteredProducts =
    category === "all"
      ? sortedProducts
      : sortedProducts.filter((p) => p.category === category);

  // Helper to get category color class
  const getCategoryColorClass = (color) => {
    const colors = {
      gray: "from-gray-500 to-gray-600",
      blue: "from-blue-500 to-blue-600",
      orange: "from-orange-500 to-orange-600",
      cyan: "from-cyan-500 to-cyan-600",
    };
    return colors[color] || "from-green-500 to-green-600";
  };

  return (
    <div className="min-h-screen pt-28 pb-16">
      {/* Header */}
      <div className="text-center px-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Our <span className="text-green-400">Premium</span> Beverages
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Discover our wide selection of refreshing drinks
        </p>
      </div>

      {/* Filters Bar - Glass Effect */}
      <div className="sticky top-20 z-30 bg-black/40 backdrop-blur-md border-b border-white/10 shadow-sm mb-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Category Filter */}
            <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    category === cat.id
                      ? `bg-gradient-to-r ${getCategoryColorClass(cat.color)} text-white shadow-lg scale-105`
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Sort Dropdown - Glass Effect */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="default" className="bg-gray-800">
                Sort by: Default
              </option>
              <option value="price-low" className="bg-gray-800">
                Price: Low to High
              </option>
              <option value="price-high" className="bg-gray-800">
                Price: High to Low
              </option>
              <option value="name" className="bg-gray-800">
                Name: A to Z
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <p className="text-sm text-gray-400">
          Showing{" "}
          <span className="font-semibold text-white">
            {filteredProducts.length}
          </span>{" "}
          products
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😢</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-400">Try selecting a different category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Footer Stats - Glass Effect */}
      <div className="max-w-7xl mx-auto px-4 mt-16">
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-1">{products.length}+</div>
              <div className="text-green-100 text-sm">Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">4</div>
              <div className="text-green-100 text-sm">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">24/7</div>
              <div className="text-green-100 text-sm">Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">🚚</div>
              <div className="text-green-100 text-sm">Fast Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
