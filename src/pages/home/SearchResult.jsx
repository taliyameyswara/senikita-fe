import React, { useState, useEffect } from "react";
import Selection from "../../components/Selection";
import Navbar from "../../components/navbar/Navbar";
import Breadcrumbs from "../../components/Breadcrumbs";
import Heading from "../../components/Heading";
import Tabs from "../../components/Tabs";
import SearchInput from "../../components/form-input/SearchInput";
import ProductCard from "../../components/card/ProductCard";
import ToggleButton from "../../components/ToggleButton";
import { FaStar } from "react-icons/fa";
import { IoFilterOutline } from "react-icons/io5";
import { ProductData } from "../../utils/ProductData";
import { useLocation, useNavigate } from "react-router-dom";
import { useAxiosInstance } from "../../config/axiosConfig";
import EmptyState from "../../components/EmptyState";

const keyword = "seni tari";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const SearchResult = ({ setProgress }) => {
  // const products = ProductData;
  const axiosInstance = useAxiosInstance();
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleCharacterChange = (selectedOption) => {
    setSelectedCharacter(selectedOption);
  };
  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Hasil Pencarian", to: "/searchresult" },
  ];

  const query = useQuery().get("search");
  const page = useQuery().get("page") || 1;
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1); // Total halaman dari API
  const navigate = useNavigate();
  useEffect(() => {
    setProgress(30);
    // Fungsi untuk memanggil kedua API secara bersamaan
    const fetchData = async () => {
      setProgress(70);
      setLoading(true);
      try {
        // Memanggil kedua API secara bersamaan menggunakan Promise.all
        const [productsResponse, servicesResponse] = await Promise.all([
          axiosInstance.get(`products?search=${query}&page=${page}`),
          axiosInstance.get(`service?search=${query}&page=${page}`),
        ]);

        setProducts(productsResponse.data.data.data);
        setServices(servicesResponse.data.data.data);

        // Ambil total halaman (misalkan dari respons produk)
        setTotalPages(productsResponse.data.data.last_page);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        setProgress(100);
      }
    };

    fetchData();
  }, [query, page]);

  const ProductContent = () => (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products && products.length > 0 ? (
          products.map((product, index) => (
            <div key={index}>
              <ProductCard product={product} type={"Product"} />
            </div>
          ))
        ) : (
          <div className="text-center col-span-full">
            <EmptyState message="Produk tidak ditemukan" />
          </div>
        )}
      </div>
    </div>
  );

  const ServiceContent = () => (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {services && services.length > 0 ? (
          services.map((service, index) => (
            <div key={index}>
              <ProductCard product={service} type={"Service"} />
            </div>
          ))
        ) : (
          <div className="text-center col-span-full">
            <EmptyState message="Jasa tidak ditemukan" />
          </div>
        )}
      </div>
    </div>
  );

  const tabs = [
    { name: "product", label: "Produk Kesenian", content: <ProductContent /> },
    { name: "service", label: "Jasa Kesenian", content: <ServiceContent /> },
  ];

  // Filter location
  const handleLocationSelect = (item) => {
    console.log("Selected item:", item);
  };
  const mapData = (item) => item.name;

  // Filter price
  const [selectedPriceOptions, setSelectedPriceOptions] = useState([]);
  const priceOptions = [
    { value: "0-100000", label: "Rp 0 - Rp 100.000" },
    { value: "100000-500000", label: "Rp 100.000 - Rp 500.000" },
    { value: "500000-1000000", label: "Rp 500.000 - Rp 1.000.000" },
    { value: "1000000-5000000", label: "Rp 1.000.000 - Rp 5.000.000" },
    { value: "5000000-10000000", label: "Rp 5.000.000 - Rp 10.000.000" },
    { value: "10000000+", label: "Di atas Rp 10.000.000" },
  ];
  const handlePriceSelect = (selected) => {
    setSelectedPriceOptions(selected);
  };

  // Filter rating
  const [selectedRatingOptions, setSelectedRatingOptions] = useState([]);
  const generateRatingOptions = () => {
    const maxRating = 5;
    return Array.from({ length: maxRating + 1 }, (_, index) => ({
      value: index,
      label: `${index} Bintang`,
      icon: (
        <div className="flex">
          {Array.from({ length: index }, (_, i) => (
            <FaStar key={i} className="text-yellow-500" />
          ))}
        </div>
      ),
    }));
  };
  const ratingOptions = generateRatingOptions();

  const handleRatingSelect = (selected) => {
    setSelectedRatingOptions(selected);
  };

  const handleNextPage = () => {
    if (Number(page) < totalPages) {
      navigate(`/search?search=${query}&page=${Number(page) + 1}`);
    }
  };

  const handlePreviousPage = () => {
    if (Number(page) > 1) {
      navigate(`/search?search=${query}&page=${Number(page) - 1}`);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container px-6 py-2">
        {/* breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />
        {/* heading and filter */}
        <div className="flex-row justify-between md:items-center">
          {/* heading */}
          <Heading title={`Hasil Pencarian untuk '${query}'`} />

          {/* filter */}
          <div className="mb-3">
            {/* mobile */}
            <div className="block md:hidden">
              <ToggleButton icon={<IoFilterOutline />} title="Filter">
                <div className="grid grid-rows-3 gap-3 mt-3">
                  <SearchInput
                    label="Filter karakter"
                    placeholder="Cari karakter..."
                    mapData={mapData}
                    handleSelect={handleLocationSelect}
                  />
                  <Selection
                    name={"Filter harga"}
                    options={priceOptions}
                    selectedOptions={selectedPriceOptions}
                    onSelect={handlePriceSelect}
                  />
                  <Selection
                    name={"Filter rating"}
                    options={ratingOptions}
                    selectedOptions={selectedRatingOptions}
                    onSelect={handleRatingSelect}
                  />
                </div>
              </ToggleButton>
            </div>

            {/* desktop */}
            <div className="items-end hidden gap-3 md:grid md:grid-cols-3">
              <SearchInput
                // apiUrl="https://rickandmortyapi.com/api/character"
                placeholder="Filter Daerah"
                mapData={mapData}
                handleSelect={handleLocationSelect}
              />
              <Selection
                options={priceOptions}
                selectedOptions={selectedPriceOptions}
                onSelect={handlePriceSelect}
                placeholder="Filter Harga"
              />
              <Selection
                options={ratingOptions}
                selectedOptions={selectedRatingOptions}
                onSelect={handleRatingSelect}
                placeholder="Filter Rating"
              />
            </div>
          </div>
        </div>
        <Tabs tabs={tabs} />

        <div className="flex items-center justify-center  space-x-4">
          {/* Pagination controls */}
          <button
            onClick={handlePreviousPage}
            disabled={Number(page) === 1}
            className={`px-4 py-2 text-white rounded-xl text-sm lg:text-base ${
              Number(page) === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-primary"
            }`}
          >
            Sebelumnya
          </button>

          <span className="font-nunito font-light text-gray-500 text-sm lg:text-base">
            {page} dari {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={Number(page) === totalPages}
            className={`px-4 py-2 text-white rounded-xl text-sm lg:text-base ${
              Number(page) === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-primary"
            }`}
          >
            Selanjutnya
          </button>
        </div>
      </div>
      <div>{/* Pagination controls */}</div>
    </div>
  );
};

export default SearchResult;
