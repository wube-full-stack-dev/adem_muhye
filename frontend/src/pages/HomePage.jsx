import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/home/HeroSection";
import { images } from "../constants/images";

const HomePage = () => {
  // Sample products for featured section
  const featuredProducts = [
    {
      id: 1,
      name: "Coca Cola",
      price: 25,
      image: images.products.coke,
      category: "Soft Drink",
    },
    {
      id: 2,
      name: "Pepsi",
      price: 24,
      image: images.products.pepsi,
      category: "Soft Drink",
    },
    {
      id: 3,
      name: "Sprite",
      price: 23,
      image: images.products.sprite,
      category: "Soft Drink",
    },
    {
      id: 4,
      name: "Fanta",
      price: 22,
      image: images.products.fanta,
      category: "Soft Drink",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ===== HERO SECTION ===== */}
      <HeroSection />

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our most popular beverages loved by customers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition group"
              >
                <div className="h-48 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain group-hover:scale-110 transition duration-300"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/200x200?text=Product";
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {product.category}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">
                      ${product.price}
                    </span>
                    <Link
                      to="/products"
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide the best beverage distribution service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-2xl hover:shadow-lg transition">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your orders delivered within 24 hours
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 rounded-2xl hover:shadow-lg transition">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💯</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Quality Guarantee</h3>
              <p className="text-gray-600">
                100% authentic products from top brands
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 rounded-2xl hover:shadow-lg transition">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Best Prices</h3>
              <p className="text-gray-600">
                Competitive wholesale prices for businesses
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUSTED BY SECTION ===== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600 mb-8 uppercase tracking-wider text-sm font-semibold">
            Trusted by leading distributors
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="text-2xl font-bold text-gray-400 hover:text-gray-600 transition"
              >
                🏢 Brand {i}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Ordering?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied customers enjoying premium beverages
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/register"
              className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
            >
              Get Started Free
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition"
            >
              Contact Sales
            </Link>
          </div>
          <p className="text-green-200 mt-4 text-sm">
            No credit card required • Free trial
          </p>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real feedback from real customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-6">
                  "Excellent service and quality products. Fast delivery and
                  great prices!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-xl font-bold">
                    👤
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">Happy Customer</h4>
                    <p className="text-sm text-gray-600">Business Owner</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
