import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { images } from "../../constants/images";
import { useAuth } from "../../context/AuthContext";

const HeroSection = () => {
  const { isAuthenticated } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

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
  ];

  const fallbackImages = [
    "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=1200",
    "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1200",
    "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=1200",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-full"
          }`}
        >
          {/* Background */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt="slide"
              className="w-full h-full object-cover scale-105"
              onError={(e) => (e.target.src = fallbackImages[index])}
            />

            {/* Stronger overlay for mobile readability */}
            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="w-full px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
              <div className="max-w-xl">
                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                  {slide.title}
                  <span className="block text-yellow-400">
                    {slide.subtitle}
                  </span>
                </h1>

                {/* Description */}
                <p className="text-sm sm:text-base md:text-lg text-gray-200 mt-4 mb-6">
                  {slide.description}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-3">
                  {isAuthenticated ? (
                    <Link
                      to="/products"
                      className="bg-yellow-400 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-yellow-300 transition transform hover:scale-105 text-sm sm:text-base"
                    >
                      Shop Now 🛒
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/register"
                        className="bg-yellow-400 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-yellow-300 transition transform hover:scale-105 text-sm sm:text-base"
                      >
                        Get Started
                      </Link>
                      <Link
                        to="/login"
                        className="border border-white text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition text-sm sm:text-base"
                      >
                        Login
                      </Link>
                    </>
                  )}
                </div>

                {/* Stats (hidden on very small screens) */}
                <div className="hidden sm:flex gap-6 mt-8">
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-white">
                      50+
                    </div>
                    <div className="text-green-300 text-sm">Products</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-white">
                      1000+
                    </div>
                    <div className="text-green-300 text-sm">Customers</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-white">
                      24/7
                    </div>
                    <div className="text-green-300 text-sm">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation (hidden on mobile for clean UI) */}
      <div className="hidden sm:block">
        <button
          onClick={() =>
            setCurrentSlide((prev) =>
              prev === 0 ? slides.length - 1 : prev - 1,
            )
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur"
        >
          ‹
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur"
        >
          ›
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? "w-6 h-2 bg-yellow-400"
                : "w-2 h-2 bg-white/50"
            } rounded-full`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
