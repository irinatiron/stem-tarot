import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout"; // importa tu Layout
import HomePage from "../pages/HomePage";
import CardDetailPage from "../pages/CardDetailPage";

const router = createBrowserRouter([
  {
    element: <Layout />,  // Layout como contenedor principal
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/card/:id", element: <CardDetailPage /> },
    ],
  },
]);

export default router;
