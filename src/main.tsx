import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./index.css";
import CursorTrail from "./components/CursorTrail";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CursorTrail />
    <RouterProvider router={router} />
  </React.StrictMode>
);
