import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxiosInstance } from "../../config/axiosConfig";
import Navbar from "../../components/navbar/Navbar";
import MainFooter from "../../components/footer/Footer";
import ProductList from "../../components/card/ProductList";
import ReviewTab from "../../components/review/ReviewTab";
import { FaStar } from "react-icons/fa";
import Tabs from "../../components/Tabs";
import ProductCard from "../../components/card/ProductCard";

const ProfileDetailSeniman = ({ setProgress }) => {
  const { id } = useParams();
  const [senimanId, setSenimanId] = useState("");
  const axiosInstance = useAxiosInstance();
  const [seniman, setSeniman] = useState(null);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const decryptedId = atob(id);
    const senimanId = decryptedId.split("-")[0];
    setSenimanId(senimanId);
  }, []);

  useEffect(() => {
    setProgress(30);
    if (senimanId) {
      axiosInstance
        .get(`/shops/${senimanId}`)
        .then((res) => {
          const data = res.data.data;
          setSeniman(data);
          setProducts(data.products || []);
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
    }
  }, [senimanId]);

  const reviews = [
    {
      user: { name: "Ali Rahman" },
      date: "1 Oktober 2024",
      productName: "Patung Naga Besar",
      price: 15000000,
      rating: 4.5,
      comment:
        "Patungnya sangat detail dan kualitasnya bagus sekali! Sangat cocok untuk koleksi.",
      rating_images: [
        {
          picture_rating_product: "https://via.placeholder.com/100",
        },
        {
          picture_rating_product: "https://via.placeholder.com/100",
        },
      ],
    },
    {
      user: { name: "Budi Santoso" },
      date: "15 September 2024",
      productName: "Wayang Kulit",
      price: 3500000,
      rating: 4,
      comment: "Wayang kulitnya keren, tetapi pengirimannya agak terlambat.",
      rating_images: [
        {
          picture_rating_product: "https://via.placeholder.com/100",
        },
      ],
    },
  ];

  const tabs = [
    {
      name: "product",
      label: "Produk Kesenian",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard key={index} product={product} type="Product" />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              Tidak ada produk yang tersedia.
            </p>
          )}
        </div>
      ),
    },
    {
      name: "service",
      label: "Jasa Kesenian",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {services.length > 0 ? (
            services.map((service, index) => (
              <ProductCard key={index} product={service} type="Service" />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              Tidak ada jasa yang tersedia.
            </p>
          )}
        </div>
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
      <div className="container mx-auto px-4 md:px-6">
        <div className="pt-5">
          <div className="p-6 mb-3 bg-white border rounded-xl">
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
              <img
                src={
                  seniman?.profile_picture || "https://via.placeholder.com/100"
                }
                alt={seniman?.name || "Seniman"}
                className="object-cover w-24 h-24 rounded-full"
              />
              <div className="flex flex-col w-full md:w-full md:flex-row md:justify-between md:items-center md:gap-4 ">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <div className="md:text-lg text-base font-semibold">
                    {seniman?.name}
                  </div>
                  <div className="text-gray-600 text-xs md:text-sm">
                    {seniman?.region}
                  </div>
                </div>
                <div className="grid grid-cols-4  gap-3 justify-center md:justify-end">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <FaStar className="text-lg text-yellow-500" />
                      <div className="md:text-lg text-base font-bold font-nunito">
                        {seniman?.rating || 0}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">Rating & Ulasan</div>
                  </div>
                  <div className="text-center">
                    <div className="md:text-lg text-base font-bold font-nunito">
                      {seniman?.sold || 0}
                    </div>
                    <div className="text-xs text-gray-400">Penjualan</div>
                  </div>
                  <div className="text-center">
                    <div className="md:text-lg text-base font-bold font-nunito">
                      {products.length}
                    </div>
                    <div className="text-xs text-gray-400">Jumlah Produk</div>
                  </div>
                  <div className="text-center">
                    <div className="md:text-lg text-base font-bold font-nunito">
                      {services.length}
                    </div>
                    <div className="text-xs text-gray-400">Jumlah Jasa</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="pt-2">
            <Tabs tabs={tabs} />
          </div>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default ProfileDetailSeniman;
