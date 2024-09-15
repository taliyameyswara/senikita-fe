import { IoMdSearch } from "react-icons/io";
import { MdMyLocation } from "react-icons/md";

const Hero = () => {
  return (
    <div>
      <div className="bg-gradient-to-t from-primary to-tertiary py-10">
        <div className="px-6">
          <div className="flex flex-col md:text-center text-start justify-center gap-[0.4rem] text-white">
            <h1 className="font-semibold font-raleway md:text-3xl text-2xl text-white ">
              Jelajahi Seni dan Budaya Daerah
            </h1>
            <p className="">
              Temukan karya seni dan layanan kesenian dari para seniman di
              daerah Anda.
            </p>
          </div>
          <div className="flex md:justify-center mt-3">
            <div className="relative group">
              <MdMyLocation className="text-xl text-primary absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button className="search-bar p-3 px-5 pl-11 rounded-full bg-white text-primary/70 w-full text-sm md:text-base">
                Deteksi Lokasi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
