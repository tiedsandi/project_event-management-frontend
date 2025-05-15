import { getAuthToken, getTokenDuration } from "../../utils/auth";

import Header from "../Header";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

export default function MainLayout() {
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
    <div className="p-4 mx-auto max-w-[1440px]">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
