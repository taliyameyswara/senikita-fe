import React, { useState } from "react";
import HeroImage from "../../assets/home/hero.png";
import HeroTexture from "../../assets/home/hero-texture2.png";
import DropdownFilter from "../../components/DropdownFilter";
import { IoIosList } from "react-icons/io";
import LocationInput from "../form-input/LocationInput";

const Hero = () => {
  const handleSelectLocation = (selectedLocation) => {
    console.log("Selected location:", selectedLocation);
  };

  const [selectedStatus, setSelectedStatus] = useState("Semua Kategori");
  const status = ["Semua Kategori", "Seni Tari", "Seni Musik", "Seni Rupa"];

  return (
    <div className="container px-6 pt-10 relative">
      {/* <div className="bg-gradient-to-t from-primary to-tertiary py-64 rounded-2xl relative overflow-hidden"> */}
      <div className="py-20 md:py-28 rounded-3xl relative ">
        <div
          className="
            absolute inset-0 
            bg-gradient-to-r 
            from-primary to-tertiary 
            opacity-100 
            rounded-3xl 
            z-10
          "
        ></div>

        <div
          className="
            absolute inset-0 
            bg-cover bg-center 
            opacity-30
            rounded-3xl 
            z-20
          "
          style={{
            backgroundImage: `url(${HeroTexture})`,
          }}
        ></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 z-30">
          {/* Gaya absolute untuk HeroImage */}
          <div className="">
            <div className="absolute lg:-bottom-3  lg:w-[40%]  lg:left-14 w-[70%] -top-12 right-1/4 z-20">
              <img
                src={HeroImage}
                alt=""
                className="h-full -rotate-3 scale-x-[-1]"
              />
            </div>
          </div>

          {/* asjh */}
          <div className="pl-32 pr-24 col-span-2 z-20">
            <div className="flex flex-col  gap-[0.4rem] text-white">
              <p className="">Selamat Datang,</p>
              <h1 className="font-semibold font-raleway md:text-3xl text-2xl text-white">
                Jelajahi
                <span className="ml-2 p-2 bg-brick/80 rounded-xl">
                  Seni dan Kebudayaan Daerah
                </span>
              </h1>
              <p className="">
                Marketplace pertama yang mempertemukan produk dan jasa kesenian
                di Indonesia, tempat untuk menemukan berbagai karya seni dan
                layanan dari seniman lokal di Indonesia.
              </p>
            </div>
            {/* <div className="flex w-[90%] gap-5 mt-2">
              <div className="flex gap-2 text-white mt-2 bg-white/10 p-3 rounded-xl">
                <div className="mt-1">
                  <LuSparkle />
                </div>
                <div className="">
                  <h1 className="font-semibold">Produk Kesenian</h1>
                  <p>
                    Terdapat 100+ produk kesenian terdaftar dari berbagai daerah
                    di Indonesia
                  </p>
                </div>
              </div>
              <div className="flex gap-2 text-white mt-2 bg-white/10 p-3 rounded-xl">
                <div className="mt-1">
                  <LuSparkle />
                </div>
                <div className="">
                  <h1 className="font-semibold">Jasa Kesenian</h1>
                  <p>
                    Terdapat 100+ produk kesenian terdaftar dari berbagai daerah
                    di Indonesia
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Browse Category dan Search */}
      <div className="mb-10 flex justify-center">
        <div className="w-3/4 h-16 bg-white shadow-lg rounded-2xl absolute -bottom-8 z-30 flex items-center justify-between px-4">
          <div className="grid grid-cols-2 w-full">
            <div className="flex items-center gap-3">
              <div className="font-semibold mr-4">Telusuri</div>
              <div className="flex items-center gap-2 border-r mr-4 w-full">
                <div className="bg-tertiary/20 p-2 rounded-xl">
                  <IoIosList className="text-xl text-primary" />
                </div>
                <DropdownFilter
                  title={"Status"}
                  options={status}
                  selectedOption={selectedStatus}
                  setSelectedOption={setSelectedStatus}
                  label="Kategori Kesenian"
                  width="w-72"
                />
              </div>
            </div>
            <div className="">
              <LocationInput
                placeholder="Pilih lokasi"
                handleSelect={handleSelectLocation}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
