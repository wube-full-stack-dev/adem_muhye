import React, { useState } from "react";
import { Link } from "react-router-dom";
import VideoHero from "../components/home/VideoHero";
import { getProductImage } from "../constants/images";
import HeroSection from "../components/home/HeroSection";

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  // Product list
  const products = [
    // Soft Drinks
    {
      id: 1,
      name: "Coca Cola",
      category: "Soft Drink",
      price: 25,
      popular: true,
    },
    { id: 2, name: "softy", category: "Soft Drink", price: 26 },
    { id: 3, name: "softy2", category: "Soft Drink", price: 26 },
    { id: 4, name: "softy3", category: "Soft Drink", price: 26 },
    { id: 5, name: "softy4", category: "Soft Drink", price: 26 },
    { id: 6, name: "Sprite", category: "Soft Drink", price: 23 },
    { id: 7, name: "Fanta", category: "Soft Drink", price: 22, discount: 10 },
    { id: 12, name: "7up", category: "Soft Drink", price: 23 },
    // Juices
    { id: 13, name: "mangor", category: "Juice", price: 30, popular: true },
    { id: 14, name: "kk", category: "Juice", price: 28 },
    { id: 15, name: "avo", category: "Juice", price: 32, popular: true },
    { id: 16, name: "yoyo", category: "Juice", price: 29 },
    { id: 17, name: "mango cr", category: "Juice", price: 31 },
    { id: 18, name: "alang yo", category: "Juice", price: 30 },
    // Water
    { id: 19, name: "one", category: "Water", price: 15 },
    { id: 20, name: "dega", category: "Water", price: 18 },
    { id: 21, name: "woa", category: "Water", price: 16 },
    { id: 22, name: "top", category: "Water", price: 20 },
    { id: 23, name: "delt", category: "Water", price: 25, popular: true },
    { id: 24, name: "delp", category: "Water", price: 25, popular: true },
    { id: 25, name: "ff", category: "Water", price: 25, popular: true },
    { id: 26, name: "topp", category: "Water", price: 25, popular: true },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const categories = [
    { id: "all", name: "All Products", icon: "📦", color: "gray" },
    { id: "Soft Drink", name: "Soft Drinks", icon: "🥤", color: "blue" },
    { id: "Juice", name: "Juices", icon: "🧃", color: "orange" },
    { id: "Water", name: "Water", icon: "💧", color: "cyan" },
  ];

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
    <div className="min-h-screen bg-[#0B0F19] selection:bg-green-500/30">
      {/* --- MODERN COMBINED HERO SECTION --- */}
      <section className="relative w-full overflow-hidden pt-8 pb-20">
        {/* Ambient Glowing Background Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-green-500/10 blur-[120px]"></div>
          <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]"></div>
        </div>

        {/* Text Hero Area */}
        <div className="relative z-10 w-full">
          <HeroSection />
        </div>
        <b/>
        <br />
      
        {/* Video Showcase - Overlapping Effect */}
        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:-mt-8 lg:-mt-16">
          <div className="relative rounded-3xl overflow-hidden shadow-[0_0_50px_-12px_rgba(34,197,94,0.3)] border border-white/10 bg-black/40 backdrop-blur-sm group transform transition-transform duration-700 hover:scale-[1.02]">
            <div className="absolute inset-0 z-30 pointer-events-none rounded-3xl ring-1 ring-inset ring-white/10 bg-gradient-to-b from-white/5 to-transparent"></div>
            <div className="relative z-20 w-full h-full">
              <VideoHero />
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Category Filter */}
      <section className="py-6 sticky top-16 z-30 bg-[#0B0F19]/80 backdrop-blur-xl border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? `bg-gradient-to-r ${getCategoryColorClass(cat.color)} text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] scale-105`
                    : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                <span className="text-xl">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              {activeCategory === "all"
                ? "Our Premium Beverages"
                : `${activeCategory} Collection`}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {activeCategory === "all"
                ? "Discover our wide selection of refreshing drinks"
                : `Explore our finest ${activeCategory.toLowerCase()} selection`}
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
              <div className="text-6xl mb-4">😢</div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                No products found
              </h3>
              <p className="text-gray-400">
                Try selecting a different category
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white/[0.03] backdrop-blur-md rounded-3xl overflow-hidden hover:bg-white/[0.06] transition-all duration-300 border border-white/10 hover:border-white/20 flex flex-col h-full"
                >
                  {/* Product Image */}
                  <div className="relative h-60 bg-gradient-to-br from-white/5 to-transparent overflow-hidden flex items-center justify-center p-6">
                    <img
                      src={getProductImage(product.name)}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-110 group-hover:rotate-2 transition-transform duration-500 drop-shadow-2xl"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=200";
                      }}
                    />
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.popular && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold text-black bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg">
                          🔥 Popular
                        </span>
                      )}
                      {product.discount && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 shadow-lg">
                          -{product.discount}% OFF
                        </span>
                      )}
                    </div>
                    {/* Category Badge */}
                    <span
                      className={`absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg backdrop-blur-md border border-white/20
                      ${product.category === "Soft Drink" ? "bg-blue-500/80" : product.category === "Juice" ? "bg-orange-500/80" : "bg-cyan-500/80"}`}
                    >
                      {product.category}
                    </span>
                  </div>

                  {/* Product Info */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-bold text-xl text-white mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 line-clamp-2 flex-grow">
                      {product.category === "Soft Drink" &&
                        "Refreshing carbonated beverage"}
                      {product.category === "Juice" &&
                        "Freshly squeezed fruit juice"}
                      {product.category === "Water" &&
                        "Pure natural spring water"}
                    </p>
                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                      <div>
                        <span className="text-2xl font-bold text-white">
                          ${product.price}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">
                          /crate
                        </span>
                      </div>
                      <Link
                        to="/order"
                        state={{ selectedProduct: product }}
                        className="bg-white/10 text-white px-4 py-2 rounded-xl hover:bg-green-500 hover:text-white transition-all duration-300 flex items-center gap-2 border border-white/10 hover:border-green-500 font-medium"
                      >
                        <span>🛒</span>
                        <span>Order</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* View All Button */}
          <div className="text-center mt-16">
            <Link
              to="/products"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-green-400 hover:text-black transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <span>View All Products</span>
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/[0.02] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We provide the best beverage distribution service
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚚",
                title: "Fast Delivery",
                desc: "Get your orders delivered within 24 hours",
              },
              {
                icon: "💯",
                title: "Quality Guarantee",
                desc: "100% authentic products from top brands",
              },
              {
                icon: "💰",
                title: "Best Prices",
                desc: "Competitive wholesale prices for businesses",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="text-center p-10 rounded-3xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 border border-white/5 hover:border-white/20 hover:-translate-y-2 group"
              >
                <div className="bg-gradient-to-br from-green-400/20 to-green-600/20 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500">
                  <span className="text-5xl">{feature.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 mb-10 uppercase tracking-[0.2em] text-sm font-bold">
            Trusted by leading distributors
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20">
            {[
              "Prime Distributors",
              "AquaPure",
              "JuiceMaster",
              "ColaCo",
              "SpringWater",
            ].map((brand, i) => (
              <div
                key={i}
                className="text-xl md:text-2xl font-bold text-gray-600 hover:text-white transition duration-300 cursor-pointer flex items-center gap-2 grayscale hover:grayscale-0"
              >
                🏢 {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Customer Stories
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Real feedback from real customers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "John Doe",
                role: "Restaurant Owner",
                review:
                  "Excellent service and quality products. Fast delivery and great prices!",
              },
              {
                name: "Jane Smith",
                role: "Cafe Manager",
                review:
                  "Best beverage distributor in town. Very reliable and professional.",
              },
              {
                name: "Mike Johnson",
                role: "Hotel Owner",
                review:
                  "Amazing customer service and premium quality drinks. Highly recommended!",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-md p-10 rounded-3xl hover:bg-white/10 transition-all duration-300 border border-white/10 relative"
              >
                <div className="absolute -top-5 -left-2 text-6xl text-green-500/20 font-serif">
                  "
                </div>
                <div className="flex items-center mb-6">
                  <div className="text-yellow-400 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 mb-8 leading-relaxed text-lg relative z-10">
                  {testimonial.review}
                </p>
                <div className="flex items-center pt-6 border-t border-white/10">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-white text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-green-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-green-500 to-green-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl border border-green-400/30">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:20px_20px]"></div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 relative z-10">
              Ready to Start Ordering?
            </h2>
            <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto relative z-10">
              Join hundreds of satisfied customers enjoying premium beverages at
              wholesale prices.
            </p>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <Link
                to="/register"
                className="bg-white text-green-900 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl text-lg"
              >
                Get Started Free
              </Link>
              <Link
                to="/contact"
                className="bg-black/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all text-lg"
              >
                Contact Sales
              </Link>
            </div>
            <p className="text-green-200 mt-6 text-sm font-medium relative z-10">
              No credit card required • Free trial
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
