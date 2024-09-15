import { Link } from "react-router-dom";

const NavbarLogo = () => {
  return (
    <div>
      {/* navbar with logo */}
      <nav className="bg-white duration-200 relative z-40 shadow">
        <div className="py-4 shadow-sm flex items-center justify-center">
          {/* logo */}
          <Link
            to="/"
            className="text-primary font-crimson font-bold tracking-widest sm:text-3xl text-2xl mr-3"
          >
            senikita
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavbarLogo;
