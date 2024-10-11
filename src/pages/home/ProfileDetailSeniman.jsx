import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams for getting the URL parameters
import { useAxiosInstance } from "../../config/axiosConfig";
import Navbar from "../../components/navbar/Navbar";
import MainFooter from "../../components/footer/Footer";
import ProductList from "../../components/card/ProductList";
import Review from "../../components/review/Review";
import { FaStar } from "react-icons/fa";
import Tabs from "../../components/Tabs";

const ProfileDetailSeniman = () => {
  const { id } = useParams();
  const axiosInstance = useAxiosInstance();
  const [seniman, setSeniman] = useState(null);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSenimanDetails = async () => {
      try {
        const response = await axiosInstance.get(`/shops/${id}`);
        setSeniman(response.data.data);
        setProducts(response.data.data.products || []);
        setServices(response.data.data.services || []);
      } catch (err) {
        console.error("Error fetching seniman details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSenimanDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!seniman) {
    return <div>No seniman found</div>;
  }

  const tabs = [
    {
      name: "product",
      label: "Produk Kesenian",
      content: (
        <ProductList
          title={"Produk dari Seniman"}
          products={products}
          type={"Product"}
        />
      ),
    },
    {
      name: "service",
      label: "Jasa Kesenian",
      content: (
        <ProductList
          title={"Jasa dari Seniman"}
          products={services} // Assuming services are still available in seniman
          type={"Service"}
        />
      ),
    },
    {
      name: "review",
      label: "Ulasan",
      content: <Review review={seniman.reviews} />, // Assuming you have a review component
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="pt-5">
          <div className="">
            <div className="p-6 mb-3 bg-white border rounded-xl">
              <div className="flex items-center gap-4 text-sm">
                <img
                  src={
                    seniman.profile_picture || "https://via.placeholder.com/100"
                  }
                  alt={seniman.name}
                  className="object-cover w-16 h-16 rounded-full"
                />
                <div className="flex flex-wrap justify-between w-full">
                  <div>
                    <div className="text-lg font-semibold">{seniman.name}</div>
                    <div className="text-gray-600">{seniman.region}</div>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <div className="">
                      <div className="flex items-center justify-center gap-2">
                        <FaStar className="text-yellow-500 text-lg" />
                        <div className="text-lg font-nunito font-bold text-center">
                          {seniman.rating}
                        </div>
                      </div>
                      <div className="text-gray-400 text-xs text-center">
                        Rating & Ulasan
                      </div>
                    </div>
                    <div className="">
                      <div className="text-lg font-nunito font-bold text-center">
                        {seniman.sold}
                      </div>
                      <div className="text-gray-400 text-xs text-center">
                        Penjualan
                      </div>
                    </div>
                    <div className="">
                      <div className="text-lg font-nunito font-bold text-center">
                        {products.length} {/* Display the number of products */}
                      </div>
                      <div className="text-gray-400 text-xs text-center">
                        Jumlah Produk
                      </div>
                    </div>
                    <div className="">
                      <div className="text-lg font-nunito font-bold text-center">
                        {seniman.services.length}
                      </div>
                      <div className="text-gray-400 text-xs text-center">
                        Jumlah Jasa
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Tabs tabs={tabs} />
            </div>
          </div>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default ProfileDetailSeniman;
