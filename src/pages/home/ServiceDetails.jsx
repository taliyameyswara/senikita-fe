import Navbar from "../../components/navbar/Navbar";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollTab from "../../components/ScrollTab";
import ReviewSection from "../../components/product-details/ReviewSection";
import ArtistProfileSection from "../../components/product-details/ArtistProfileSection";
import ProductList from "../../components/card/ProductList";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ServiceDetailSection from "../../components/product-details/ServiceDetailSection";
import OrderBottomBarService from "../../components/product-details/OrderBottomBarService";
import { useServiceApi } from "../../api/landing/ServiceApi";
import FullPageLoader from "../../components/loading/FullPageLoader";
import { UserContext } from "../../context/UserContext";

const ServiceDetails = ({ setProgress }) => {
  const { id } = useParams();
  const [serviceId, setServiceId] = useState("");
  const { fetchServiceById, fetchRandomService } = useServiceApi();
  const { user } = useContext(UserContext); // Use logout from context

  useEffect(() => {
    const decryptedId = atob(id);
    const serviceId = decryptedId.split("-")[0];
    setServiceId(serviceId);
  });

  const [service, setService] = useState(null);
  const [products, setServices] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading

  const getServiceById = async (serviceId) => {
    try {
      const response = await fetchServiceById(serviceId);
      setService(response);
    } catch (error) {
      console.error("Failed to fetch service:", error);
    }
  };

  const getServices = async () => {
    try {
      const response = await fetchRandomService();
      console.log(response);
      setServices(response);
    } catch (error) {
      console.error("Failed to fetch service:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setProgress(30);
      if (serviceId) {
        await getServiceById(serviceId);
        setProgress(60);
      }
      await getServices();
      setProgress(100);
      setLoading(false);
    };

    fetchData();
  }, [serviceId, setProgress]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Produk", to: "/" },
    { label: "Seni Lukis", to: "/" },
    { label: "Nama Produk", to: "/productdetails" },
  ];
  const tabs = [
    {
      label: "Detail Produk",
      target: "section1",
      content: service ? (
        <ServiceDetailSection service={service} />
      ) : (
        <div>No Product Details Available</div>
      ),
    },
    {
      label: "Ulasan",
      target: "section2",
      content: <ReviewSection review={service ? service.ratings : []} type={"service"} />,
    },
    {
      label: "Profil Seniman",
      target: "section3",
      content: <ArtistProfileSection shop={service ? service.shop : []} />,
    },
  ];

  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <>
      <Navbar />
      <div className="container px-4 py-6 mb-20">
        <Breadcrumbs items={breadcrumbItems} />
        <ScrollTab tabs={tabs} />

        {service && user.id !== service.shop.user_id && (
          <OrderBottomBarService service={service} />
        )}
        <ProductList
          title={"Produk Lainnya"}
          products={products}
          type={"Service"}
        />
      </div>
    </>
  );
};

export default ServiceDetails;
