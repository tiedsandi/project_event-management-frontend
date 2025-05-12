import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <h1>Auth</h1>
      <main>
        <Outlet />
      </main>
    </>
  );
}
