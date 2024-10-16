import React, { useEffect, useState } from "react";
import HeroImage from "/assets/home/hero.png";
import HeroTexture from "/assets/home/hero-texture2.png";
import DropdownFilter from "../../components/DropdownFilter";
import { IoIosList } from "react-icons/io";
import LocationInput from "../form-input/LocationInput";
import CustomSearchInput from "../form-input/CustomSearchInput";
import { useAxiosInstance } from "../../config/axiosConfig";

const Hero = ({ setCityId }) => {
  const axiosInstance = useAxiosInstance();
  const handleSelectLocation = (selectedLocation) => {
    console.log("Selected location:", selectedLocation);
    setCityId(selectedLocation ? selectedLocation.id : null); // Set cityId ketika lokasi dipilih
  };

  const [selectedStatus, setSelectedStatus] = useState("Semua Kategori");
  const status = ["Semua Kategori", "Seni Tari", "Seni Musik", "Seni Rupa"];
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axiosInstance.get("/cities");
        if (response.data.status === "success") {
          setCities(response.data.cities);
        } else {
          console.error("Failed to fetch cities");
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, [axiosInstance]);


  return (
    <div className="container relative px-6 pt-10">
      <div className="relative py-20 md:py-28 rounded-3xl ">
        <div
          className="absolute inset-0 z-10 opacity-100 bg-gradient-to-r from-primary to-tertiary rounded-3xl"
        ></div>

        <div
          className="absolute inset-0 z-20 bg-center bg-cover opacity-30 rounded-3xl"
          style={{
            backgroundImage: `url(${HeroTexture})`,
          }}
        ></div>

        <div className="z-30 grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Gaya absolute untuk HeroImage */}
          <div className="">
            <div className="absolute lg:-bottom-3  lg:w-[40%]  lg:left-14 w-[70%] -top-12 right-1/4 z-20">
              <img
                src={HeroImage}
                alt=""
                className="h-full -rotate-3 scale-x-[-1]"
                style={{ userSelect: "none", pointerEvents: "none" }}
              />
            </div>
          </div>

          {/* asjh */}
          <div className="z-20 col-span-2 pl-32 pr-24">
            <div className="flex flex-col  gap-[0.4rem] text-white">
              <p className="">Selamat Datang,</p>
              <h1 className="text-2xl font-semibold text-white font-raleway md:text-3xl">
                Jelajahi
                <span className="p-2 ml-2 bg-brick/80 rounded-xl">
                  Seni dan Kebudayaan Daerah
                </span>
              </h1>
              <p className="">
                Senikita merupakan marketplace pertama yang mempertemukan produk
                dan jasa kesenian di Indonesia, tempat untuk menemukan berbagai
                karya seni dan layanan dari seniman lokal di Indonesia.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Browse Category dan Search */}
      <div className="flex justify-center mb-10">
        <div className="absolute z-30 flex items-center justify-between w-3/4 h-16 px-4 bg-white shadow-lg rounded-2xl -bottom-8">
          <div className="grid w-full grid-cols-2">
            <div className="flex items-center gap-3">
              <div className="mr-4 font-semibold">Telusuri</div>
              <div className="flex items-center w-full gap-2 mr-4 border-r">
                <div className="p-2 bg-tertiary/20 rounded-xl">
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
              <CustomSearchInput
                placeholder="Cari kota..."
                mapData={(city) => city.name + " " + city.province.name}
                handleSelect={handleSelectLocation} // Pass handleSelectLocation here
                itemsData={cities}
                disabled={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
