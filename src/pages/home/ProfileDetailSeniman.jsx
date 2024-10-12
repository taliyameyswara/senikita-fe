import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams for getting the URL parameters
import { useAxiosInstance } from "../../config/axiosConfig";
import Navbar from "../../components/navbar/Navbar";
import MainFooter from "../../components/footer/Footer";
import ProductList from "../../components/card/ProductList";
import Review from "../../components/review/Review";
import { FaStar } from "react-icons/fa";
import Tabs from "../../components/Tabs";
import ReviewTab from "../../components/review/ReviewTab";

const ProfileDetailSeniman = ({ setProgress }) => {
  const { id } = useParams();
  const axiosInstance = useAxiosInstance();
  const [seniman, setSeniman] = useState(null);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setProgress(30);
    axiosInstance
      .get(`/shops/${id}`)
      .then((res) => {
        const data = res.data.data;
        setSeniman(data);
        setProducts(data.products || []);
        setProgress(100);
        setServices(data.services || []);
        setProgress(100);
      })
      .catch((err) => {
        console.error("Error fetching seniman details:", err);
        setProgress(100);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const reviews = [
    // {
    //   name: "John Doe",
    //   date: "12 Oktober 2024",
    //   rating: 4.0,
    //   comment:
    //     "Produk ini sangat bagus dan sesuai ekspektasi. Kualitasnya sangat baik!",
    //   image: [
    //     "https://via.placeholder.com/150",
    //     "https://via.placeholder.com/150",
    //   ],
    //   productName: "Patung Naga",
    //   price: 10000,
    // },
    // {
    //   name: "Jane Smith",
    //   date: "10 Oktober 2024",
    //   rating: 4.0,
    //   comment: "Kualitas produk cukup bagus, namun pengirimannya agak lambat.",
    //   image: [],
    //   productName: "Wayang Kulit",
    //   price: 10000,
    // },
  ];

  const tabs = [
    {
      name: "product",
      label: "Produk Kesenian",
      content: (
        <ProductList
          title="Produk dari Seniman"
          products={products}
          type="Product"
        />
      ),
    },
    {
      name: "service",
      label: "Jasa Kesenian",
      content: (
        <ProductList
          title="Jasa dari Seniman"
          products={services}
          type="Service"
        />
      ),
    },
    {
      name: "review",
      label: "Ulasan",
      content: <ReviewTab reviews={reviews} />,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container px-6">
        <div className="pt-5">
          <div className="">
            <div className="p-6 mb-3 bg-white border rounded-xl">
              <div className="flex items-center gap-4 text-sm">
                <img
                  src={
                    seniman?.profile_picture ||
                    "https://via.placeholder.com/100"
                  } // Use optional chaining for safe access
                  alt={seniman?.name || "Seniman"} // Fallback name if seniman is null
                  className="object-cover w-16 h-16 rounded-full"
                />
                <div className="flex flex-wrap justify-between w-full">
                  <div>
                    <div className="text-lg font-semibold">{seniman?.name}</div>
                    <div className="text-gray-600">{seniman?.region}</div>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <div className="text-center">
                      <div className="flex items-center gap-2">
                        <FaStar className="text-yellow-500 text-lg" />
                        <div className="text-lg font-bold font-nunito">
                          {seniman?.rating}
                        </div>
                      </div>
                      <div className="text-gray-400 text-xs">
                        Rating & Ulasan
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold font-nunito">
                        {seniman?.sold}
                      </div>
                      <div className="text-gray-400 text-xs ">Penjualan</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold font-nunito ">
                        {products.length}
                      </div>
                      <div className="text-gray-400 text-xs">Jumlah Produk</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold font-nunito">
                        {services.length}
                      </div>
                      <div className="text-gray-400 text-xs">Jumlah Jasa</div>
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
