import { Link } from "react-router-dom";

const NavbarLogo = () => {
  return (
    <div className="pb-28">
      <nav className="fixed top-0 z-40 w-full duration-200 bg-white shadow">
        <div className="flex justify-center py-4 shadow-sm">
          {/* logo */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-widest text-primary font-crimson sm:text-3xl "
          >
            senikita
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavbarLogo;
