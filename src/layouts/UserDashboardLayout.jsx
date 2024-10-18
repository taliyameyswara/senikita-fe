import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const UserDashboardLayout = ({ children, pageTitle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = pageTitle || "Dashboard";
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

      <div className="container flex">
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          userRole={"user"}
        />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto relative">
          <div className="w-full px-4 py-8 mx-auto max-w-9xl">{children}</div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboardLayout;
