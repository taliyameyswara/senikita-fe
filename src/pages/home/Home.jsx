import { useState, useEffect } from "react";
import Hero from "../../components/hero/Hero";
import ProductList from "../../components/card/ProductList";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import CategorySection from "./landing/CategorySection";
import { useAxiosInstance } from "../../config/axiosConfig";
import RegisterSenimanSection from "./landing/RegisterSenimanSection";
import PromotionSection from "./landing/PromotionSection";
import GuideSection from "./landing/GuideSection";
import RecentReviewSection from "./landing/RecentReviewSection";
import PopularSenimanSection from "./landing/PopularSenimanSection";
import FaqSection from "./landing/FaqSection";
import ClientTestimoniSection from "./landing/ClientTestimoniSection";
import FullPageLoader from "../../components/loading/FullPageLoader";

const Home = () => {
  const axiosInstance = useAxiosInstance();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [service, setService] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/random-product")
      .then((res) => {
        setProducts(res.data.data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((err) => {
        setLoading(false); // Stop loading even if there's an error
      });

    axiosInstance
      .get("/random-services")
      .then((res) => {
        setService(res.data.data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((err) => {
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  return (
    <div>
      {loading ? (
        <FullPageLoader />
      ) : (
        <>
          <Navbar />
          <Hero />
          <ProductList
            title={"Produk Kesenian"}
            products={products}
            type={"Product"}
          />
          <ProductList
            title={"Jasa Kesenian"}
            products={service}
            type={"Service"}
          />

          <CategorySection />
          <PromotionSection />
          <PopularSenimanSection />
          <RegisterSenimanSection />
          <ClientTestimoniSection />
          <FaqSection />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
