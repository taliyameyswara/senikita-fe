import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const UserDashboardLayout = ({ children, pageTitle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = pageTitle || "Dashboard";
  }, [pageTitle]);

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
            userRole={"user"}
          />

          {/* Main page content */}
          <main className="flex-1 relative">
            <div className="w-full px-4 py-8 mx-auto max-w-9xl">{children}</div>
          </main>
          {/* </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboardLayout;
