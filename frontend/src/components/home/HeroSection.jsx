import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { images } from "../../constants/images";
import { useAuth } from "../../context/AuthContext";

const HeroSection = () => {
  const { isAuthenticated } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

  // ===== SLIDE IMAGES - FROM ASSETS FOLDER =====
  const slides = [
    {
      id: 1,
      image: images.slider.slide1,
      title: "Your Favorite Beverages",
      subtitle: "Delivered Fast",
      description: "Premium quality drinks for every occasion.",
    },
    {
      id: 2,
      image: images.slider.slide2,
      title: "Fresh & Refreshing",
      subtitle: "Taste the Difference",
      description: "Cold drinks delivered to your doorstep.",
    },
    {
      id: 3,
      image: images.slider.slide3,
      title: "Party Essentials",
      subtitle: "For Every Occasion",
      description: "Stock up for your next gathering.",
    },
    {
      id: 4,
      image: images.slider.slide4,
      title: "Best Prices",
      subtitle: "Wholesale Deals",
      description: "Competitive prices for businesses.",
    },
    {
      id: 5,
      image: images.slider.slide5,
      title: "Best Prices",
      subtitle: "Wholesale Deals",
      description: "Competitive prices for businesses.",
    },
    {
      id: 6,
      image: images.slider.slide6,
      title: "Best Prices",
      subtitle: "Wholesale Deals",
      description: "Competitive prices for businesses.",
    },
    {
      id: 7,
      image: images.slider.slide7,
      title: "Best Prices",
      subtitle: "Wholesale Deals",
      description: "Competitive prices for businesses.",
    },
  ];

  // Fallback images (if local images fail to load)
  const fallbackImages = [
    "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=1200",
    "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1200",
    "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=1200",
    "https://images.unsplash.com/photo-1581006852262-55c3950563db?w=1200",
  ];

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  }; 

  return (
    <div className="relative h-screen max-h-[800px] min-h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? "opacity-100 translate-x-0"
              : index < currentSlide
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
          }`}
        >
          {/* Slide Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = fallbackImages[index];
              }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>

          {/* Slide Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in-up">
                  {slide.title}
                  <span className="text-yellow-300"> {slide.subtitle}</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-8 animate-fade-in-up animation-delay-200">
                  {slide.description}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-400">
                  {isAuthenticated ? (
                    <Link
                      to="/products"
                      className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition transform hover:scale-105"
                    >
                      Shop Now 🛒
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/register"
                        className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition transform hover:scale-105"
                      >
                        Get Started
                      </Link>
                      <Link
                        to="/login"
                        className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition transform hover:scale-105"
                      >
                        Login
                      </Link>
                    </>
                  )}
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-8 mt-12 animate-fade-in-up animation-delay-600">
                  <div>
                    <div className="text-3xl font-bold text-white">50+</div>
                    <div className="text-green-200">Products</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">1000+</div>
                    <div className="text-green-200">Happy Customers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">24/7</div>
                    <div className="text-green-200">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? "w-8 bg-yellow-400"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
