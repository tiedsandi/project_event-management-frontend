import EditEventPage, {
  editEventLoader,
  updateEventAction,
} from "./components/EditEventPage";
import EventPage, {
  deleteEventAction,
  HydrateFallback as eventHydrate,
  loader as eventLoader,
} from "./pages/Event";
import EventsPage, {
  HydrateFallback as eventsHydrate,
  loader as eventsLoader,
} from "./pages/Events";
import HomePage, { loaderHome } from "./pages/Home";
import LoginPage, { action as loginAction } from "./pages/Login";
import MyEventsPage, {
  action as eventAction,
  HydrateFallback as myEventsHydrate,
  loader as myEventsLoader,
} from "./pages/MyEvents";
import RegisterPage, { registerAction } from "./pages/Register";
import { RouterProvider, createBrowserRouter } from "react-router";

import AuthLayout from "./components/layouts/AuthLayout";
import ErrorPage from "./pages/Error";
import MainLayout from "./components/layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: loaderHome,
        HydrateFallback: eventsHydrate,
      },
      {
        path: "events",
        element: <EventsPage />,
        loader: eventsLoader,
        HydrateFallback: eventsHydrate,
      },
      {
        path: "events/:idEvent",
        element: <EventPage />,
        loader: eventLoader,
        HydrateFallback: eventHydrate,
      },
      {
        path: "my-events",
        element: <MyEventsPage />,
        action: eventAction,
        loader: myEventsLoader,
        HydrateFallback: myEventsHydrate,
      },
      {
        path: "/events/:idEvent/delete",
        action: deleteEventAction,
      },
      {
        path: "/events/:idEvent/edit",
        element: <EditEventPage />,
        loader: editEventLoader,
        action: updateEventAction,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage />, action: loginAction },
      { path: "register", element: <RegisterPage />, action: registerAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
