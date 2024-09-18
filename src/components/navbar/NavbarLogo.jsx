import { Link } from "react-router-dom";

const NavbarLogo = () => {
  return (
    <div className="pb-16">
      <nav className="bg-white duration-200 z-40 shadow fixed w-full top-0">
        <div className="py-4 shadow-sm flex justify-center">
          {/* logo */}
          <Link
            to="/"
            className="text-primary font-crimson font-bold tracking-widest sm:text-3xl text-2xl "
          >
            senikita
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavbarLogo;
