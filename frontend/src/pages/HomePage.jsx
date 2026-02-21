import React,{ useState } from "react";


export default function HomePage() {
  

  return (
    <div>
      {/* Hero Section */}
      <div className="pt-24 pb-16 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Digitize Your{" "}
                <span className="text-green-600">Beverage Distribution</span>{" "}
                Business
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Track sales, manage credit, control inventory in real-time. No
                more paper notebooks or lost money.
              </p>
              <div className="flex space-x-4">
                <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700">
                  Get Started Free
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-50">
                  Watch Demo
                </button>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                No credit card required • 14-day free trial
              </p>
            </div>

            {/* Right Image Placeholder */}
            <div className="bg-green-100 rounded-2xl p-8 text-center">
              <div className="text-9xl mb-4">🥤</div>
              <p className="text-gray-600">Dashboard Preview</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted By */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 mb-8">
            Trusted by 50+ beverage distributors
          </p>
          <div className="flex justify-center space-x-12">
            <div className="text-2xl font-bold text-gray-400">
              🥤 Distributor A
            </div>
            <div className="text-2xl font-bold text-gray-400">
              💧 Distributor B
            </div>
            <div className="text-2xl font-bold text-gray-400">
              🧃 Distributor C
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Real-time Sales</h3>
              <p className="text-gray-600">
                See daily revenue at a glance. Track every transaction
                instantly.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Credit Management</h3>
              <p className="text-gray-600">
                Never lose money again. Track who owes you automatically.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-semibold mb-2">Inventory Control</h3>
              <p className="text-gray-600">
                Know exactly what's in stock. Get low stock alerts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
