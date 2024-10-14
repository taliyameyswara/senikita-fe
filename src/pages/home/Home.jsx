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
      .catch((err) => { console.error("Error fetching categories:", err); });
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
    fetchProductsAndServices(null, category === "Semua Kategori" ? null : category);
  };

  return (
    <div>
      {loading ? (
        <FullPageLoader />
      ) : (
        <>
          <Navbar />
          <div className="container relative px-6 pt-10">
            <div className="relative py-20 md:py-28 rounded-3xl ">
              <div
                className="absolute inset-0 z-10 opacity-100 bg-gradient-to-r from-primary to-tertiary rounded-3xl"
              ></div>
              <div
                className="absolute inset-0 z-20 bg-center bg-cover opacity-30 rounded-3xl"
                style={{
                  backgroundImage: `url(${HeroTexture})`,
                }}
              ></div>
              <div className="z-30 grid grid-cols-1 gap-5 md:grid-cols-3">
                <div className="">
                  <div className="absolute lg:-bottom-3 lg:w-[40%] lg:left-14 w-[70%] -top-12 right-1/4 z-20">
                    <img
                      src={HeroImage}
                      alt=""
                      className="h-full -rotate-3 scale-x-[-1]"
                      style={{ userSelect: "none", pointerEvents: "none" }}
                    />
                  </div>
                </div>
                <div className="z-20 col-span-2 pl-32 pr-24">
                  <div className="flex flex-col gap-[0.4rem] text-white">
                    <p>Selamat Datang,</p>
                    <h1 className="text-2xl font-semibold text-white font-raleway md:text-3xl">
                      Jelajahi
                      <span className="p-2 ml-2 bg-brick/80 rounded-xl">
                        Seni dan Kebudayaan Daerah
                      </span>
                    </h1>
                    <p>
                      Senikita merupakan marketplace pertama yang mempertemukan produk
                      dan jasa kesenian di Indonesia, tempat untuk menemukan berbagai
                      karya seni dan layanan dari seniman lokal di Indonesia.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mb-10">
              <div className="absolute z-30 flex items-center justify-between w-3/4 h-16 px-4 bg-white shadow-lg rounded-2xl -bottom-8">
                <div className="grid w-full grid-cols-2">
                  <div className="flex items-center gap-3">
                    <div className="mr-4 font-semibold">Telusuri</div>
                    <div className="flex items-center w-full gap-2 mr-4 border-r">
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
                        width="w-72"
                      />
                    </div>
                  </div>
                  <div>
                    <CustomSearchInput
                      placeholder="Cari kota..."
                      mapData={(city) => city.name + " " + city.province.name}
                      handleSelect={handleSelectLocation}
                      itemsData={cities}
                      disabled={false}
                    />
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
