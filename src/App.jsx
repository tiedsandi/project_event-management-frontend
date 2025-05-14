import LoginPage, { action as loginAction } from "./pages/Login";
import { RouterProvider, createBrowserRouter } from "react-router";

import AuthLayout from "./components/layouts/AuthLayout";
import HomePage from "./pages/Home";
import MainLayout from "./components/layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: "event", element: <h1>Event</h1> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage />, action: loginAction },
      { path: "register", element: <h1>register</h1> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
