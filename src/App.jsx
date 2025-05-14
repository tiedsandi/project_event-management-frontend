import EventsPage, {
  HydrateFallback as eventsHydrate,
  loader as eventsLoader,
} from "./pages/Events";
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
      {
        path: "events",
        element: <EventsPage />,
        loader: eventsLoader,
        HydrateFallback: eventsHydrate,
      },
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
