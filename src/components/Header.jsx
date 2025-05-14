import { Link, NavLink } from "react-router-dom";

import { useState } from "react";

export default function Header() {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));

  // const userData = JSON.parse(localStorage.getItem("user") || "{}");
  // const isAdmin = userData.role === "admin";

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    // navigate("/login");
  };
  return (
    <header className="flex items-center justify-between p-4 border-gray-400 rounded-4xl border-1">
      <Link to={"/"}>
        <img src="Ement-full.svg" alt="logo" className="w-28" />
      </Link>
      <nav className="flex gap-6 font-medium">
        <NavLink
          to={"/event"}
          // className={({ isActive }) =>
          //   (isActive ? "text-gray-500" : undefined) + " hover:text-gray-500"
          // }
          // className={({ isActive }) =>
          //   `${isActive ? "text-gray-500" : ""} hover:text-gray-500`
          // }
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }
        >
          Events
        </NavLink>
        <NavLink
          to={"/my-events"}
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }
        >
          My Events
        </NavLink>
      </nav>

      {isLogin ? (
        <button onClick={logoutHandler} className="font-medium text-red-600">
          Logout
        </button>
      ) : (
        <Link to={"/login"} className="font-medium text-blue-600">
          Login
        </Link>
      )}
    </header>
  );
}
