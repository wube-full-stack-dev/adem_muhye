import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <nav className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex justify-between">
          <Link to="/" className="font-bold">
            🍹 AdemApp
          </Link>
          <div>
            <Link to="/login" className="mr-4">
              Login
            </Link>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </nav>
    );
  }

  // Role-based navigation
  const getNavLinks = () => {
    switch (user?.role) {
      case "admin":
        return (
          <>
            <Link to="/admin/dashboard" className="mr-4">
              📊 Dashboard
            </Link>
            <Link to="/admin/users" className="mr-4">
              👥 Users
            </Link>
            <Link to="/addsale" className="mr-4">
              ➕ Add Sale
            </Link>
            <Link to="/viewsale">📋 Sales</Link>
          </>
        );

      case "manager":
        return (
          <>
            <Link to="/manager/dashboard" className="mr-4">
              📊 Dashboard
            </Link>
            <Link to="/admin/users" className="mr-4">
              👥 View Users
            </Link>
            <Link to="/viewsale" className="mr-4">
              📋 Sales
            </Link>
            <Link to="/addsale">➕ Add Sale</Link>
          </>
        );

      case "staff":
      default:
        return (
          <>
            <Link to="/customer/dashboard" className="mr-4">
              🏠 Dashboard
            </Link>
            <Link to="/products" className="mr-4">
              🛍️ Products
            </Link>
            <Link to="/addsale" className="mr-4">
              ➕ Order
            </Link>
            <Link to="/viewsale">📋 My Orders</Link>
          </>
        );
    }
  };

  return (
    <nav className="bg-green-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">
          🍹 AdemApp
        </Link>

        <div className="flex items-center">
          <div className="mr-6">{getNavLinks()}</div>

          <div className="flex items-center border-l pl-4">
            <span className="mr-3 text-sm">
              {user?.full_name || user?.username}
              <span className="ml-2 px-2 py-1 bg-green-700 rounded text-xs">
                {user?.role}
              </span>
            </span>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
