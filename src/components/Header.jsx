import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { getAuthToken } from "../utils/auth";

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getAuthToken();
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setIsLogin(true);
      try {
        setUser(JSON.parse(storedUser));
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        console.error("Invalid user data in localStorage");
      }
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("expiration");
    setIsLogin(false);
    setMenuOpen(false);
    window.location.reload();
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold border-b-2 border-blue-600"
      : "text-gray-600 hover:text-blue-600";

  return (
    <header className="border-b border-gray-300">
      <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl">
        <Link to="/">
          <img src="/Ement-full.svg" alt="logo" className="w-28" />
        </Link>

        <nav className="hidden gap-6 font-medium md:flex">
          <NavLink to="/events" className={navLinkStyle} end>
            Events
          </NavLink>
          {isLogin && (
            <NavLink to="/my-events" className={navLinkStyle}>
              My Events
            </NavLink>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {isLogin ? (
            <>
              <span className="text-gray-700">
                Hello, <strong>{user?.name}</strong>
              </span>
              <button
                onClick={logoutHandler}
                className="font-medium text-red-600 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Login
            </Link>
          )}
        </div>

        <button className="md:hidden" onClick={toggleMenu}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="flex justify-end px-4 pb-4 md:hidden">
          <div className="space-y-3 text-right">
            <NavLink to="/events" className={navLinkStyle} onClick={toggleMenu}>
              Events
            </NavLink>
            {isLogin && (
              <NavLink
                to="/my-events"
                className={navLinkStyle}
                onClick={toggleMenu}
              >
                My Events
              </NavLink>
            )}
            {isLogin ? (
              <>
                <p className="text-gray-700">
                  Hello, <strong>{user?.name}</strong>
                </p>
                <button
                  onClick={logoutHandler}
                  className="font-medium text-red-600 hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={toggleMenu}
                className="font-medium text-blue-600 hover:underline"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
