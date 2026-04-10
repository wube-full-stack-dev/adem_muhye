import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import heroVideo from "../../assets/videos/hero-bg.mp4";

// Fallback image if video fails
const fallbackImage =
  "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=1200";

const VideoHero = () => {
  const { isAuthenticated } = useAuth();
  const [videoError, setVideoError] = useState(false);

  if (videoError) {
    return (
      <div
        className="relative h-screen max-h-[800px] min-h-[600px] bg-cover bg-center"
        style={{ backgroundImage: `url(${fallbackImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Your Favorite
            <span className="text-yellow-400"> Beverages</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Premium quality drinks delivered fast to your doorstep
          </p>
          <div className="flex gap-4">
            {isAuthenticated ? (
              <Link
                to="/products"
                className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
              >
                Shop Now 🛒
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition"
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

  return (
    <div className="relative h-screen max-h-[800px] min-h-[600px] overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="min-w-full min-h-full w-auto h-auto object-cover"
          style={{
            minWidth: "100%",
            minHeight: "100%",
            width: "auto",
            height: "auto",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          onError={() => setVideoError(true)}
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
          Your Favorite
          <span className="text-yellow-400"> Beverages</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl animate-fade-in-up animation-delay-200">
          Premium quality drinks delivered fast to your doorstep
        </p>
        <div className="flex gap-4 animate-fade-in-up animation-delay-400">
          {isAuthenticated ? (
            <Link
              to="/products"
              className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition transform hover:scale-105"
            >
              Shop Now 🛒
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition transform hover:scale-105"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition transform hover:scale-105"
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
