import Navbar from "../../components/navbar/Navbar";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollTab from "../../components/ScrollTab";
import ReviewSection from "../../components/product-details/ReviewSection";
import ArtistProfileSection from "../../components/product-details/ArtistProfileSection";
import ProductList from "../../components/card/ProductList";
import { useState, useEffect } from "react";
import { useAxiosInstance } from "../../config/axiosConfig";
import { useParams } from "react-router-dom";
import ServiceDetailSection from "../../components/product-details/ServiceDetailSection";
import OrderBottomBarService from "../../components/product-details/OrderBottomBarService";

const ServiceDetails = ({ setProgress }) => {
  const { id } = useParams();
  const serviceId = id.split("-")[0]; // Ekstrak hanya ID dari URL
  const axiosInstance = useAxiosInstance();
  const [service, setService] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    setProgress(30);

    axiosInstance
      .get("/random-services")
      .then((res) => {
        setProducts(res.data.data);
        setLoading(false); // Stop loading after data is received
        setProgress(60);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Stop loading even if there's an error
        setProgress(100);
      });

    axiosInstance
      .get(`service/${serviceId}`)
      .then((res) => {
        // console.log(res.data.service);
        setService(res.data.service);
        setLoading(false); // Stop loading after data is received
        setProgress(100);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Stop loading even if there's an error
        setProgress(100);
      });
  }, []);

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
      content: <ReviewSection review={service ? service.ratings : []} />,
    },
    {
      label: "Profil Seniman",
      target: "section3",
      content: <ArtistProfileSection shop={service ? service.shop : []} />,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container px-6 py-4 mb-20">
        <Breadcrumbs items={breadcrumbItems} />
        <ScrollTab tabs={tabs} />
        <OrderBottomBarService service={service} />
        <ProductList
          title={"Produk Lainnya"}
          products={products}
          type={"Product"}
        />
      </div>
    </>
  );
};

export default ServiceDetails;
