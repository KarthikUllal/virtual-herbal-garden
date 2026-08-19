import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setProfileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-green-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Main Navbar */}
        <div className="flex items-center justify-between py-4">

          {/* Logo */}
          <NavLink
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
              <span className="text-xl">🌿</span>
            </div>

            <div>
              <h1 className="text-base font-bold text-green-900 sm:text-lg">
                Virtual Herbal Garden
              </h1>

              <p className="hidden text-xs text-green-600 sm:block">
                Explore • Learn • Discover
              </p>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">

            {/* Home */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-green-700"
                    : "text-gray-600 hover:text-green-700"
                }`
              }
            >
              Home
            </NavLink>

            {/* Plants */}
            <NavLink
              to="/plants"
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-green-700"
                    : "text-gray-600 hover:text-green-700"
                }`
              }
            >
              Plants
            </NavLink>

            {/* Garden */}
            <NavLink
              to="/garden"
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-green-700"
                    : "text-gray-600 hover:text-green-700"
                }`
              }
            >
              Garden
            </NavLink>

            {/* Authentication */}
            {isAuthenticated ? (
              <div className="flex items-center gap-6">

                {/* Bookmarks */}
                <NavLink
                  to="/bookmarks"
                  className={({ isActive }) =>
                    `text-sm font-medium transition ${
                      isActive
                        ? "text-green-700"
                        : "text-gray-600 hover:text-green-700"
                    }`
                  }
                >
                  Bookmarks
                </NavLink>

                {/* Profile Dropdown */}
                <div className="relative">

                  <button
                    type="button"
                    onClick={() => setProfileOpen((prev) => !prev)}
                    className="flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-semibold text-green-900 transition hover:bg-green-50"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>

                    <span>{user?.name}</span>

                    <span
                      className={`text-xs transition-transform ${
                        profileOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>

                  {/* Dropdown */}
                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-3 w-48 overflow-hidden rounded-2xl border border-green-100 bg-white shadow-lg">

                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                      >
                        <span>👤</span>
                        My Profile
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          setProfileOpen(false);
                          logout();
                        }}
                        className="flex w-full items-center gap-3 border-t border-green-50 px-4 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <span>🚪</span>
                        Logout
                      </button>

                    </div>
                  )}

                </div>

              </div>
            ) : (
              <div className="flex items-center gap-3">

                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "bg-green-50 text-green-700"
                        : "text-green-800 hover:bg-green-50"
                    }`
                  }
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="rounded-full bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
                >
                  Register
                </NavLink>

              </div>
            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-green-200 text-green-800 transition hover:bg-green-50 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <span className="text-xl">✕</span>
            ) : (
              <span className="text-xl">☰</span>
            )}
          </button>

        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="border-t border-green-100 py-4 md:hidden">

            <div className="flex flex-col gap-2">

              {/* Home */}
              <NavLink
                to="/"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                  }`
                }
              >
                Home
              </NavLink>

              {/* Plants */}
              <NavLink
                to="/plants"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                  }`
                }
              >
                Plants
              </NavLink>

              {/* Garden */}
              <NavLink
                to="/garden"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                  }`
                }
              >
                Garden
              </NavLink>

              {isAuthenticated ? (
                <>
                  {/* Bookmarks */}
                  <NavLink
                    to="/bookmarks"
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-3 text-sm font-medium transition ${
                        isActive
                          ? "bg-green-50 text-green-700"
                          : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                      }`
                    }
                  >
                    🔖 Bookmarks
                  </NavLink>

                  {/* Mobile Profile */}
                  <Link
                    to="/profile"
                    onClick={closeMobileMenu}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-green-50 hover:text-green-700"
                  >
                    👤 My Profile
                  </Link>

                  {/* Mobile Logout */}
                  <button
                    type="button"
                    onClick={() => {
                      closeMobileMenu();
                      logout();
                    }}
                    className="rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600"
                  >
                    🚪 Logout
                  </button>
                </>
              ) : (
                <>
                  {/* Login */}
                  <NavLink
                    to="/login"
                    onClick={closeMobileMenu}
                    className="rounded-xl px-4 py-3 text-sm font-semibold text-green-800 transition hover:bg-green-50"
                  >
                    Login
                  </NavLink>

                  {/* Register */}
                  <NavLink
                    to="/register"
                    onClick={closeMobileMenu}
                    className="rounded-xl bg-green-700 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-green-800"
                  >
                    Register
                  </NavLink>
                </>
              )}

            </div>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;