import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { toast } from 'react-toastify';

const SenimanDashboardLayout = ({ children, pageTitle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = pageTitle || "Dashboard Seniman";
  }, [pageTitle]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="">
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isDashboard={true}
      />

      <div className="container">
        <div className="flex overflow-hidden">
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            userRole={"seniman"}
          />

          {/* Main page content */}
          <main className="relative flex-1">
            <div className="w-full px-4 py-8 mx-auto max-w-9xl">{children}</div>
          </main>
          {/* </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SenimanDashboardLayout;
