import { useContext } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import UserDashboardLayout from "../../layouts/UserDashboardLayout";
import Welcoming from "../../assets/home/client1.png";
import { UserContext } from "../../context/UserContext";
import { IoWalletOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import Tabs from "../../components/Tabs";
import ProfileAsset from "../../assets/home/faq.png";
import { Link } from "react-router-dom";
import SenimanDashboardLayout from "../../layouts/SenimanDashboardLayout";
import { IoIosHourglass, IoMdPaper } from "react-icons/io";
import { BsTruck } from "react-icons/bs";
import { FaRegCalendarCheck } from "react-icons/fa";
import { PiListStar, PiPaintBrush } from "react-icons/pi";
import { limitText } from "../../utils/limitText";
import { formatNumber } from "../../utils/formatNumber";
import { LuBox } from "react-icons/lu";
import GradientChart from "../../components/GradientChart";
import FullPageLoader from "../../components/loading/FullPageLoader";

const DashboardSeniman = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <FullPageLoader />;
  }

  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/user/dashboard" },
  ];

  // Data for counts
  const statisticsData = [
    {
      label: "Total Produk Terjual",
      count: 10,
      icon: <LuBox className="text-2xl" />,
      color:
        "bg-gradient-to-tr from-lightBrick/10 via-white to-white border-lightBrick/10",
    },
    {
      label: "Total Jasa Terjual",
      count: 5,
      icon: <PiPaintBrush className="text-2xl" />,
      color:
        "bg-gradient-to-tr from-customGreen/10 via-white to-white border-customGreen/10",
    },
    {
      label: "Total Transaksi",
      count: 15,
      icon: <IoMdPaper className="text-2xl" />,
      color:
        "bg-gradient-to-tr from-tertiary/10 via-white to-white border-tertiary/10",
    },
    {
      label: "Jumlah Pendapatan",
      count: formatNumber(1000000),
      icon: <IoWalletOutline className="text-2xl" />,
      color:
        "bg-gradient-to-tr from-blue-500/10 via-white to-white border-blue-500/10",
    },
  ];

  return (
    <SenimanDashboardLayout pageTitle="Dashboard | Transaksi">
      <div className="flex flex-col gap-2 border p-3 rounded-xl">
        <div className="border p-3 py-5 rounded-xl bg-gray-50">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Welcome Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
          {/* Welcoming */}
          <div className="grid grid-cols-2 px-10 p-16 bg-gradient-to-r from-primary to-tertiary rounded-2xl text-white relative h-full">
            <div>
              <p>Selamat Datang, </p>
              <h1 className="font-crimson font-semibold text-4xl bg-gradient-to-r from-brick to-transparent px-2 w-fit mt-2">
                {user.name}
              </h1>
            </div>
            <div>
              <img
                src={Welcoming}
                alt=""
                className="object-cover absolute bottom-0 left-1/3"
                style={{ userSelect: "none", pointerEvents: "none" }}
              />
            </div>
          </div>

          {/* User Profile */}
          <div className="h-full">
            <div className="h-full rounded-2xl bg-gradient-to-r from-brick to-lightBrick">
              <Link to={`/user/dashboard/profil`}>
                <div className="h-full">
                  <div className="p-5 h-full rounded-2xl bg-gradient-to-r from-brick to-lightBrick relative overflow-hidden">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://via.placeholder.com/100"
                        alt="User Profile"
                        className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl"
                      />
                      <div className="text-white">
                        <div className="flex gap-2">
                          <p className="text-xs mb-1">Seni Tari, Seni Kriya</p>
                        </div>
                        <h2 className="text-xl font-semibold bg-customGreen">
                          Toko Kesenian Bali
                        </h2>
                        <p>Kabupaten Buleleng, Bali</p>
                      </div>
                    </div>
                    <div className="mt-2 text-white text-sm">
                      {limitText(
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ab saepe expedita accusamus quis error, quaerat tempora recusandae at dignissimos quod quas quasi earumsed? Praesentium est dicta a earum.",
                        300
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Count Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {statisticsData.map((stat, index) => (
            <div key={index} className="">
              <div
                className={`flex items-center gap-2 p-3 border border-lightBrick/10 rounded-xl ${stat.color}`}
              >
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <h1 className="text-lg font-semibold font-nunito">
                    {stat.count}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3">
          <div className="mt-4 col-span-3">
            <GradientChart />
          </div>
        </div>
      </div>
    </SenimanDashboardLayout>
  );
};

export default DashboardSeniman;
