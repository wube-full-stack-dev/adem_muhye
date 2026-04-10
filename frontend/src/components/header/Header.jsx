import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  /* ============================= */
  /* Handle Scroll Effect */
  /* ============================= */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ============================= */
  /* Logout */
  /* ============================= */
  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/login");
  };

  /* ============================= */
  /* Close on Click Outside */
  /* ============================= */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  /* ============================= */
  /* Close on ESC Key */
  /* ============================= */
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  /* ============================= */
  /* Avatar Generator */
  /* ============================= */
  const getInitials = () => {
    if (!user) return "U";
    const name = user.full_name || user.username || "";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  /* ============================= */
  /* Role Display Cleaner */
  /* ============================= */
  const formatRole = (role) => {
    if (!role) return "";
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  /* ============================= */
  /* Responsive Link Classes - UPDATED for dark/glass theme */
  /* ============================= */
  const desktopLinkStyle =
    "text-white/80 hover:text-yellow-400 transition-colors text-sm lg:text-base whitespace-nowrap";
  const mobileLinkStyle =
    "block py-3 px-2 text-gray-800 hover:text-green-600 hover:bg-gray-100 rounded-lg transition-colors";

  /* ============================= */
  /* Components */
  /* ============================= */

  const PublicLinks = ({ mobile, closeMenu }) => (
    <>
      <Link
        to="/"
        className={mobile ? mobileLinkStyle : desktopLinkStyle}
        onClick={closeMenu}
      >
        Home
      </Link>
      <Link
        to="/products"
        className={mobile ? mobileLinkStyle : desktopLinkStyle}
        onClick={closeMenu}
      >
        Products
      </Link>
      <Link
        to="/about"
        className={mobile ? mobileLinkStyle : desktopLinkStyle}
        onClick={closeMenu}
      >
        About
      </Link>
      <Link
        to="/contact"
        className={mobile ? mobileLinkStyle : desktopLinkStyle}
        onClick={closeMenu}
      >
        Contact
      </Link>
    </>
  );

  const RoleLinks = ({ mobile, closeMenu }) => {
    if (!isAuthenticated) return null;

    const style = mobile ? mobileLinkStyle : desktopLinkStyle;

    switch (user?.role) {
      case "admin":
        return (
          <>
            <Link to="/admin/dashboard" className={style} onClick={closeMenu}>
              Dashboard
            </Link>
            <Link to="/admin/users" className={style} onClick={closeMenu}>
              Users
            </Link>
            <Link to="/admin/addsale" className={style} onClick={closeMenu}>
              Add Sale
            </Link>
            <Link to="/admin/viewsale" className={style} onClick={closeMenu}>
              Sales
            </Link>
          </>
        );

      case "manager":
        return (
          <>
            <Link to="/manager/dashboard" className={style} onClick={closeMenu}>
              Dashboard
            </Link>
            <Link to="/admin/users" className={style} onClick={closeMenu}>
              Users
            </Link>
            <Link to="/admin/viewsale" className={style} onClick={closeMenu}>
              Sales
            </Link>
            <Link to="/admin/addsale" className={style} onClick={closeMenu}>
              Add Sale
            </Link>
          </>
        );

      case "staff":
      default:
        return (
          <>
            <Link
              to="/customer/dashboard"
              className={style}
              onClick={closeMenu}
            >
              Dashboard
            </Link>
            <Link to="/products" className={style} onClick={closeMenu}>
              Products
            </Link>
            <Link to="/myorders" className={style} onClick={closeMenu}>
              My Orders
            </Link>
          </>
        );
    }
  };

  const UserInfo = ({ mobile }) => (
    <div
      className={`flex items-center gap-3 ${
        mobile ? "justify-between py-3 bg-gray-50 rounded-lg px-2" : ""
      }`}
    >
      {/* Avatar */}
      <div className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold text-sm shadow-sm">
        {getInitials()}
      </div>

      {/* Info */}
      <div className="text-sm flex-1">
        <div className="font-medium text-white">
          {user?.full_name || user?.username}
        </div>
        <div className="text-xs text-gray-300">{formatRole(user?.role)}</div>
      </div>
    </div>
  );

  /* ============================= */
  /* Render */
  /* ============================= */

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold text-yellow-400 tracking-wide hover:text-yellow-300 transition"
          >
            Adem Coca
          </Link>

          {/* Desktop Navigation - Hidden on Mobile */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <PublicLinks />
            {isAuthenticated && <RoleLinks />}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <UserInfo />
                <button
                  onClick={handleLogout}
                  className="bg-red-500/80 backdrop-blur-sm hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition shadow-sm hover:shadow"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-green-600/80 backdrop-blur-sm hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm transition shadow-sm hover:shadow"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile: Show on Tablet and below */}
          <div className="hidden sm:flex lg:hidden items-center gap-4">
            {isAuthenticated ? (
              <>
                <UserInfo />
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg text-sm transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:flex lg:hidden p-2 rounded-lg hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ================= Mobile Menu ================= */}
      <div
        ref={menuRef}
        className={`lg:hidden fixed inset-x-0 bg-white shadow-lg transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        }`}
        style={{
          top: "64px",
          maxHeight: "calc(100vh - 64px)",
          overflowY: "auto",
        }}
      >
        <div className="px-4 py-6 space-y-4">
          {/* Public Links */}
          <div className="space-y-1">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2">
              Navigation
            </h3>
            <PublicLinks mobile closeMenu={() => setIsMenuOpen(false)} />
          </div>

          {isAuthenticated && (
            <>
              {/* Role-based Links */}
              <div className="space-y-1 pt-2 border-t border-gray-100">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2">
                  Account
                </h3>
                <RoleLinks mobile closeMenu={() => setIsMenuOpen(false)} />
              </div>

              {/* User Info & Logout */}
              <div className="pt-4 border-t border-gray-200">
                <UserInfo mobile />
                <button
                  onClick={handleLogout}
                  className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg text-sm font-medium transition"
                >
                  Logout
                </button>
              </div>
            </>
          )}

          {!isAuthenticated && (
            <div className="pt-4">
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center mt-2 border border-green-600 text-green-600 hover:bg-green-50 px-4 py-3 rounded-lg text-sm font-medium transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Tablet+ Navigation (Hidden on Mobile) */}
      <div className="hidden sm:block lg:hidden bg-white/10 backdrop-blur-md border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <PublicLinks />
            {isAuthenticated && <RoleLinks />}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
