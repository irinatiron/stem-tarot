import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import { Analytics } from "@vercel/analytics/react"

export default function Layout() {
  return (
    <div className="layoutGrid">
      <Analytics />
      <Navbar />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
