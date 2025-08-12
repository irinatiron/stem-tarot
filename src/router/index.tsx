import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout"; 
import LandingPage from "../pages/LandingPage";
import HomePage from "../pages/HomePage";
import CardDetailPage from "../pages/CardDetailPage";

const router = createBrowserRouter([
  // Página inicial sin Layout
  { path: "/", element: <LandingPage /> },
  {
    element: <Layout />,  
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "/card/:id", element: <CardDetailPage /> },
    ],
  },
]);

export default router;
