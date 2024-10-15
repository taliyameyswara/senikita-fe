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
import DropdownFilter from "../../components/DropdownFilter";
import CustomSearchInput from "../../components/form-input/CustomSearchInput";
import HeroTexture from "../../assets/home/hero-texture2.png";
import HeroImage from "../../assets/home/hero.png";
import { IoIosList } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { useProductApi } from "../../api/landing/ProductApi";
import { useServiceApi } from "../../api/landing/ServiceApi";
import { useCityApi } from "../../api/landing/CityApi";
import { useCategoryApi } from "../../api/landing/CategoryApi";
import SkeletonLoader from "../../components/loading/SkeletonLoader";
const Home = ({ setProgress }) => {
  const axiosInstance = useAxiosInstance();

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const { fetchRandomProduct } = useProductApi();
  const { fetchRandomService } = useServiceApi();
  const { fetchAllCities } = useCityApi();
  const { fetchAllCategories } = useCategoryApi();

  const [products, setProducts] = useState([]);
  const [service, setService] = useState([]);

  // state for location handle
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null); // State untuk kota terpilih

  // state for category handle
  const [selectedStatus, setSelectedStatus] = useState("Semua Kategori");
  const [selectedCategory, setSelectedCategory] = useState(null); // State untuk kategori terpilih
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const fetchProductsAndServices = async (cityId = null, categoryId = null) => {
    try {
      setLoadingData(true);

      const [productResponse, serviceResponse] = await Promise.all([
        fetchRandomProduct(categoryId, cityId),
        fetchRandomService(categoryId, cityId),
      ]);

      setProducts(productResponse);
      setService(serviceResponse);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchCities = async () => {
    try {
      const cities = await fetchAllCities();
      setCities(cities);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const getCategory = async () => {
    try {
      const categories = await fetchAllCategories();
      const categoryOptions = categories.map((item) => item.name);
      setCategoryOptions(categoryOptions);
      setCategoryData(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setProgress(30);
      setLoading(true);

      await getCategory(); // Tunggu getCategory selesai
      setProgress(50);

      await fetchProductsAndServices(); // Tunggu fetchProductsAndServices selesai
      setProgress(80);

      await fetchCities(); // Tunggu fetchCities selesai
      setProgress(100);

      setLoading(false); // Setelah semuanya selesai
    };

    fetchData();
  }, []);


  useEffect(() => {
    if (selectedCity !== null || selectedCategory !== null) {
      fetchProductsAndServices(selectedCity, selectedCategory);
    }
  }, [selectedCity, selectedCategory]);

  const handleSelectLocation = (cityId) => {
    if (selectedCity !== cityId) {
      setSelectedCity(cityId);
    }
  };

  const handleSelectCategory = (categoryName) => {
    const selectedCategoryData = categoryData.find(item => item.name === categoryName);
    if (selectedCategoryData && selectedCategory !== selectedCategoryData.id) {
      setSelectedCategory(selectedCategoryData.id);
    }
  };




  return (
    <div>
      {loading ? (
        <FullPageLoader />
      ) : (
        <>
          <Navbar />
          <div className="container relative px-6 pt-10">
            <div className="relative pt-20 pb-12 lg:py-28 md:py-16 rounded-3xl">
              <div className="absolute inset-0 z-10 opacity-100 bg-gradient-to-r from-primary to-tertiary rounded-3xl"></div>
              <div
                className="absolute inset-0 z-20 bg-center bg-cover opacity-30 rounded-3xl"
                style={{
                  backgroundImage: `url(${HeroTexture})`,
                }}
              ></div>
              <div className="z-30 grid grid-cols-1 gap-5 md:grid-cols-3 2xl:grid-cols-4">
                <div className="">
                  <div className="absolute lg:-bottom-3 lg:w-[40%] md:w-[48%] w-[80%] lg:left-14 md:left-6 right-[10%] -top-12 z-20">
                    <img
                      src={HeroImage}
                      alt=""
                      className="h-full -rotate-3 scale-x-[-1]"
                      style={{ userSelect: "none", pointerEvents: "none" }}
                    />
                  </div>
                </div>

                {/* text */}
                <div className="z-20 col-span-2 px-5 lg:pl-32 lg:pr-24 md:pl-36 md:mt-0 mt-28">
                  <div className="flex flex-col gap-[0.4rem] text-white">
                    <p className="text-sm lg:text-base">Selamat Datang,</p>
                    {/* desktop */}
                    <h1 className="hidden text-xl font-semibold text-white font-raleway lg:block lg:text-3xl">
                      Jelajahi
                      <span className="p-2 ml-2 bg-brick/80 rounded-xl">
                        Seni Kebudayaan Daerah
                      </span>
                    </h1>
                    {/* mobile */}
                    <div className="block text-xl font-semibold text-white lg:hidden font-raleway lg:text-3xl">
                      <h1 className="">Jelajahi</h1>
                      <h2 className="flex p-2 bg-brick/80 rounded-xl w-fit">
                        Seni Kebudayaan Daerah
                      </h2>
                    </div>

                    {/* desktop */}
                    <p className="hidden text-sm lg:text-base lg:block">
                      Senikita merupakan marketplace pertama yang mempertemukan
                      produk dan jasa kesenian di Indonesia, tempat untuk
                      menemukan berbagai karya seni dan layanan dari seniman
                      lokal di Indonesia.
                    </p>

                    {/* mobile */}
                    <p className="block text-sm lg:text-base lg:hidden">
                      Temukan karya seni dan layanan dari seniman lokal dengan
                      Senikita. Marketplace pertama produk dan jasa kesenian di
                      Indonesia
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* search filter */}
            <div className="flex justify-center mb-10 ">
              <div className="absolute z-30 flex items-center justify-between w-3/4 h-16 px-4 bg-white shadow-lg rounded-2xl -bottom-8">
                {/*  */}
                <div className="grid w-full lg:grid-cols-2">
                  <div className="flex items-center w-full gap-3">
                    <div className="hidden mr-4 font-semibold lg:block">
                      Telusuri
                    </div>
                    <div className="items-center hidden w-full gap-2 mr-5 border-r lg:flex">
                      <div className="p-2 bg-tertiary/20 rounded-xl">
                        <IoIosList className="text-xl text-primary" />
                      </div>

                      <DropdownFilter
                        title={"Status"}
                        options={categoryOptions}
                        selectedOption={selectedStatus}
                        setSelectedOption={(option) => {
                          setSelectedStatus(option);
                          handleSelectCategory(option);
                        }}
                        label="Kategori Kesenian"
                        width="xl:w-72 2xl:w-96"
                      />
                    </div>
                  </div>
                  <div className="flex items-center w-full gap-2">
                    <div className="p-2 bg-tertiary/20 rounded-xl">
                      <IoLocationSharp className="text-xl text-primary" />
                    </div>
                    <div className="w-full">
                      <CustomSearchInput
                        placeholder="Cari lokasi.."
                        mapData={(city) =>
                          city.name + ", " + city.province.name
                        }
                        handleSelect={handleSelectLocation}
                        itemsData={cities}
                        disabled={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {loadingData ?
            (
              <SkeletonLoader />
            ) :
            (
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
              </>
            )
          }

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
