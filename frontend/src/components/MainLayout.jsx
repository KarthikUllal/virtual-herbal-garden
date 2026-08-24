import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Chatbot from "./Chatbot/Chatbot";

const MainLayout = () => {
  return (
    <div className="min-h-screen">

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
      <Chatbot />

    </div>
  );
};

export default MainLayout;