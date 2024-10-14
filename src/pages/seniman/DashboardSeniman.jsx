import { useContext, useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Welcoming from "../../assets/home/client1.png";
import { UserContext } from "../../context/UserContext";
import { IoWalletOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import SenimanDashboardLayout from "../../layouts/SenimanDashboardLayout";
import { IoMdPaper } from "react-icons/io";
import { PiPaintBrush } from "react-icons/pi";
import { limitText } from "../../utils/limitText";
import { formatNumber } from "../../utils/formatNumber";
import { LuBox } from "react-icons/lu";
import GradientChart from "../../components/GradientChart";
import FullPageLoader from "../../components/loading/FullPageLoader";
import Tabs from "../../components/Tabs";
import ProductTransactionCard from "../user/transaction/product/ProductTransactionCard";
import ServiceTransactionCard from "../user/transaction/service/ServiceTransactionCard";
import CardButton from "../user/transaction/CardButton";
import CardHeader from "../user/transaction/CardHeader";
import { useAxiosInstance } from "../../config/axiosConfig"
import EmptyState from "../../components/EmptyState";

const DashboardSeniman = () => {
  const { user, loading } = useContext(UserContext);
  const [countProduct, setCountProduct] = useState(0);
  const [countService, setCountService] = useState(0);
  const [totalCount, setTotalCount] = useState(0); // Tambahkan state untuk total
  const [totalPendapatan, setTotalPendapatan] = useState(0)
  const [lowStock, setLowStock] = useState([]);
  const [pendingProduct, setPendingProduct] = useState([]);
  const [pendingService, setPendingService] = useState([]);
  const axiosInstance = useAxiosInstance();
  const [loadingData, setLoadingData] = useState(false);

  const getCountProductOrder = () => {
    axiosInstance.get('/user/shop/service/sold-count')
      .then((res) => {
        console.log(res.data.sold_count)
        setCountService(res.data.sold_count)
      }).catch((error) => {
        console.log(error.response)
      })
  }

  const getCountServiceOrder = () => {
    axiosInstance.get('/user/shop/products/sold-count')
      .then((res) => {
        console.log(res.data.sold_products_count)
        setCountProduct(res.data.sold_products_count)
      }).catch((error) => {
        console.log(error.response)
      })
  }

  const getLowStockProduct = () => {
    axiosInstance.get('/user/shop/products/low-stock')
      .then((res) => {
        console.log(res.data.low_stock_products)
        setLowStock(res.data.low_stock_products)
      }).catch((err) => {
        console.log(err.response)
      })
  }


  const getPendingService = () => {
    axiosInstance.get('/user/shop/order-service/pending-delivery')
      .then((res) => {
        console.log(res.data.data)
        setPendingService(res.data.data)
      }).catch((err) => {
        console.log(err.response)
      })
  }
  const getPendingProduct = () => {
    axiosInstance.get('/user/shop/order-product/pending-delivery')
      .then((res) => {
        console.log(res.data.data)
        setPendingProduct(res.data.data)
      }).catch((err) => {
        console.log(err.response)
      })
  }

  const getTotalPendapatan = () => {
    axiosInstance.get('/user/shop/revenue')
      .then((res) => {
        console.log(res.data.revenue);
        setTotalPendapatan(res.data.revenue);
      }).catch((err) => {
        console.log(err.response)
      })
  }

  // /user/shop/order-product/pending-delivery

  useEffect(() => {
    setLoadingData(true);
    getCountProductOrder();
    getCountServiceOrder();
    getLowStockProduct();
    getPendingProduct();
    getPendingService();
    getTotalPendapatan();
    setLoadingData(false);
  })

  useEffect(() => {
    setTotalCount(countProduct + countService);
  }, [countProduct, countService]);

  if (loading) {
    return <FullPageLoader />;
  }
  if (loadingData) {
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
      count: countProduct ?? 0,
      icon: <LuBox className="text-2xl" />,
      color:
        "bg-gradient-to-tr from-lightBrick/10 via-white to-white border-lightBrick/10",
    },
    {
      label: "Total Jasa Terjual",
      count: countService ?? 0,
      icon: <PiPaintBrush className="text-2xl" />,
      color:
        "bg-gradient-to-tr from-customGreen/10 via-white to-white border-customGreen/10",
    },
    {
      label: "Total Transaksi",
      count: totalCount ?? 0,
      icon: <IoMdPaper className="text-2xl" />,
      color:
        "bg-gradient-to-tr from-tertiary/10 via-white to-white border-tertiary/10",
    },
    {
      label: "Jumlah Pendapatan",
      count: totalPendapatan ? formatNumber(totalPendapatan) : "",
      icon: <IoWalletOutline className="text-2xl" />,
      color:
        "bg-gradient-to-tr from-blue-500/10 via-white to-white border-blue-500/10",
    },
  ];

  // const pendingProduct = [
  //   {
  //     id: 1,
  //     product: {
  //       name: "Lukisan Abstrak",
  //       price: 500000,
  //       thumbnail: "https://via.placeholder.com/150",
  //     },
  //     quantity: 2,
  //     customer: "Lalau",
  //     no_transaction: "INV-20231012-0001",
  //     created_at: "2023-10-12T10:30:00Z",
  //     payment_status: "success",
  //     shipping_status: "diproses",
  //   },
  //   {
  //     id: 2,
  //     product: {
  //       name: "Patung Kayu",
  //       price: 750000,
  //       thumbnail: "https://via.placeholder.com/150",
  //     },
  //     quantity: 1,
  //     customer: "Lalai",
  //     no_transaction: "INV-20231012-0002",
  //     created_at: "2023-10-11T09:00:00Z",
  //     payment_status: "success",
  //     shipping_status: "diproses",
  //   },
  // ];

  // const pendingService = [
  //   {
  //     id: 1,
  //     service: {
  //       name: "Tari Tradisional Bali",
  //       price: 1500000,
  //       thumbnail: "https://via.placeholder.com/150",
  //     },

  //     customer: "Budi",
  //     no_transaction: "INV-20231012-0003",
  //     created_at: "2023-10-10T12:45:00Z",
  //     payment_status: "pending",
  //     shipping_status: "pending",
  //   },
  //   {
  //     id: 2,
  //     service: {
  //       name: "Pentas Musik Tradisional",
  //       price: 2000000,
  //       thumbnail: "https://via.placeholder.com/150",
  //     },
  //     customer: "Lala",
  //     no_transaction: "INV-20231012-0004",
  //     created_at: "2023-10-09T11:00:00Z",
  //     payment_status: "pending",
  //     shipping_status: "pending",
  //   },
  // ];

  const tabs = [
    {
      name: "product",
      label: "Transaksi Produk",
      content: (
        <div className="flex flex-col ">
          {pendingProduct.length > 0 ? (

            pendingProduct.map((transaction) => (
              <ProductTransactionCard
                key={transaction.id}
                product={transaction.product}
                quantity={transaction.quantity}
                header={
                  <CardHeader
                    item={transaction.product}
                    payment={transaction.payment_status}
                    shipping={transaction.shipping_status}
                    type={"product"}
                    invoice={transaction.no_transaction}
                    date={transaction.created_at}
                    customer={transaction.customer}
                  />
                }
                button={
                  <CardButton
                    buttonLink={`seniman/dashboard/order`}
                    buttonLabel="Lihat Detail Transaksi"
                  />
                }
              />
            ))

          ) : (
            <EmptyState message={"Tidak ada transaksi yang perlu diproses"} />
          )
          }
        </div>
      ),
    },
    {
      name: "service",
      label: "Transaksi Jasa",
      content: (
        <div className="flex flex-col ">
          {pendingService.length > 0 ? (pendingService.map((transaction) => (
            <ServiceTransactionCard
              key={transaction.id}
              service={transaction.service}
              quantity={transaction.quantity}
              header={
                <CardHeader
                  item={transaction.service}
                  payment={transaction.payment_status}
                  shipping={transaction.shipping_status}
                  type={"service"}
                  invoice={transaction.no_transaction}
                  date={transaction.created_at}
                  customer={transaction.customer}
                />
              }
              button={
                <CardButton
                  buttonLink={`seniman/dashboard/order`}
                  buttonLabel="Lihat Detail Transaksi"
                />
              }
            />
          ))) :
            (
              <EmptyState message={"Tidak ada transaksi yang perlu diproses"} />
            )
          }
        </div>
      ),
    },
  ];

  return (
    <SenimanDashboardLayout pageTitle="Dashboard | Transaksi">
      <div className="flex flex-col gap-2 p-3 border rounded-xl">
        <div className="p-3 py-5 border rounded-xl bg-gray-50">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Welcome Section */}
        <div className="grid grid-cols-1 gap-2 mt-2 md:grid-cols-2">
          {/* Welcoming */}
          <div className="relative grid h-full grid-cols-2 p-16 px-10 text-white bg-gradient-to-r from-primary to-tertiary rounded-2xl">
            <div>
              <p>Selamat Datang, </p>
              <h1 className="px-2 mt-2 text-4xl font-semibold font-crimson bg-gradient-to-r from-brick to-transparent w-fit">
                {user.name}
              </h1>
            </div>
            <div>
              <img
                src={Welcoming}
                alt=""
                className="absolute bottom-0 object-cover left-1/3"
                style={{ userSelect: "none", pointerEvents: "none" }}
              />
            </div>
          </div>

          {/* User Profile */}
          <div className="h-full">
            <div className="h-full rounded-2xl bg-gradient-to-r from-brick to-lightBrick">
              <Link to={`/user/dashboard/profil`}>
                <div className="h-full">
                  <div className="relative h-full p-5 overflow-hidden rounded-2xl bg-gradient-to-r from-brick to-lightBrick">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://via.placeholder.com/100"
                        alt="User Profile"
                        className="object-cover w-16 h-16 md:w-20 md:h-20 rounded-xl"
                      />
                      <div className="text-white">
                        <div className="flex gap-2">
                          <p className="mb-1 text-xs">Seni Tari, Seni Kriya</p>
                        </div>
                        <h2 className="text-xl font-semibold bg-customGreen">
                          Toko Kesenian Bali
                        </h2>
                        <p>Kabupaten Buleleng, Bali</p>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-white">
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
        <div className="grid grid-cols-2 gap-3 mt-4 md:grid-cols-4">
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

        <div className="grid grid-cols-1 mt-5 space-y-5 md:grid-cols-5 md:gap-3 md:space-y-0">
          <div className="h-full col-span-3 ">
            <GradientChart />
          </div>
          <div className="flex flex-col col-span-2 p-5 border rounded-2xl">
            <div className="mb-3 text-lg font-semibold">
              Produk dengan stok kurang dari 10
            </div>
            <div className="flex flex-col gap-4">
              {lowStock.length > 0 ? (
                lowStock.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-3 border bg-gray-50 rounded-xl"
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="object-cover w-16 h-16 rounded-lg"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold">{product.name}</span>
                      <span className="text-gray-600 font-nunito">
                        Stok: {product.stock}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState message={"Produk tidak tersedia"} />
              )}
            </div>
          </div>
        </div>

        <div className="p-3">
          <div className="mb-3 text-lg font-semibold">
            Transaksi yang perlu diproses
          </div>
          <Tabs tabs={tabs} />
        </div>
      </div>
    </SenimanDashboardLayout>
  );
};

export default DashboardSeniman;
