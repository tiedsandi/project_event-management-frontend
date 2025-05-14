import { Outlet } from "react-router-dom";

export default function AuthLayout() {
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
