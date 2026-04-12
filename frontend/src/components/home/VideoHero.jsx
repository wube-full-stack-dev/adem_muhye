import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import heroVideo from "../../assets/videos/hero-bg.mp4";

const fallbackImage =
  "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=1200";

const VideoHero = () => {
  const { isAuthenticated } = useAuth();
  const [videoError, setVideoError] = useState(false);

  // ================= FALLBACK =================
  if (videoError) {
    return (
      <div
        className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${fallbackImage})` }}
      >
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            Your Favorite
            <span className="block text-yellow-400">Beverages</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg mb-6 max-w-xl text-gray-200">
            Premium quality drinks delivered fast to your doorstep
          </p>

          <div className="flex gap-3 flex-wrap justify-center">
            {isAuthenticated ? (
              <Link
                to="/products"
                className="bg-yellow-400 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-yellow-300 transition text-sm sm:text-base"
              >
                Shop Now 🛒
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-yellow-400 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-yellow-300 transition text-sm sm:text-base"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="border border-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition text-sm sm:text-base"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ================= MAIN VIDEO =================
  return (
    <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen overflow-hidden bg-black">
      {/* Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onError={() => setVideoError(true)}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Overlay (stronger on mobile) */}
      <div className="absolute inset-0 bg-black/70 sm:bg-black/60 md:bg-black/50 z-10" />

      {/* Glow effect (premium feel) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-extrabold mb-4 leading-tight">
          Your Favorite
          <span className="block text-yellow-400">Beverages</span>
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 max-w-xl text-gray-200">
          Premium quality drinks delivered fast to your doorstep
        </p>

        {/* Buttons */}
        <div className="flex gap-3 flex-wrap justify-center">
          {isAuthenticated ? (
            <Link
              to="/products"
              className="bg-yellow-400 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-yellow-300 transition transform hover:scale-105 text-sm sm:text-base shadow-lg"
            >
              Shop Now 🛒
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-yellow-400 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-yellow-300 transition transform hover:scale-105 text-sm sm:text-base shadow-lg"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="border border-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition transform hover:scale-105 text-sm sm:text-base"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoHero;
