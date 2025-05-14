import Header from "../Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="p-4 mx-auto max-w-[1440px]">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
