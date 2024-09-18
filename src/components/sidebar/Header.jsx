import React, { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";

function Header({ sidebarOpen, setSidebarOpen }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <>
      {/* Hamburger button */}
      <button
        className="text-secondary lg:hidden"
        aria-controls="sidebar"
        aria-expanded={sidebarOpen}
        onClick={(e) => {
          e.stopPropagation();
          setSidebarOpen(!sidebarOpen);
        }}
      >
        <span className="sr-only">Open sidebar</span>
        <div className="bg-tertiary/10 rounded-lg p-1 mr-2">
          <IoMenuOutline className="text-2xl text-primary" />
        </div>
      </button>
    </>
  );
}

export default Header;
