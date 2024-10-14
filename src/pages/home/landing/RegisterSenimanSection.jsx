import { useContext } from "react";
import { Link } from "react-router-dom";
import SenimanRegister from "../../../assets/home/seniman-register.png";
import { UserContext } from "../../../context/UserContext";

const RegisterSenimanSection = () => {
  const { user, logout, loading } = useContext(UserContext);

  // Fungsi untuk menentukan link tujuan
  const getLink = () => {
    if (loading) return "";
    if (!user) {
      return "/login";
    } else if (!user.isHaveStore) {
      return "/daftar/seniman";
    } else {
      return "/seniman/dashboard";
    }
  };

  const linkTo = getLink();

  return (
    <div className="container px-6 mt-20">
      <div className="flex gap-5">
        {/* 1 */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5 md:gap-10 bg-gradient-to-r from-primary to-tertiary p-5 py-12 md:py-24 rounded-[2rem] relative w-full md:w-[80%] lg:w-[60%] mx-auto">
          {/* <div className="col-span-2 flex flex-col justify-end text-end text-white"> */}
          <div className="col-span-2 flex flex-col lg:text-end text-start  text-white">
            <h1 className="font-crimson text-3xl">Bergabung &</h1>
            <h1 className="font-crimson font-semibold text-5xl">Jadilah</h1>
            <h1 className="font-crimson font-semibold text-5xl bg-gradient-to-r from-brick to-transparent px-2 w-fit mt-2 lg:ml-auto">
              Seniman
            </h1>
          </div>
          {/* <div className="col-span-1 hidden lg:block"> */}
          <div className="col-span-1 ">
            <div className="absolute xl:-bottom-10 xl:w-[32%] lg:w-[40%] md:w-[40%] w-[60%] sm:hidden block md:block lg:left-[25%] md:left-[20%] -right-5 lg:-top-20 md:-top-16 bottom-[10rem] z-20 scale-x-[-1] bg-red-200">
              <img
                src={SenimanRegister}
                alt=""
                className="object-contain"
                style={{ userSelect: "none", pointerEvents: "none" }}
              />
            </div>
          </div>
          {/* <div className="col-span-3 ml-5"> */}
          <div className="col-span-3 lg:ml-5">
            <p className="text-white text-base font-raleway pr-2">
              Mulai jual produk atau jasa kesenian di Senikita dan dapatkan
              banyak benefitnya!
            </p>

            <Link to={linkTo}>
              <button className="p-2 px-5 mt-3 text-white rounded-full bg-brick w-fit font-semibold">
                Gabung Sekarang
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSenimanSection;
