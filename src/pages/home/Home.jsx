import { useState, useEffect } from "react";
import Hero from "../../components/hero/Hero";
import ProductList from "../../components/card/ProductList";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import CategorySection from "./landing/CategorySection";
import { useAxiosInstance } from "../../config/axiosConfig";
import RegisterSenimanSection from "./landing/RegisterSenimanSection";

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
        setLoading(false); // Stop loading after data is received
      })
      .catch((err) => {
        setLoading(false); // Stop loading even if there's an error
      });

    axiosInstance
      .get("/random-services")
      .then((res) => {
        setService(res.data.data);
        setLoading(false); // Stop loading after data is received
      })
      .catch((err) => {
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  return (
    <div>
      <Navbar />
      <Hero />
      {loading ? (
        <div>Loading...</div> // Display this while loading
      ) : (
        <>
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

          <RegisterSenimanSection />
          <CategorySection />
        </>
      )}
      <Footer />
    </div>
  );
};

export default Home;
