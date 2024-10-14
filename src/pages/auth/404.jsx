import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NavbarLogo from "../../components/navbar/NavbarLogo";
import ErrorImage from "../../assets/home/404.png";
import FooterLogo from "../../components/footer/FooterLogo";

const NotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative flex flex-col  bg-primary bg-opacity-5">
      {/* Navbar */}
      <NavbarLogo />

      <div
        className="container flex flex-col lg:flex-row items-center gap-10 px-6 relative"
        style={{ minHeight: "calc(100vh - 6rem)" }}
      >
        {/* 404 Text Section */}
        <div className="col-span-2 flex flex-col items-start lg:w-1/2 mb-20">
          <h1 className="text-[4rem] lg:text-[6rem] font-extrabold text-brick leading-tight text-center lg:text-left">
            Oops!
          </h1>
          <h2 className="text-[2rem] lg:text-[3rem] font-bold mb-4">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-gray-500 text-lg mb-6 ">
            Maaf, halaman yang Anda cari tidak tersedia. Mungkin Anda salah
            ketik atau halaman telah dihapus.
          </p>

          <Link
            className="inline-block px-8 py-3 text-lg font-semibold text-white transition duration-300 rounded-full bg-brick hover:bg-customGreen shadow-md"
            to="/"
          >
            Kembali ke Beranda
          </Link>
        </div>

        {/* 404 Image Section */}
        <div className="absolute right-0 bottom-0 w-[80%] md:w-[30%] flex justify-end overflow-hidden pointer-events-none -z-10">
          <img
            src={ErrorImage}
            alt="404 Not Found"
            className="object-contain lg:opacity-100 opacity-10"
          />
        </div>
      </div>
      <FooterLogo />
    </div>
  );
};

export default NotFound;
