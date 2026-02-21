// admin.jsx - Login Page
import React from "react";

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-2">🥤</div>
          <h1 className="text-3xl font-bold text-gray-900">AdemApp</h1>
          <p className="text-gray-600">Beverage Distribution System</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Welcome Back</h2>

          <form>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Email or userName</label>
              <input
                type="email"
                placeholder="admin@ademapp.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
              />
            </div>

            <div className="flex items-center justify-between mb-6">
            
            
            </div>

            <button className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700">
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a href="/dashboard" className="text-green-600 hover:underline">
                dash
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Need help? Contact support@ademapp.com
        </p>
      </div>
    </div>
  );
};

export default AdminPage;
