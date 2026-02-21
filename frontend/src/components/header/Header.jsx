import React from 'react'

function Header() {
  return (
    <div>
      <nav className="bg-white shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-2xl font-bold text-green-600">AdemApp</span>
              <span className="ml-2 text-sm text-gray-500">
                Beverage Distributor
              </span>
            </div>

            {/* Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-700 hover:text-green-600">
                Home
              </a>
              <a href="/about" className="text-gray-700 hover:text-green-600">
                About
              </a>
              <a href="/contact" className="text-gray-700 hover:text-green-600">
                Contact
              </a>
              <a
                href="/login"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header
