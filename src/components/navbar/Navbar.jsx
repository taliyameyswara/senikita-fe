import React, { useContext, useState, useEffect } from "react";
import {
  IoCartOutline,
  IoLogOutOutline,
  IoColorPaletteOutline,
  IoChevronDownOutline,
  IoMapOutline,
} from "react-icons/io5";
import { IoMdSearch, IoMdHeartEmpty } from "react-icons/io";
import { Link } from "react-router-dom";
import DropdownNav from "./DropdownNav";
import Avatar from "/assets/avatar.png";
import { UserContext } from "../../context/UserContext";
import Header from "../../components/sidebar/Header";
import { useNavigate } from "react-router-dom";
import { RiAppsLine } from "react-icons/ri";
import { CiMap } from "react-icons/ci";
import { useCheckStatusApi } from "../../api/shop/CheckStatusApi";

const CategoryLinks = [
  { id: 1, name: "Seni Lukis", link: "/#" },
  { id: 2, name: "Seni Tari", link: "/#" },
  { id: 3, name: "Seni Desain", link: "/#" },
];


const Navbar = ({ sidebarOpen, setSidebarOpen, isDashboard }) => {
  const { user, logout, loading, refresh } = useContext(UserContext);
  const { checkStatusShop } = useCheckStatusApi();
  const [isLoading, setIsLoading] = useState(false);

  const getUserFromLocalStorage = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const userLocal = getUserFromLocalStorage();
      if (user && user.isHaveStore === 0) {
        const status = await checkStatusShop();
        userLocal.isHaveStore = status;
        refresh(userLocal);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (user) {
    console.log(user);
  }


  const ProfileLinks = [
    {
      id: 1,
      title: "Dashboard",
      icon: <RiAppsLine />,
      link: user && user.role === 1 ? "/dashboard" : "/user/dashboard",
    },
    {
      id: 2,
      title:
        user && user.isHaveStore == 1
          ? "Dashboard Seniman"
          : "Daftar Menjadi Seniman",
      icon: <IoColorPaletteOutline />,
      link:
        user && user.isHaveStore == 1
          ? "/seniman/dashboard"
          : "/daftar/seniman",
    },
    {
      id: 3,
      title: <span className="text-customRed">Keluar</span>,
      icon: <IoLogOutOutline className="text-customRed" />,
      link: "/#",
    },
  ];

  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search?search=${query}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  if (loading || isLoading) {
    return "";
  }

  return (
    <div className="md:mb-20 mb-36">
      <nav className="fixed top-0 z-40 w-full duration-200 bg-white shadow">
        <div className="py-4 ">
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
            </div>
            {/* searchbar */}
            <div className="flex-grow mx-4">
              <div className="relative group">
                <IoMdSearch className="absolute text-xl text-gray-600 -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="text"
                  placeholder="Cari kesenian.."
                  className="w-full p-3 pl-10 bg-gray-100 border border-gray-200 rounded-full search-bar focus:outline-none focus:ring-primary focus:border-primary/60"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
              </div>
            </div>

            {/* category items */}
            <div className="hidden pr-3 border-r lg:block">
              <Link
                to="/peta-kesenian"
                className="flex items-center gap-2 text-sm font-semibold md:text-base"
              >
                <IoMapOutline className="text-xl" />
                Peta Kesenian
              </Link>
            </div>

            {/* navbar right section */}
            <div className="flex items-center gap-2 pl-3">
              {user ? (
                // authenticated
                <>
                  {/* profile */}
                  <DropdownNav
                    title={
                      <>
                        <div className="flex items-center gap-2">
                          <img
                            src={user.profile_picture ?? Avatar}
                            alt="Profile"
                            className="w-8 h-8 border rounded-full"
                          />
                          <div className="">{user.name}</div>
                        </div>
                      </>
                    }
                    icon={<IoChevronDownOutline />}
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
                                logout();
                                window.location.href = "/login";
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
                  </Link>
                  <Link
                    to={"/user/dashboard/wishlist"}
                    className="relative p-3"
                  >
                    <IoMdHeartEmpty className="text-2xl text-secondary" />
                  </Link>
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
                  <div className="p-3 px-5 font-semibold text-white rounded-full bg-primary">
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
            <div className="flex items-center justify-between mb-3">
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
                              src={user.profile_picture ?? Avatar}
                              alt="Profile"
                              className="w-8 h-8 rounded-full"
                            />
                          </div>
                        </>
                      }
                      position={"-left-8"}
                      icon={<IoChevronDownOutline />}
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
                                  logout();
                                  window.location.href = "/login";
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
                    </Link>
                    {/* liked */}
                    <Link
                      to={"/user/dashboard/wishlist"}
                      className="relative p-3"
                    >
                      <IoMdHeartEmpty className="text-2xl text-secondary" />
                    </Link>
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
                    <Link to="/login" className="">
                      <div className="p-2 px-5 text-sm text-white rounded-full bg-primary">
                        Masuk
                      </div>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* category items */}
            <div className="flex items-center">
              <Link
                to="/peta-kesenian"
                className="flex items-center gap-2 text-sm font-semibold md:text-base"
              >
                <IoMapOutline className="text-xl" />
                Peta Kesenian
              </Link>
              <div className="flex-grow ml-4">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Cari kesenian.."
                    className="w-full p-2.5 pl-4 bg-gray-50 border border-gray-200 rounded-full search-bar focus:outline-none focus:ring-primary focus:border-primary/60"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                  <button
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 text-sm text-primary bg-tertiary/20 p-1.5 rounded-full hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                    onClick={handleSearch}
                  >
                    <IoMdSearch className="text-xl" />
                  </button>
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
