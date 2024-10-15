import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarLogo from "../../components/navbar/NavbarLogo";
import ErrorImage from "/assets/home/404.png";
import FooterLogo from "../../components/footer/FooterLogo";

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative flex flex-col bg-primary bg-opacity-5">
      {/* Navbar */}
      <NavbarLogo />

      <div
        className="container relative flex flex-col items-center gap-10 px-6 lg:flex-row"
        style={{ minHeight: "calc(100vh - 6rem)" }}
      >
        {/* 404 Text Section */}
        <div className="flex flex-col items-start col-span-2 mb-20 lg:w-1/2">
          <h1 className="text-[4rem] lg:text-[6rem] font-extrabold text-brick leading-tight text-center lg:text-left">
            Oops!
          </h1>
          <h2 className="text-[2rem] lg:text-[3rem] font-bold mb-4">
            Halaman Tidak Ditemukan
          </h2>
          <p className="mb-6 text-lg text-gray-500 ">
            Maaf, halaman yang Anda cari tidak tersedia. Mungkin Anda salah
            ketik atau halaman telah dihapus.
          </p>

          <button
            onClick={() => navigate(-1)}
            className="inline-block px-8 py-3 text-lg font-semibold text-white transition duration-300 rounded-full shadow-md bg-brick hover:bg-customGreen"
          >
            Kembali ke Beranda
          </button>
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
