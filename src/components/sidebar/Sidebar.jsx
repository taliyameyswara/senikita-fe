import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { RiAppsLine } from "react-icons/ri";
import { IoMdPaper, IoMdHeartEmpty } from "react-icons/io";
import { IoChatboxOutline, IoColorPaletteOutline } from "react-icons/io5";
import { PiListStar } from "react-icons/pi";
import { HiOutlineUser } from "react-icons/hi2";
import { IoWalletOutline, IoChevronForwardOutline } from "react-icons/io5";

const SidebarLinks = [
  { id: 1, name: "Dashboard", icon: <RiAppsLine />, link: "/user/dashboard" },
  {
    id: 2,
    name: "Daftar Transaksi",
    icon: <IoMdPaper />,
    link: "/user/dashboard/transaction",
  },
  {
    id: 3,
    name: "Ulasan",
    icon: <PiListStar />,
    link: "/user/dashboard/review",
  },
  {
    id: 4,
    name: "Wishlist",
    icon: <IoMdHeartEmpty />,
    link: "/user/dashboard/wishlist",
  },
  // {
  //   id: 5,
  //   name: "Seniman Favorit",
  //   icon: <IoColorPaletteOutline />,
  //   link: "/user/dashboard/favorite-artist",
  // },
  {
    id: 6,
    name: "Profil",
    icon: <HiOutlineUser />,
    link: "/user/dashboard/profil",
  },
];

const SidebarSenimanLinks = [
  {
    id: 1,
    name: "Dashboard",
    icon: <RiAppsLine />,
    link: "/seniman/dashboard",
  },
  {
    id: 2,
    name: "Daftar Kesenian",
    icon: <IoColorPaletteOutline />,
    link: "/seniman/dashboard/kesenian",
  },
  {
    id: 3,
    name: "Pesanan",
    icon: <IoMdPaper />,
    link: "/seniman/dashboard/order",
  },
  // {
  //   id: 4,
  //   name: "Chat",
  //   icon: <IoChatboxOutline />,
  //   link: "/seniman/dashboard/chat",
  // },
  {
    id: 5,
    name: "Ulasan",
    icon: <PiListStar />,
    link: "/seniman/dashboard/review",
  },
  {
    id: 6,
    name: "Profil Seniman",
    icon: <HiOutlineUser />,
    link: "/seniman/dashboard/profil",
  },
];

function Sidebar({ sidebarOpen, setSidebarOpen, userRole }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // Handle clicking outside to close sidebar
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // Handle escape key to close sidebar
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  // Handle sidebar expanded state in localStorage
  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const linksToDisplay =
    userRole === "seniman" ? SidebarSenimanLinks : SidebarLinks;

  return (
    <div>
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar  shrink-0 transition-all duration-200 ease-in-out bg-white p-4 py-2 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <div className="flex justify-between pr-3 mb-5 sm:px-2">
          <button
            ref={trigger}
            className="lg:hidden text-primary"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="space-y-8">
          {userRole === "seniman" && (
            <Link to="/seniman/dashboard/balance">
              <div className="mb-5">
                <div className="bg-white flex rounded-xl p-2 border-[0.5px]">
                  <div className="p-3 m-2 rounded-full bg-tertiary/20 border-[0.5px] border-primary border-opacity-20">
                    <IoWalletOutline className="text-xl text-primary" />
                  </div>
                  <div className="flex flex-row items-center gap-20">
                    <div>
                      <div className="text-sm">Saldo</div>
                      <div className="font-bold font-nunito">Rp 0</div>
                    </div>
                    <div>
                      <IoChevronForwardOutline />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}

          <ul className="mt-1 space-y-2">
            {linksToDisplay.map((data) => (
              <li
                key={data.id}
                className={`mb-0.5 last:mb-0 hover:bg-tertiary/10 hover:text-primary hover:rounded-xl ${
                  pathname === data.link &&
                  "bg-tertiary/10 rounded-xl text-primary"
                }`}
              >
                <NavLink
                  end
                  to={data.link}
                  className={`block truncate ${pathname === data.link && ""}`}
                >
                  <div className="flex items-center p-3 px-3.5">
                    <div className="text-xl">{data.icon}</div>
                    <span className="ml-3 text-sm font-medium duration-200 2xl:opacity-100">
                      {data.name}
                    </span>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
