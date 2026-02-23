import React from "react";
import { Link } from "react-router-dom";

function Err() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="inline-block p-6 bg-red-100 rounded-full">
            <span className="text-6xl">🚫</span>
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-8xl font-black text-gray-800 mb-4">404</h1>

        {/* Error Message */}
        <h2 className="text-3xl font-bold text-gray-700 mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          You used an unrelated URL link. Please follow our system rules and
          guidance to navigate properly.
        </p>

        {/* Suggestions */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 max-w-md mx-auto text-left">
          <p className="text-sm text-yellow-700">
            <span className="font-bold">💡 Suggestion:</span> Check the URL or
            use the navigation menu to find what you're looking for.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="space-x-4">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            🏠 Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-block px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md"
          >
            ⬅️ Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Err;
