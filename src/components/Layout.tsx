import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="layoutGrid">
      <Navbar />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
