import { createBrowserRouter, RouterProvider } from "react-router";

import MainLayout from "./components/layouts/MainLayout";
import AuthLayout from "./components/layouts/AuthLayout";
import LoginPage from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <h1 className="text-3xl font-bold underline">Hello world!</h1>,
      },
      { path: "/event", element: <h1>Event</h1> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <h1>register</h1> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
