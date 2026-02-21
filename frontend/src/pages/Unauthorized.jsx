import React from "react";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center border border-gray-100">
        {/* Icon / Visual */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
          <span className="text-4xl text-red-600">🛡️</span>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
          Admin Access Required
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Sorry, this area is restricted to administrators only. Please contact
          your manager if you think this is a mistake.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => window.history.back()}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-200 shadow-md shadow-indigo-100"
          >
            Go Back
          </button>
          <a
            href="/support"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Request Permissions
          </a>
        </div>
      </div>

      {/* Subtle Footer */}
      <p className="mt-8 text-sm text-gray-400">Error Code: 403 Forbidden</p>
    </div>
  );
};

export default Unauthorized;
