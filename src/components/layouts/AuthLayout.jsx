import { getAuthToken, getTokenDuration } from "../../utils/auth";

import { Outlet } from "react-router-dom";
import { useEffect } from "react";

export default function AuthLayout() {
  const token = getAuthToken();
  useEffect(() => {
    if (!token) return;

    const tokenDuration = getTokenDuration();

    if (tokenDuration <= 0) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("expiration");
      window.location.reload();
      return;
    }

    const logoutTimer = setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("expiration");
      window.location.reload();
    }, tokenDuration);

    return () => clearTimeout(logoutTimer);
  }, [token]);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute inset-0">
        <img
          src="/bg-auth.jpg"
          alt="Background"
          className="object-cover w-full h-full opacity-80"
        />
      </div>
      <main className="z-10 w-full max-w-md p-5 bg-white rounded-lg shadow-lg">
        <Outlet />
      </main>
    </div>
  );
}
