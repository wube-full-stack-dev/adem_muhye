import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const OrderPage = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(null);

  // Contact information
  const contacts = {
    owner: "Adem Coca",
    email: "adem.coca@example.com",
    phone: "+251 920303061",
    telegram: "@adem_coca",
    whatsapp: "+251 920303061",
    imo: "adem.coca.imo",
    address: "wello  kemisse, Ethiopia",
    businessHours: "Mon-Sat: 8:00 AM - 8:00 PM",
  };

  // Payment methods (temporary display)
  const paymentMethods = [
    { name: "Telebirr", icon: "📱", color: "bg-purple-100 text-purple-700" },
    { name: "CBE Birr", icon: "💳", color: "bg-blue-100 text-blue-700" },
    {
      name: "Cash on Delivery",
      icon: "💵",
      color: "bg-green-100 text-green-700",
    },
    {
      name: "Bank Transfer",
      icon: "🏦",
      color: "bg-yellow-100 text-yellow-700",
    },
  ];

  // Sample order summary
  const [orderSummary] = useState({
    items: 3,
    total: 1250,
    delivery: "Free",
  });

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            📞 Contact & Order
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with us to place your order or ask any questions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Owner Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <span className="mr-3">👤</span> Business Owner
                </h2>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl">
                    👨‍💼
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {contacts.owner}
                    </h3>
                    <p className="text-gray-600">📍 {contacts.address}</p>
                  </div>
                </div>

                {/* Contact Grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">📧</span>
                      <button
                        onClick={() => copyToClipboard(contacts.email, "email")}
                        className="text-sm text-gray-500 hover:text-green-600"
                      >
                        {copied === "email" ? "✅ Copied!" : "Copy"}
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium truncate">{contacts.email}</p>
                  </div>

                  {/* Phone */}
                  <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">📞</span>
                      <button
                        onClick={() => copyToClipboard(contacts.phone, "phone")}
                        className="text-sm text-gray-500 hover:text-green-600"
                      >
                        {copied === "phone" ? "✅ Copied!" : "Copy"}
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{contacts.phone}</p>
                  </div>

                  {/* Telegram */}
                  <div className="bg-blue-50 rounded-xl p-4 hover:shadow-md transition">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">✈️</span>
                      <a
                        href={`https://t.me/${contacts.telegram.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700"
                      >
                        Message
                      </a>
                    </div>
                    <p className="text-sm text-blue-600">Telegram</p>
                    <p className="font-medium">{contacts.telegram}</p>
                  </div>

                  {/* WhatsApp */}
                  <div className="bg-green-50 rounded-xl p-4 hover:shadow-md transition">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">💬</span>
                      <a
                        href={`https://wa.me/${contacts.whatsapp.replace(/\s/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700"
                      >
                        Chat
                      </a>
                    </div>
                    <p className="text-sm text-green-600">WhatsApp</p>
                    <p className="font-medium">{contacts.whatsapp}</p>
                  </div>

                  {/* IMO */}
                  <div className="bg-purple-50 rounded-xl p-4 hover:shadow-md transition sm:col-span-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">🎮</span>
                      <span className="text-sm text-purple-600 font-medium">
                        IMO Available
                      </span>
                    </div>
                    <p className="text-sm text-purple-600">IMO ID</p>
                    <p className="font-medium">{contacts.imo}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-3">⏰</span> Business Hours
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium text-gray-800">
                    {contacts.businessHours}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Available for orders & inquiries
                  </p>
                </div>
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                  Open Now
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Order & Payment */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 sticky top-24">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-4">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <span className="mr-3">🛒</span> Your Order
                </h2>
              </div>

              <div className="p-6">
                {user ? (
                  <>
                    <div className="mb-6">
                      <p className="text-gray-600 mb-2">Customer</p>
                      <p className="font-semibold text-lg">
                        {user.full_name || user.username}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>

                    <div className="border-t border-b border-gray-100 py-4 mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Items:</span>
                        <span className="font-semibold">
                          {orderSummary.items}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-semibold">
                          ETB {orderSummary.total}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery:</span>
                        <span className="text-green-600 font-semibold">
                          {orderSummary.delivery}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between mb-6">
                      <span className="text-lg font-bold">Total:</span>
                      <span className="text-2xl font-bold text-green-600">
                        ETB {orderSummary.total}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-600 mb-4">
                      Login to place your order
                    </p>
                    <Link
                      to="/login"
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 inline-block"
                    >
                      Login Now
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">💳</span> Payment Methods
              </h3>
              <div className="space-y-3">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-3 rounded-xl ${method.color}`}
                  >
                    <span className="text-2xl mr-3">{method.icon}</span>
                    <span className="font-medium">{method.name}</span>
                    <span className="ml-auto text-sm opacity-75">
                      (Coming Soon)
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">
                * For now, orders are confirmed via contact
              </p>
            </div>

            {/* Quick Action */}
            <div className="bg-green-50 rounded-2xl p-6 text-center">
              <p className="text-green-800 mb-3">📱 Prefer to order via app?</p>
              <p className="text-sm text-gray-600 mb-4">
                Contact us directly on Telegram or WhatsApp for faster response
              </p>
              <div className="flex justify-center space-x-3">
                <a
                  href={`https://t.me/${contacts.telegram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm flex items-center"
                >
                  <span className="mr-2">✈️</span> Telegram
                </a>
                <a
                  href={`https://wa.me/${contacts.whatsapp.replace(/\s/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm flex items-center"
                >
                  <span className="mr-2">💬</span> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Temporary Notice */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
          <p className="text-yellow-800 font-medium mb-2">
            🔄 Temporary Order System
          </p>
          <p className="text-sm text-gray-600">
            Online payment integration coming soon. For now, please contact us
            directly via Telegram, WhatsApp, or phone to place your order.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
