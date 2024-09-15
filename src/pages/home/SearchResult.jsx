import React, { useState } from "react";
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

const keyword = "seni tari";

const SearchResult = () => {
  const products = ProductData;

  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleCharacterChange = (selectedOption) => {
    setSelectedCharacter(selectedOption);
  };
  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Hasil Pencarian", to: "/searchresult" },
  ];

  const ProductContent = () => (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <div key={index}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );

  const ServiceContent = () => (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <div key={index}>
            <ProductCard product={product} />
          </div>
        ))}
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

  return (
    <div>
      <Navbar />
      <div className="container px-6 py-4">
        {/* breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />
        {/* heading and filter */}
        <div className="flex-row justify-between md:items-center">
          {/* heading */}
          <Heading title={`Hasil Pencarian untuk '${keyword}'`} />

          {/* filter */}
          <div className="mb-3">
            {/* mobile */}
            <div className="block md:hidden">
              <ToggleButton icon={<IoFilterOutline />} title="Filter">
                <div className="grid grid-rows-3 mt-3 gap-3">
                  <SearchInput
                    name="Filter karakter"
                    apiUrl="https://rickandmortyapi.com/api/character"
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
            <div className="hidden md:grid md:grid-cols-3 gap-3 items-end">
              <SearchInput
                apiUrl="https://rickandmortyapi.com/api/character"
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
      </div>
    </div>
  );
};

export default SearchResult;
