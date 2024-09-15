import { Link } from "react-router-dom";

const FooterLogo = () => {
  return (
    <div>
      <hr className="my-8 w-full" />
      <div className="flex items-center justify-between ">
        <div className="">
          <Link
            to="/"
            className="text-primary font-crimson font-bold tracking-widest sm:text-4xl text-2xl mr-3"
          >
            senikita
          </Link>
        </div>

        <div className="text-gray-400">
          <p>&copy; 2024 SeniKita | Seluruh Hak Cipta Dilindungi</p>
        </div>
      </div>
    </div>
  );
};

export default FooterLogo;
