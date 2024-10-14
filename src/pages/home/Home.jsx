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

const Home = ({ setProgress }) => {
  const axiosInstance = useAxiosInstance();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Semua Kategori");
  const status = ["Semua Kategori", "Seni Tari", "Seni Musik", "Seni Rupa"];
  const [selectedCategory, setSelectedCategory] = useState(null); // State untuk kategori terpilih
  const [cities, setCities] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const fetchProductsAndServices = async (cityId = null, categoryId = null) => {
    setProgress(0);
    const params = {};
    if (cityId) params.city_id = cityId;
    if (categoryId) params.category_id = categoryId;

    try {
      const [productResponse, serviceResponse] = await Promise.all([
        axiosInstance.get(`/random-product`, { params }),
        axiosInstance.get(`/random-services`, { params }),
      ]);

      setProducts(productResponse.data.data);
      setService(serviceResponse.data.data);
      setProgress(100);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axiosInstance.get("/cities");
      if (response.data.status === "success") {
        setCities(response.data.cities);
      } else {
        console.error("Failed to fetch cities");
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const getCategory = () => {
    axiosInstance
      .get("/category")
      .then((response) => {
        const category_id = response.data.data.data.map((category) => ({
          value: category.id.toString(),
          label: category.name,
        }));
        setCategoryOptions(category_id);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  };

  useEffect(() => {
    fetchCities();
    fetchProductsAndServices();
    getCategory();
  }, []);

  const handleSelectLocation = (id) => {
    setProducts(null);
    setService(null);
    fetchProductsAndServices(id, selectedCategory);
  };

  const handleSelectCategory = (category) => {
    setProducts(null);
    setService(null);
    setSelectedCategory(category === "Semua Kategori" ? null : category);
    fetchProductsAndServices(
      null,
      category === "Semua Kategori" ? null : category
    );
  };

  return (
    <div>
      {loading ? (
        <FullPageLoader />
      ) : (
        <>
          <Navbar />
          <div className="container relative px-6 pt-10">
            <div className="pb-12 pt-20 lg:py-28 md:py-16 rounded-3xl relative">
              <div className="absolute inset-0 z-10 opacity-100 bg-gradient-to-r from-primary to-tertiary rounded-3xl"></div>
              <div
                className="absolute inset-0 z-20 bg-center bg-cover opacity-30 rounded-3xl"
                style={{
                  backgroundImage: `url(${HeroTexture})`,
                }}
              ></div>
              <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-5 z-30">
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
                <div className="lg:pl-32 lg:pr-24 md:pl-36 md:mt-0 mt-28 px-5 col-span-2 z-20">
                  <div className="flex flex-col gap-[0.4rem] text-white">
                    <p className="lg:text-base text-sm">Selamat Datang,</p>
                    {/* desktop */}
                    <h1 className="font-semibold font-raleway hidden lg:block lg:text-3xl text-xl text-white">
                      Jelajahi
                      <span className="ml-2 p-2 bg-brick/80 rounded-xl">
                        Seni Kebudayaan Daerah
                      </span>
                    </h1>
                    {/* mobile */}
                    <div className="block lg:hidden font-semibold font-raleway  lg:text-3xl text-xl text-white">
                      <h1 className="">Jelajahi</h1>
                      <h2 className="p-2 bg-brick/80 rounded-xl flex w-fit">
                        Seni Kebudayaan Daerah
                      </h2>
                    </div>

                    {/* desktop */}
                    <p className="lg:text-base text-sm hidden lg:block">
                      Senikita merupakan marketplace pertama yang mempertemukan
                      produk dan jasa kesenian di Indonesia, tempat untuk
                      menemukan berbagai karya seni dan layanan dari seniman
                      lokal di Indonesia.
                    </p>

                    {/* mobile */}
                    <p className="lg:text-base text-sm block lg:hidden">
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
              <div className="w-3/4 h-16 bg-white shadow-lg rounded-2xl absolute -bottom-8 z-30 flex items-center justify-between px-4">
                {/*  */}
                <div className="grid lg:grid-cols-2 w-full">
                  <div className="flex items-center gap-3 w-full">
                    <div className="font-semibold mr-4 hidden lg:block">
                      Telusuri
                    </div>
                    <div className="lg:flex  hidden items-center gap-2 border-r mr-5 w-full">
                      <div className="p-2 bg-tertiary/20 rounded-xl">
                        <IoIosList className="text-xl text-primary" />
                      </div>

                      <DropdownFilter
                        title={"Status"}
                        options={status}
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
                  <div className="flex items-center gap-2 w-full">
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
