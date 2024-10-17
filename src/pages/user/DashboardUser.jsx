import { useContext, useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import UserDashboardLayout from "../../layouts/UserDashboardLayout";
import Welcoming from "/assets/home/client1.png";
import { UserContext } from "../../context/UserContext";
import { IoWalletOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import Tabs from "../../components/Tabs";
import ProfileAsset from "/assets/home/faq.png";
import { Link } from "react-router-dom";
import { IoIosHourglass } from "react-icons/io";
import { BsTruck } from "react-icons/bs";
import { FaRegCalendarCheck } from "react-icons/fa";
import { PiListStar } from "react-icons/pi";
import FullPageLoader from "../../components/loading/FullPageLoader";
import { useAxiosInstance } from "../../config/axiosConfig"
import Spinner from "../../components/loading/Spinner";

const DashboardUser = () => {
  const [user, setUser] = useState({});
  const [product, setProduct] = useState([]);
  const [service, setService] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxiosInstance()
  // user/order-service/status-order-count
  const getProductCount = async () => {
    await axiosInstance.get('/user/order/status-order-count')
      .then((res) => {
        console.log(res.data.data)
        setProduct(res.data.data)
      }).catch((error) => {
        console.log(error.response)
      })
  }

  const getServiceCount = async () => {
    await axiosInstance.get('/user/order-service/status-order-count')
      .then((res) => {
        console.log(res.data.data)
        setService(res.data.data)
      }).catch((error) => {
        console.log(error.response)
      })
  }

  const getProfile = async () => {
    await axiosInstance.get('/user/profile')
      .then((res) => {
        setUser(res.data.data)
      }).catch((error) => {
        console.log(error.response)
      })
  }

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true)
      await getProductCount();
      await getServiceCount();
      await getProfile();
      setLoading(false)
    }

    fetchData()
  }, [])



  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/user/dashboard" },
  ];

  const purchaseProductData = [
    {
      status: "Menunggu Pembayaran",
      count: product ? product.pending : "",
      icon: <IoWalletOutline className="text-2xl text-primary" />,
    },
    {
      status: "Dikirim",
      count: product ? product.delivered : "",
      icon: <BsTruck className="text-2xl text-primary" />,
    },
    {
      status: "Diterima",
      count: product ? product.DONE : "",
      icon: <IoCheckmarkCircleOutline className="text-2xl text-primary" />,
    },
    {
      status: "Diulas",
      count: product ? product.DONE : "",
      icon: <PiListStar className="text-2xl text-primary" />,
    },
  ];

  const purchaseServiceData = [
    {
      status: "Menunggu Konfirmasi",
      count: service ? service.pending : "",
      icon: <IoIosHourglass className="text-2xl text-primary" />,
    },
    {
      status: "Menunggu Pembayaran",
      count: service ? service.confirmed : "",
      icon: <IoWalletOutline className="text-2xl text-primary" />,
    },
    {
      status: "Dijadwalkan",
      count: service ? service.paid : "",
      icon: <FaRegCalendarCheck className="text-2xl text-primary" />,
    },
    {
      status: "Selesai",
      count: service ? service.DONE : '',
      icon: <IoCheckmarkCircleOutline className="text-2xl text-primary" />,
    },
    {
      status: "Diulas",
      count: service ? service.DONE : '',
      icon: <PiListStar className="text-2xl text-primary" />,
    },
  ];

  const tabs = [
    {
      name: "product",
      label: "Pembelian Produk",
      content: (
        <div className="grid grid-cols-1 gap-3 mt-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {purchaseProductData.map((purchase, index) => (
            <Link to={"/user/dashboard/transaction"} key={index}>
              <div className="flex gap-3 items-center p-3 rounded-xl bg-tertiary/[0.08]">
                <div className="relative p-3 rounded-xl bg-tertiary/20">
                  {purchase.count > 0 && (
                    <span
                      className="absolute top-0 right-0 flex items-center justify-center -mt-1 -mr-1 text-xs font-semibold text-white rounded-full bg-customRed"
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
        <div className="grid grid-cols-1 gap-3 mt-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {purchaseServiceData.map((purchase, index) => (
            <Link to={"/user/dashboard/transaction"} key={index}>
              <div className="flex gap-3 items-center p-3 rounded-xl bg-tertiary/[0.08]">
                <div className="relative p-3 rounded-xl bg-tertiary/20">
                  {purchase.count > 0 && (
                    <span
                      className="absolute top-0 right-0 flex items-center justify-center -mt-1 -mr-1 text-xs font-semibold text-white rounded-full bg-customRed"
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
      <div className="flex flex-col gap-2 p-3 border rounded-xl">
        <div className="p-3 py-5 border rounded-xl bg-gray-50">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Welcome Section */}
        <div className="grid grid-cols-1 gap-2 mt-2 xl:grid-cols-2">

          {loading ? (
            <></>
          ) : (
            <>
              <div className="relative grid h-full grid-cols-2 px-10 py-16 text-white bg-gradient-to-r from-primary to-tertiary rounded-2xl">
                <div>
                  <p>Selamat Datang,</p>
                  <h1 className="px-2 mt-2 text-2xl font-semibold font-crimson md:text-4xl bg-gradient-to-r from-brick to-transparent w-fit">
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

              <Link to={`/user/dashboard/profil`}>
                <div className="h-full">
                  <div className="relative grid h-full grid-cols-2 p-5 overflow-hidden rounded-2xl bg-gradient-to-r from-brick to-lightBrick">
                    <div>
                      <img
                        src={user.profile_picture}
                        alt="User Profile"
                        className="object-cover w-24 h-24 md:w-32 md:h-32 rounded-xl "
                      />
                      <div className="mt-3 text-white">
                        <h2 className="text-xl font-semibold">{user.name}</h2>
                        <p>{user.email}</p>
                      </div>
                    </div>
                    <div className="flex flex-col text-white text-start md:text-end font-crimson">
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
            </>
          )}

        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="p-6">
            <div className="text-lg font-semibold">
              <p className="mb-2">Pembelian Anda</p>
              <Tabs tabs={tabs} />
            </div>
          </div>
        )}

      </div>
    </UserDashboardLayout>
  );
};

export default DashboardUser;
