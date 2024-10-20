import { useState, useEffect } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import UserDashboardLayout from "../../../layouts/UserDashboardLayout";
import ProductCard from "../../../components/card/ProductCard";
import { ProductData } from "../../../utils/ProductData";
import Tabs from "../../../components/Tabs";
import { useAxiosInstance } from "../../../config/axiosConfig";
import EmptyState from "../../../components/EmptyState";
import Spinner from "../../../components/loading/Spinner";

const DashboardWishlist = ({ setProgress }) => {
  const axiosInstance = useAxiosInstance();
  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/user/dashboard" },
    { label: "Daftar Wishlist", to: "/user/dashboard/transaction" },
  ];
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [service, setService] = useState([]);

  useEffect(() => {
    setProgress(30);
    // Fetch product bookmarks
    axiosInstance
      .get("/user/bookmark-product")
      .then((res) => {
        const productData = res.data.data.map((item) => item.product);
        setProducts(productData);
        setLoading(false);
        setProgress(100);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setProgress(100);
      });

    // Fetch service bookmarks
    axiosInstance
      .get("/user/bookmark-service")
      .then((res) => {
        const serviceData = res.data.data.map((item) => item.service);
        setService(serviceData);
        setLoading(false);
        setProgress(100);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setProgress(100);
      });
  }, []);

  useEffect(() => {
    console.log(products);
    console.log(service);
  });

  const ProductContent = () => (
    <div>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product, index) => (
            <div key={index}>
              <ProductCard product={product} type={"Product"} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState message="Tidak ada produk dalam wishlist" />
      )}
    </div>
  );

  const ServiceContent = () => (
    <div>
      {service.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {service.map((serviceItem, index) => (
            <div key={index}>
              <ProductCard product={serviceItem} type={"Service"} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState message="Tidak ada jasa dalam wishlist" />
      )}
    </div>
  );

  const tabs = [
    {
      name: "produk-kesenian",
      label: "Produk Kesenian",
      content: <ProductContent setProgress={setProgress} />,
    },
    {
      name: "jasa-kesenian",
      label: "Jasa Kesenian",
      content: <ServiceContent setProgress={setProgress} />,
    },
  ];

  return (
    <UserDashboardLayout pageTitle="Dashboard | Wishlist">
      <div className="flex flex-col gap-2 p-3 border rounded-xl">
        {/* Breadcrumb */}
        <div className="p-3 py-5 border rounded-xl bg-gray-50">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 p-3">
          {/* Title */}
          <div className="text-xl font-semibold">Daftar Wishlist</div>
          {loading ? <Spinner /> : <Tabs tabs={tabs} />}
        </div>
      </div>
    </UserDashboardLayout>
  );
};

export default DashboardWishlist;
