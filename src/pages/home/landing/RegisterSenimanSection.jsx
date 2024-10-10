import React from "react";
import { Link } from "react-router-dom";
import SenimanRegister from "../../../assets/home/seniman-register.png";

const RegisterSenimanSection = () => {
  return (
    <div className="container px-6 mt-10">
      <div className="flex gap-5">
        {/* 1 */}
        <div className="grid grid-cols-6 gap-10  bg-gradient-to-r from-primary to-tertiary p-5 py-24 rounded-[2rem] relative w-[60%] mx-auto">
          {/* headline */}
          <div className="col-span-2 flex flex-col justify-end text-end text-white">
            <h1 className="font-crimson  text-3xl">Bergabung &</h1>
            <h1 className="font-crimson font-semibold text-5xl">Jadilah</h1>
            <h1 className="font-crimson font-semibold text-5xl bg-gradient-to-r from-brick to-transparent px-2 w-fit ml-auto mt-2">
              Seniman
            </h1>
          </div>

          {/* image */}
          <div className=" col-span-1">
            <div className="absolute lg:-bottom-10  lg:w-[50%]  lg:left-[24%] w-[70%] -top-20 z-20">
              <img
                src={SenimanRegister}
                alt=""
                className="h-full "
                style={{ userSelect: "none", pointerEvents: "none" }}
              />
            </div>
          </div>

          {/* button */}
          <div className=" col-span-3 ml-5">
            <p className="text-white text-lg font-raleway">
              Mulai jual produk atau jasa kesenian di Senikita dan dapatkan
              banyak benefitnya!
            </p>
            <div className="p-2 px-5 mt-3 text-white rounded-full bg-brick w-fit font-semibold">
              <Link to="/login" className="">
                Gabung Sekarang
              </Link>
            </div>
          </div>
        </div>
        {/* 2 */}
        {/* 2 - Section Manfaat */}
        {/* <div className="w-[40%]">
          <h2 className="font-semibold text-2xl mb-5">
            Benefit Bergabung di Senikita
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-2xl border flex gap-4 items-center text-primary">
              <div className="p-3 bg-tertiary/20 rounded-xl">
                <BsShop className="text-2xl" />
              </div>
              <p className="">
                Akses ke pasar yang lebih luas untuk produk dan jasa kesenian
                Anda.
              </p>
            </div>
            <div className="p-4 rounded-2xl border flex gap-4 items-center text-primary">
              <div className="p-3 bg-tertiary/20 rounded-xl">
                <IoColorPaletteOutline className="text-2xl" />
              </div>
              <p className="">
                Dukungan pemasaran untuk meningkatkan visibilitas karya seni
                Anda.
              </p>
            </div>
            <div className="p-4 rounded-2xl border flex gap-4 items-center text-primary">
              <div className="p-3 bg-tertiary/20 rounded-xl">
                <PiMoneyWavy className="text-2xl" />
              </div>
              <p className="">
                Kemudahan dalam transaksi dan manajemen penjualan.
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default RegisterSenimanSection;
