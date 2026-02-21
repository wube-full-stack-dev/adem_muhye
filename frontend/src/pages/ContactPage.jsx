// ContactPage.jsx
import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-green-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="text-xl mt-2">We're here to help</p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  placeholder="+1234567890"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  rows="4"
                  placeholder="How can we help?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                ></textarea>
              </div>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <div className="bg-gray-50 p-8 rounded-xl mb-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-2xl mr-4">📍</span>
                  <div>
                    <h3 className="font-bold">Address</h3>
                    <p className="text-gray-600">
                      123 Business Avenue
                      <br />
                      Nairobi, Kenya
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-4">📞</span>
                  <div>
                    <h3 className="font-bold">Phone</h3>
                    <p className="text-gray-600">+254 700 000 000</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-4">✉️</span>
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p className="text-gray-600">hello@ademapp.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-4">🕒</span>
                  <div>
                    <h3 className="font-bold">Business Hours</h3>
                    <p className="text-gray-600">
                      Mon-Fri: 9am - 6pm
                      <br />
                      Sat: 10am - 2pm
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 h-64 rounded-xl flex items-center justify-center">
              <span className="text-gray-500">📍 Map Location</span>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-bold mb-2">How do I get started?</h3>
              <p className="text-gray-600">
                Simply click Sign Up and follow the 2-minute onboarding process.
                No credit card required.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-bold mb-2">Is there a mobile app?</h3>
              <p className="text-gray-600">
                Currently we offer a mobile-friendly web app, with native apps
                coming soon.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-bold mb-2">Can I track customer credit?</h3>
              <p className="text-gray-600">
                Yes! This is our core feature. You can track who owes you money
                in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
