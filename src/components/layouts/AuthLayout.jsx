import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center relative">
      <div className="absolute inset-0">
        <img
          src="/bg-auth.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-80"
        />
      </div>
      <main
        // style={{ padding: "20px" }}
        className="z-10 w-full max-w-md p-5 bg-white shadow-lg rounded-lg"
      >
        <Outlet />
      </main>
    </div>
  );
}
