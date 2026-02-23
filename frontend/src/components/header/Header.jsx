import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

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
  /* Shared Link Style */
  /* ============================= */
  const linkStyle =
    "block md:inline-block py-2 md:py-0 text-gray-700 hover:text-green-600 transition-colors";

  /* ============================= */
  /* Components */
  /* ============================= */

  const PublicLinks = ({ mobile, closeMenu }) => (
    <>
      <Link to="/" className={linkStyle} onClick={closeMenu}>
        Home
      </Link>
      <Link to="/products" className={linkStyle} onClick={closeMenu}>
        Products
      </Link>
      <Link to="/about" className={linkStyle} onClick={closeMenu}>
        About
      </Link>
      <Link to="/contact" className={linkStyle} onClick={closeMenu}>
        Contact
      </Link>
    </>
  );

  const RoleLinks = ({ closeMenu }) => {
    if (!isAuthenticated) return null;

    switch (user?.role) {
      case "admin":
        return (
          <>
            <Link
              to="/admin/dashboard"
              className={linkStyle}
              onClick={closeMenu}
            >
              Dashboard
            </Link>
            <Link to="/admin/users" className={linkStyle} onClick={closeMenu}>
              Users
            </Link>
            <Link to="/admin/addsale" className={linkStyle} onClick={closeMenu}>
              Add Sale
            </Link>
            <Link
              to="/admin/viewsale"
              className={linkStyle}
              onClick={closeMenu}
            >
              Sales
            </Link>
          </>
        );

      case "manager":
        return (
          <>
            <Link
              to="/manager/dashboard"
              className={linkStyle}
              onClick={closeMenu}
            >
              Dashboard
            </Link>
            <Link to="/admin/users" className={linkStyle} onClick={closeMenu}>
              Users
            </Link>
            <Link
              to="/admin/viewsale"
              className={linkStyle}
              onClick={closeMenu}
            >
              Sales
            </Link>
          </>
        );

      case "staff":
      default:
        return (
          <>
            <Link
              to="/customer/dashboard"
              className={linkStyle}
              onClick={closeMenu}
            >
              Dashboard
            </Link>
            <Link to="/products" className={linkStyle} onClick={closeMenu}>
              Products
            </Link>
            <Link to="/myorders" className={linkStyle} onClick={closeMenu}>
              My Orders
            </Link>
          </>
        );
    }
  };

  const UserInfo = ({ mobile }) => (
    <div
      className={`flex items-center gap-3 ${
        mobile ? "justify-between py-2" : "border-l pl-4"
      }`}
    >
      {/* Avatar */}
      <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-sm">
        {getInitials()}
      </div>

      {/* Info */}
      {!mobile && (
        <div className="text-sm">
          <div className="font-medium text-gray-700">
            {user?.full_name || user?.username}
          </div>
          <div className="text-xs text-gray-500">{formatRole(user?.role)}</div>
        </div>
      )}
    </div>
  );

  /* ============================= */
  /* Render */
  /* ============================= */

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-green-600 tracking-wide"
          >
            AdemApp
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <PublicLinks />
            {isAuthenticated && <RoleLinks />}
            {isAuthenticated && <UserInfo />}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Toggle Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* ================= Mobile Menu ================= */}
      <div
        ref={menuRef}
        className={`md:hidden bg-white border-t overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 space-y-3">
          <PublicLinks closeMenu={() => setIsMenuOpen(false)} />

          {isAuthenticated && (
            <>
              <RoleLinks closeMenu={() => setIsMenuOpen(false)} />

              <div className="border-t pt-3">
                <UserInfo mobile />

                <button
                  onClick={handleLogout}
                  className="w-full mt-3 bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Logout
                </button>
              </div>
            </>
          )}

          {!isAuthenticated && (
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
