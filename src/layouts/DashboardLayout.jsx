import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const DashboardLayout = ({ children, pageTitle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = pageTitle || "Dashboard | Admin";
  }, [pageTitle]);

  return (
    <div className="">
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isDashboard={true}
      />

      <div className="container">
        <div className="flex h-screen overflow-hidden">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {/* Main page content */}
          <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
            <main className="flex-1 overflow-y-auto">
              <div className="w-full px-4 py-8 mx-auto max-w-9xl">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
