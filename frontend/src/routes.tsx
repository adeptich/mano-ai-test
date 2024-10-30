import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "./layout/BasicLayout";
import NotFoundPage from "./pages/error/NotFound";
import MainPage from "./pages/index";
import MrfList from "./pages/mrf-list";

const router = createBrowserRouter([
  {
    element: <BasicLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/mrf-list",
        element: <MrfList />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;
