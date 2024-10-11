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
        <div className="grid grid-cols-6 gap-10 bg-gradient-to-r from-primary to-tertiary p-5 py-24 rounded-[2rem] relative w-[60%] mx-auto">
          <div className="col-span-2 flex flex-col justify-end text-end text-white">
            <h1 className="font-crimson text-3xl">Bergabung &</h1>
            <h1 className="font-crimson font-semibold text-5xl">Jadilah</h1>
            <h1 className="font-crimson font-semibold text-5xl bg-gradient-to-r from-brick to-transparent px-2 w-fit ml-auto mt-2">
              Seniman
            </h1>
          </div>

          <div className="col-span-1">
            <div className="absolute lg:-bottom-10 lg:w-[32%] lg:left-[24%] w-[70%] -top-20 z-20 ">
              <img
                src={SenimanRegister}
                alt=""
                className="h-full object-cover"
                style={{ userSelect: "none", pointerEvents: "none" }}
              />
            </div>
          </div>

          <div className="col-span-3 ml-5">
            <p className="text-white text-lg font-raleway">
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
