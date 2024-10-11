import { useContext } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import UserDashboardLayout from "../../layouts/UserDashboardLayout";
import Welcoming from "../../assets/home/client1.png";
import { UserContext } from "../../context/UserContext";
import { IoWalletOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import Tabs from "../../components/Tabs";
import ProfileAsset from "../../assets/home/faq.png";
import { Link } from "react-router-dom";
import { IoIosHourglass } from "react-icons/io";
import { BsTruck } from "react-icons/bs";
import { FaRegCalendarCheck } from "react-icons/fa";
import { PiListStar } from "react-icons/pi";

const DashboardUser = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found!</div>;
  }

  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/user/dashboard" },
  ];

  const purchaseProductData = [
    {
      status: "Menunggu Pembayaran",
      count: 1,
      icon: <IoWalletOutline className="text-2xl text-primary" />,
    },
    {
      status: "Dikirim",
      count: 2,
      icon: <BsTruck className="text-2xl text-primary" />,
    },
    {
      status: "Diterima",
      count: 2,
      icon: <IoCheckmarkCircleOutline className="text-2xl text-primary" />,
    },
    {
      status: "Diulas",
      count: 3,
      icon: <PiListStar className="text-2xl text-primary" />,
    },
  ];

  const purchaseServiceData = [
    {
      status: "Menunggu Konfirmasi",
      count: 1,
      icon: <IoIosHourglass className="text-2xl text-primary" />,
    },
    {
      status: "Menunggu Pembayaran",
      count: 0,
      icon: <IoWalletOutline className="text-2xl text-primary" />,
    },
    {
      status: "Dijadwalkan",
      count: 0,
      icon: <FaRegCalendarCheck className="text-2xl text-primary" />,
    },
    {
      status: "Selesai",
      count: 0,
      icon: <IoCheckmarkCircleOutline className="text-2xl text-primary" />,
    },
    {
      status: "Diulas",
      count: 0,
      icon: <PiListStar className="text-2xl text-primary" />,
    },
  ];

  const tabs = [
    {
      name: "product",
      label: "Pembelian Produk",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
          {purchaseProductData.map((purchase, index) => (
            <Link to={"/user/dashboard/transaction"} key={index}>
              <div className="flex gap-3 items-center p-3 rounded-xl hover:bg-gray-50">
                <div className="p-3 rounded-xl bg-tertiary/20 relative">
                  {purchase.count > 0 && (
                    <span
                      className="absolute top-0 right-0 -mt-1 -mr-1 bg-customRed text-white text-xs font-semibold rounded-full flex items-center justify-center"
                      style={{
                        width: "20px",
                        height: "20px",
                        lineHeight: "20px",
                      }}
                    >
                      {purchase.count}
                    </span>
                  )}
                  <div className="text-2xl text-primary">{purchase.icon}</div>
                </div>
                <div className="text-sm">{purchase.status}</div>
              </div>
            </Link>
          ))}
        </div>
      ),
    },
    {
      name: "service",
      label: "Pembelian Jasa",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-3">
          {purchaseServiceData.map((purchase, index) => (
            <Link to={"/user/dashboard/transaction"} key={index}>
              <div className="flex gap-3 items-center p-3 rounded-xl hover:bg-gray-50">
                <div className="p-3 rounded-xl bg-tertiary/20 relative">
                  {purchase.count > 0 && (
                    <span
                      className="absolute top-0 right-0 -mt-1 -mr-1 bg-customRed text-white text-xs font-semibold rounded-full flex items-center justify-center"
                      style={{
                        width: "20px",
                        height: "20px",
                        lineHeight: "20px",
                      }}
                    >
                      {purchase.count}
                    </span>
                  )}
                  <div className="text-2xl text-primary">{purchase.icon}</div>
                </div>
                <div className="text-sm">{purchase.status}</div>
              </div>
            </Link>
          ))}
        </div>
      ),
    },
  ];

  return (
    <UserDashboardLayout pageTitle="Dashboard | Transaksi">
      <div className="flex flex-col gap-2 border p-3 rounded-xl">
        <div className="border p-3 py-5 rounded-xl bg-gray-50">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Welcome Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 mt-2">
          {/* Welcoming */}
          <div className="grid grid-cols-2 px-10 py-16 bg-gradient-to-r from-primary to-tertiary rounded-2xl text-white relative h-full">
            <div>
              <p>Selamat Datang,</p>
              <h1 className="font-crimson font-semibold text-2xl md:text-4xl bg-gradient-to-r from-brick to-transparent px-2 w-fit mt-2">
                {user.name}
              </h1>
            </div>
            <div>
              <img
                src={Welcoming}
                alt=""
                className="object-cover absolute bottom-0 left-[30%] md:left-1/2 lg:left-1/3 2xl:left-[45%] w-[40rem] md:w-[30rem]"
                style={{ userSelect: "none", pointerEvents: "none" }}
              />
            </div>
          </div>

          {/* User Profile */}
          <Link to={`/user/dashboard/profil`}>
            <div className="h-full">
              <div className="grid grid-cols-2 p-5 h-full rounded-2xl bg-gradient-to-r from-brick to-lightBrick relative overflow-hidden">
                <div>
                  <img
                    src="https://via.placeholder.com/100"
                    alt="User Profile"
                    className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl "
                  />
                  <div className="mt-3 text-white">
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p>{user.email}</p>
                  </div>
                </div>
                <div className="text-start md:text-end text-white font-crimson flex flex-col">
                  <h1 className="text-lg md:text-2xl">
                    Lengkapi Profil untuk Kemudahan Transaksi
                  </h1>
                </div>
                <img
                  src={ProfileAsset}
                  alt=""
                  className="absolute top-20 right-0 object-cover w-[12rem] xl:w-64"
                  style={{ userSelect: "none", pointerEvents: "none" }}
                />
              </div>
            </div>
          </Link>
        </div>

        <div className="p-6">
          <div className="text-lg font-semibold">
            <p className="mb-2">Pembelian Anda</p>
            <Tabs tabs={tabs} />
          </div>
        </div>
      </div>
    </UserDashboardLayout>
  );
};

export default DashboardUser;
