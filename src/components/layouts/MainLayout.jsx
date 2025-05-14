import Header from "../Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="py-3 mx-auto max-w-7xl">
      <Header />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
