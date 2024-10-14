import { useState, useEffect } from "react";
import ProductList from "../../../components/card/ProductList";
import { useAxiosInstance } from "../../../config/axiosConfig";
import PromotionImage from "../../../assets/home/promotion.png";
import Heading from "../../../components/Heading";

const PromotionSection = () => {
  const axiosInstance = useAxiosInstance();
  const [loading, setLoading] = useState(true); // State for loading
  const [service, setService] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/random-services")
      .then((res) => {
        setService(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="lg:mt-20 mt-10">
      <div className="md:py-10 py-10 bg-gradient-to-r from-primary to-tertiary ">
        {loading ? (
          <div>Loading...</div> // Display this while loading
        ) : (
          <div className="relative">
            <div className="container">
              <div className="md:w-[70%] mx-4">
                <div className="bg-white rounded-2xl">
                  <ProductList
                    title={"Pementasan Cocok Untuk Acara Anda"}
                    products={service}
                    type={"Service"}
                    slidesToShow={3}
                  />
                </div>
              </div>

              <div className="absolute hidden lg:block lg:-bottom-32 lg:w-[34%] lg:right-5 w-[70%] -top-16 right-1/2 z-20 ">
                <img
                  src={PromotionImage}
                  alt=""
                  className="object-cover h-full"
                  style={{ userSelect: "none", pointerEvents: "none" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromotionSection;
