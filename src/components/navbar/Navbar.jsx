import {
  IoCartOutline,
  IoChatboxOutline,
  IoStorefrontOutline,
  IoLogOutOutline,
  IoColorPaletteOutline,
  IoMenuOutline,
} from "react-icons/io5";
import { IoMdSearch, IoMdHeartEmpty } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import DropdownNav from "./DropdownNav";
import Avatar from "../../assets/avatar.png";

const CategoryLinks = [
  {
    id: 1,
    name: "Seni Lukis",
    link: "/#",
  },
  {
    id: 2,
    name: "Seni Tari",
    link: "/#",
  },
  {
    id: 3,
    name: "Seni Desain",
    link: "/#",
  },
];

const ProfileLinks = [
  // {
  //   id: 1,
  //   title: "Toko Anda",
  //   icon: <IoStorefrontOutline />,
  //   link: "/#",
  // },
  // {
  //   id: 1,
  //   title: "Toko Anda",
  //   icon: <IoStorefrontOutline />,
  //   link: "/#",
  // },
  {
    id: 1,
    title: "Dashboard",
    icon: <IoStorefrontOutline />,
    link: "/#",
  },
  {
    id: 2,
    title: "Daftar Menjadi Penyedia Seni",
    icon: <IoColorPaletteOutline />,
    link: "/artprovider-register",
  },
  {
    id: 3,
    title: <span className="text-customRed">Keluar</span>,
    icon: <IoLogOutOutline className="text-customRed" />,
    link: "/#",
  },
];

const auth = true;

const Navbar = () => {
  return (
    <nav className="bg-white duration-200 sticky top-0 z-40">
      <div className="py-4 shadow-sm">
        {/* desktop nav */}
        <div className="container hidden md:flex justify-between items-center">
          {/* logo and category section */}
          <div className="flex items-center gap-4">
            {/* logo */}
            <Link
              to="/"
              className="text-primary font-crimson font-bold tracking-widest sm:text-4xl text-2xl mr-3"
            >
              senikita
            </Link>

            {/* category items */}
            <div className="hidden lg:block">
              {/* dropdown  */}
              <DropdownNav title="Kategori" icon={<FaCaretDown />}>
                <ul className="space-y-3">
                  {CategoryLinks.map((data) => (
                    <li key={data.id}>
                      <a
                        href={data.link}
                        className="inline-block p-2 px-4 text-secondary/80 hover:underline hover:bg-gray-100 hover:text-primary w-full"
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
              <IoMdSearch className="text-xl text-gray-600 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari kesenian.."
                className="search-bar p-3 border border-gray-200 rounded-full bg-gray-100 focus:outline-none w-full pl-10"
              />
            </div>
          </div>

          {/* navbar right section */}
          <div className="flex items-center gap-2">
            {auth ? (
              // authenticated
              <>
                {/*  profile */}
                <DropdownNav
                  title={
                    <>
                      <div className="flex items-center gap-2">
                        <img
                          src={Avatar}
                          alt="Profile"
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="">Taliya</div>
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
                          className="flex items-center gap-3 p-2 px-4 text-secondary/80 hover:bg-gray-100 hover:text-primary w-full"
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
                <button className=" p-3">
                  <IoMdHeartEmpty className="text-2xl text-secondary" />
                </button>
              </>
            ) : (
              // !authenticated
              <>
                {/* <Link
                    to="/daftar-seniman"
                    className="font-semibold text-sm md:text-base"
                  >
                    Daftar sebagai Seniman
                  </Link> */}
                <Link
                  to="/"
                  className="font-semibold text-sm md:text-base mr-4"
                >
                  Daftar
                </Link>
                <div className="p-2 px-5 rounded-full bg-primary text-white">
                  <Link to="/login" className="">
                    Masuk
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        {/* mobile nav */}
        <div className="flex flex-col md:hidden px-4">
          {/* top section*/}
          <div className="flex justify-between items-center mb-4">
            {/* logo */}
            <Link
              to="/"
              className="text-primary font-crimson font-bold tracking-widest sm:text-4xl text-2xl mr-3"
            >
              senikita
            </Link>
            {/* profile, cart, message, liked */}
            <div className="flex items-center gap-2">
              {auth ? (
                // authenticated
                <>
                  {/*  profile */}
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
                            className="flex items-center gap-3 p-2 px-4 text-secondary hover:bg-gray-100 w-full rounded-md"
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
                  <button className=" p-3">
                    <IoMdHeartEmpty className="text-2xl text-secondary" />
                  </button>
                </>
              ) : (
                // !authenticated
                <>
                  {/* <Link
                    to="/daftar-seniman"
                    className="font-semibold text-sm md:text-base"
                  >
                    Daftar sebagai Seniman
                  </Link> */}
                  <Link
                    to="/"
                    className="font-semibold text-sm md:text-base mr-4"
                  >
                    Daftar
                  </Link>
                  <div className="p-2 px-5 rounded-full bg-primary text-white">
                    <Link to="/login" className="">
                      Masuk
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* bottom section */}
          <div className="flex items-center justify-between gap-4">
            {/* category dropdown  */}
            <DropdownNav title={<IoMenuOutline className="text-3xl" />}>
              <ul className="space-y-3">
                <div className="pt-2 px-4 font-semibold">
                  <span className="">Kategori kesenian</span>
                  <div className="w-full h-[0.5px] mt-2 bg-gray-200"></div>
                </div>

                {CategoryLinks.map((data) => (
                  <li key={data.id}>
                    <a
                      href={data.link}
                      className="inline-block p-1 px-4 text-secondary/80 hover:underline hover:bg-gray-100 w-full rounded-md"
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
            </DropdownNav>
            {/* searchbar */}
            <div className="flex-grow">
              <div className="relative group">
                <IoMdSearch className="text-xl text-gray-600 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari kesenian.."
                  className="search-bar p-3 border border-gray-200 rounded-full bg-gray-100 focus:outline-none w-full pl-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
