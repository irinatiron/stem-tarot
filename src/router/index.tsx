import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout"; 
import LandingPage from "../pages/LandingPage";
import HomePage from "../pages/HomePage";
import CardDetailPage from "../pages/CardDetailPage";
import ReadingPage from "../pages/ReadingPage";
import AboutPage from "../pages/AboutPage";

const router = createBrowserRouter([
  // Página inicial sin Layout
  { path: "/", element: <LandingPage /> },
  {
    element: <Layout />,  
    children: [
      { path: "/cartas", element: <HomePage /> },
      { path: "/carta/:id", element: <CardDetailPage /> },
      { path: "/lectura", element: <ReadingPage /> },
      { path: "/contacto", element: <AboutPage /> },
    ],
  },
]);

export default router;
