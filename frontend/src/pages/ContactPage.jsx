import React, { useState } from "react";
import { Link } from "react-router-dom";
import { l1, l2, l3 } from '../assets/images/location'

const ContactPage = () => {
  const [copied, setCopied] = useState(null);

  // Company information
  const companyInfo = {
    name: "Adem Coca Beverages",
    address: "Kemise, Ethiopia",
    city: "Kemise",
    country: "Ethiopia",
    email: "info@ademcoca.com",
    phone: "+251 920303061",
    whatsapp: "+251920303061",
    telegram: "@adem_coca",
    hours: "Mon - Sat: 8:00 AM - 8:00 PM",
    founded: "2020",
  };

  // Town/City images
const townImages = [
  {
    url: l1,
    caption: "Kemise City Center",
  },
  {
    url: l2,
    caption: "Main Market",
  },
  {
    url: l3,
    caption: "Town View",
  },
];

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  // Kemise Google Maps embed URL
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15694.482951063569!2d39.8680556!3d10.7166667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1647f3a707c60e43%3A0x1bc270af3a20c9e1!2sKemise%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus";

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            📍 Visit Our Location
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find us in Kemise - we'd love to meet you!
          </p>
        </div>

        {/* Town/City Image Gallery */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="mr-3">🏙️</span> Our Beautiful City
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {townImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <img
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1573481081776-3c3813e5f25e?w=800";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm font-medium">
                      {image.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Map */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <span className="mr-3">🗺️</span> Our Location
                </h2>
              </div>

              <div className="p-6">
                {/* Map Container */}
                <div className="rounded-xl overflow-hidden shadow-lg mb-4 h-80">
                  <iframe
                    title="Kemise Location"
                    src={mapSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  ></iframe>
                </div>

                {/* Address Card */}
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">📍</span>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Address</h3>
                      <p className="text-gray-700 mb-2">
                        {companyInfo.address}
                      </p>
                      <p className="text-sm text-gray-600">
                        {companyInfo.city}, {companyInfo.country}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Distance/Directions Button */}
                <div className="mt-4 flex gap-3">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=Kemise,Ethiopia`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-600 text-white text-center py-3 rounded-xl hover:bg-green-700 transition font-medium flex items-center justify-center"
                  >
                    <span className="mr-2">🚗</span> Get Directions
                  </a>
                  <button
                    onClick={() =>
                      copyToClipboard(companyInfo.address, "address")
                    }
                    className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
                  >
                    {copied === "address" ? "✅ Copied!" : "📋 Copy"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Info & Business Details */}
          <div className="space-y-6">
            {/* Business Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-4">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <span className="mr-3">🏢</span> Business Information
                </h2>
              </div>
              <div className="p-6">
                <div className="grid gap-4">
                  {/* Business Name */}
                  <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                    <span className="text-2xl w-10">🏪</span>
                    <div className="ml-3">
                      <p className="text-sm text-gray-600">Business Name</p>
                      <p className="font-semibold text-gray-900">
                        {companyInfo.name}
                      </p>
                    </div>
                  </div>

                  {/* Founded */}
                  <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                    <span className="text-2xl w-10">📅</span>
                    <div className="ml-3">
                      <p className="text-sm text-gray-600">Founded</p>
                      <p className="font-semibold text-gray-900">
                        {companyInfo.founded}
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                    <span className="text-2xl w-10">⏰</span>
                    <div className="ml-3">
                      <p className="text-sm text-gray-600">Business Hours</p>
                      <p className="font-semibold text-gray-900">
                        {companyInfo.hours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Cards */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <span className="mr-3">📞</span> Contact Details
                </h2>
              </div>
              <div className="p-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">📧</span>
                      <button
                        onClick={() =>
                          copyToClipboard(companyInfo.email, "email")
                        }
                        className="text-xs text-gray-500 hover:text-green-600"
                      >
                        {copied === "email" ? "✅" : "Copy"}
                      </button>
                    </div>
                    <p className="text-xs text-gray-600">Email</p>
                    <p className="font-medium text-sm truncate">
                      {companyInfo.email}
                    </p>
                  </div>

                  {/* Phone */}
                  <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">📞</span>
                      <button
                        onClick={() =>
                          copyToClipboard(companyInfo.phone, "phone")
                        }
                        className="text-xs text-gray-500 hover:text-green-600"
                      >
                        {copied === "phone" ? "✅" : "Copy"}
                      </button>
                    </div>
                    <p className="text-xs text-gray-600">Phone</p>
                    <p className="font-medium text-sm">{companyInfo.phone}</p>
                  </div>

                  {/* WhatsApp */}
                  <div className="bg-green-50 rounded-xl p-4 hover:shadow-md transition">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">💬</span>
                      <a
                        href={`https://wa.me/${companyInfo.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-green-600 text-white px-2 py-1 rounded-full hover:bg-green-700"
                      >
                        Chat
                      </a>
                    </div>
                    <p className="text-xs text-green-600">WhatsApp</p>
                    <p className="font-medium text-sm">
                      {companyInfo.whatsapp}
                    </p>
                  </div>

                  {/* Telegram */}
                  <div className="bg-blue-50 rounded-xl p-4 hover:shadow-md transition">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">✈️</span>
                      <a
                        href={`https://t.me/${companyInfo.telegram.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full hover:bg-blue-700"
                      >
                        Message
                      </a>
                    </div>
                    <p className="text-xs text-blue-600">Telegram</p>
                    <p className="font-medium text-sm">
                      {companyInfo.telegram}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nearby Landmarks */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">📍</span> Nearby Landmarks
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="w-8">🏛️</span>
                  <span className="text-gray-700">
                    Kemise Market (5 min walk)
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-8">🛍️</span>
                  <span className="text-gray-700">Main Square (10 min)</span>
                </div>
                <div className="flex items-center">
                  <span className="w-8">🏨</span>
                  <span className="text-gray-700">Kemise Hotel (15 min)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Legend */}
        <div className="mt-8 bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-sm text-gray-600 flex items-center justify-center">
            <span className="text-xl mr-2">📍</span>
            Click "Get Directions" for turn-by-turn navigation from your
            location
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
