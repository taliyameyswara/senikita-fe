// src/components/Navbar.js
import React, { useContext, useState, useEffect } from "react";
import {
  IoCartOutline,
  IoChatboxOutline,
  IoStorefrontOutline,
  IoLogOutOutline,
  IoColorPaletteOutline,
} from "react-icons/io5";
import { IoMdSearch, IoMdHeartEmpty } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import DropdownNav from "./DropdownNav";
import Avatar from "../../assets/avatar.png";
import { UserContext } from "../../context/UserContext";
import Header from "../../components/sidebar/Header";
import { useNavigate } from 'react-router-dom';

const CategoryLinks = [
  { id: 1, name: "Seni Lukis", link: "/#" },
  { id: 2, name: "Seni Tari", link: "/#" },
  { id: 3, name: "Seni Desain", link: "/#" },
];


const auth = true;

const Navbar = ({ sidebarOpen, setSidebarOpen, isDashboard }) => {
  const { user, logout, loading } = useContext(UserContext); // Use logout from context
  const ProfileLinks = [
    {
      id: 1,
      title: "Dashboard",
      icon: <IoStorefrontOutline />,
      link: user && user.role === 1 ? "/dashboard" : "/user/dashboard", // Cek role user
    },
    {
      id: 2,
      title: user && user.isHaveStore === 1 ? "Dashboard Seniman" : "Daftar Menjadi Seniman",
      icon: <IoColorPaletteOutline />,
      link: user && user.isHaveStore === 1 ? "/seniman/dashboard" : "/daftar/seniman",
    },
    {
      id: 3,
      title: <span className="text-customRed">Keluar</span>,
      icon: <IoLogOutOutline className="text-customRed" />,
      link: "/#",
    },
  ];

  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search?search=${query}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };


  return (
    <div className="md:mb-20 mb-36">
      <nav className="fixed top-0 z-40 w-full duration-200 bg-white">
        <div className="py-4 shadow">
          {/* desktop nav */}
          <div className="container items-center justify-between hidden md:flex">
            {/* logo and category section */}
            <div className="flex items-center gap-4">
              {/* logo */}
              <Link
                to="/"
                className="mr-3 text-2xl font-bold tracking-widest text-primary font-crimson sm:text-4xl"
              >
                senikita
              </Link>

              {/* category items */}
              <div className="hidden lg:block">
                {/* dropdown */}
                <DropdownNav title="Kategori" icon={<FaCaretDown />}>
                  <ul className="space-y-3">
                    {CategoryLinks.map((data) => (
                      <li key={data.id}>
                        <a
                          href={data.link}
                          className="inline-block w-full p-2 px-4 text-secondary/80 hover:underline hover:bg-gray-100 hover:text-primary"
                        >
                          {data.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </DropdownNav>
              </div>
            </div>
            {/* searchbar */}
            <div className="flex-grow mx-4">
              <div className="relative group">
                <IoMdSearch className="absolute text-xl text-gray-600 -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="text"
                  placeholder="Cari kesenian.."
                  className="w-full p-3 pl-10 bg-gray-100 border border-gray-200 rounded-full search-bar focus:outline-none"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
              </div>
            </div>

            {/* navbar right section */}
            <div className="flex items-center gap-2">
              {user ? (
                // authenticated
                <>
                  {/* profile */}
                  <DropdownNav
                    title={
                      <>
                        <div className="flex items-center gap-2">
                          <img
                            src={Avatar}
                            alt="Profile"
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="">{user.name}</div>
                        </div>
                      </>
                    }
                    icon={<FaCaretDown />}
                  >
                    {/* profile dropdown links */}
                    <ul className="space-y-3">
                      {ProfileLinks.map((data) => (
                        <li key={data.id}>
                          <Link
                            to={data.link}
                            onClick={(e) => {
                              if (data.id === 3) {
                                e.preventDefault();
                                logout(); // Call logout from context
                                window.location.href = "/login"; // Redirect after logout
                              }
                            }}
                            className="flex items-center w-full gap-3 p-2 px-4 text-secondary/80 hover:bg-gray-100 hover:text-primary"
                          >
                            <div className="text-xl">{data.icon}</div>
                            <div className="text-sm">{data.title}</div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </DropdownNav>
                  {/* cart */}
                  <Link to={"/cart"} className="relative p-3">
                    <IoCartOutline className="text-2xl text-secondary" />
                    <div className="w-4 h-4 bg-customRed text-white rounded-full absolute -top-1 -right-1 flex items-center justify-center text-xs p-2.5  border-white border-2">
                      20
                    </div>
                  </Link>
                  {/* message */}
                  <button className="relative p-3">
                    <IoChatboxOutline className="text-2xl text-secondary" />
                    <div className="w-4 h-4 bg-customRed text-white rounded-full absolute -top-1 -right-1 flex items-center justify-center text-xs p-2.5  border-white border-2">
                      20
                    </div>
                  </button>
                  {/* liked */}
                  {/* <button className="p-3 ">
                  <IoMdHeartEmpty className="text-2xl text-secondary" />
                </button> */}
                </>
              ) : (
                // !authenticated
                <>
                  <Link
                    to="/signup"
                    className="mr-4 text-sm font-semibold md:text-base"
                  >
                    Daftar
                  </Link>
                  <div className="p-2 px-5 text-white rounded-full bg-primary">
                    <Link to="/login" className="">
                      Masuk
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* mobile nav */}
          <div className="flex flex-col px-4 md:hidden">
            {/* top section*/}
            <div className="flex items-center justify-between mb-4">
              {/* right section */}
              <div className="flex items-center gap-2">
                {/*  Site header */}
                {isDashboard ? (
                  <Header
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                ) : (
                  ""
                )}
                {/* logo */}
                <Link
                  to="/"
                  className="mr-3 text-2xl font-bold tracking-widest text-primary font-crimson sm:text-4xl"
                >
                  senikita
                </Link>
              </div>
              {/* profile, cart, message, liked */}
              <div className="flex items-center gap-2">
                {user ? (
                  // authenticated
                  <>
                    {/* profile */}
                    <DropdownNav
                      title={
                        <>
                          <div className="flex items-center gap-2">
                            <img
                              src={Avatar}
                              alt="Profile"
                              className="w-8 h-8 rounded-full"
                            />
                          </div>
                        </>
                      }
                      icon={<FaCaretDown />}
                    >
                      {/* profile dropdown links */}
                      <ul className="space-y-3">
                        {ProfileLinks.map((data) => (
                          <li key={data.id}>
                            <a
                              href={data.link}
                              onClick={(e) => {
                                e.preventDefault();
                                if (data.id === 3) {
                                  // ID 3 is for logout
                                  logout(); // Call logout from context
                                  window.location.href = "/login"; // Redirect after logout
                                }
                              }}
                              className="flex items-center w-full gap-3 p-2 px-4 rounded-md text-secondary hover:bg-gray-100"
                            >
                              <div className="text-xl">{data.icon}</div>
                              <div className="text-base">{data.title}</div>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </DropdownNav>
                    {/* cart */}
                    <button className="relative p-3">
                      <IoCartOutline className="text-2xl text-secondary" />
                      <div className="w-4 h-4 bg-customRed text-white rounded-full absolute -top-1 -right-1 flex items-center justify-center text-xs p-2.5  border-white border-2">
                        20
                      </div>
                    </button>
                    {/* message */}
                    <button className="relative p-3">
                      <IoChatboxOutline className="text-2xl text-secondary" />
                      <div className="w-4 h-4 bg-customRed text-white rounded-full absolute -top-1 -right-1 flex items-center justify-center text-xs p-2.5  border-white border-2">
                        20
                      </div>
                    </button>
                    {/* liked */}
                    {/* <button className="p-3 ">
                    <IoMdHeartEmpty className="text-2xl text-secondary" />
                  </button> */}
                  </>
                ) : (
                  // !authenticated
                  <>
                    <Link
                      to="/"
                      className="mr-4 text-sm font-semibold md:text-base"
                    >
                      Daftar
                    </Link>
                    <div className="p-2 px-5 text-white rounded-full bg-primary">
                      <Link to="/login" className="">
                        Masuk
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* category items */}
            <div className="flex items-center">
              <DropdownNav title={"Kategori"} icon={<FaCaretDown />}>
                <ul className="space-y-3">
                  {CategoryLinks.map((data) => (
                    <li key={data.id}>
                      <a
                        href={data.link}
                        className="inline-block w-full p-2 px-4 text-secondary/80 hover:underline hover:bg-gray-100 hover:text-primary"
                      >
                        {data.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </DropdownNav>
              <div className="flex-grow mx-4">
                <div className="relative group">
                  <IoMdSearch className="absolute text-xl text-gray-600 -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="text"
                    placeholder="Cari kesenian.."
                    className="w-full p-3 pl-10 bg-gray-100 border border-gray-200 rounded-full search-bar focus:outline-none"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyPress}

                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
