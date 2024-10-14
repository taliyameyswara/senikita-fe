import React, { useEffect, useState } from "react";
import { useAxiosInstance } from "../../../config/axiosConfig";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Heading from "../../../components/Heading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5"; // Import icons
import FullPageLoader from "../../../components/loading/FullPageLoader";

// Custom ArrowButton Component
const ArrowButton = ({ onClick, direction }) => (
  <button
    className={`bg-primary bg-opacity-85 p-3 rounded-full text-white z-10 hover:bg-opacity-75 transition-opacity duration-300 absolute top-1/2 transform -translate-y-1/2 ${
      direction === "left" ? "-left-10" : "-right-10"
    }`}
    onClick={onClick}
  >
    {direction === "left" ? (
      <IoArrowBackOutline size={20} />
    ) : (
      <IoArrowForwardOutline size={20} />
    )}
  </button>
);

const PopularSenimanSection = () => {
  const axiosInstance = useAxiosInstance();
  const [seniman, setSeniman] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeniman = async () => {
      try {
        const response = await axiosInstance.get("/top-shop");
        setSeniman(response.data.data);
      } catch (err) {
        console.error("Error fetching seniman data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeniman();
  }, []);

  if (loading) {
    return <FullPageLoader />;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <ArrowButton direction="right" />,
    prevArrow: <ArrowButton direction="left" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div>
      <div className="lg:mt-20 mt-12">
        <div className="container mx-auto">
          <div className="text-center px-16">
            <Heading title={"Seniman Paling Populer"} />
            <div className="md:text-base text-sm text-gray-500">
              Seniman dengan penjualan produk atau jasa terbanyak
            </div>
          </div>

          <Slider {...sliderSettings} className="mt-10 overflow-visible">
            {seniman.map((seniman) => (
              <Link to={`/seniman/${seniman.id}`} key={seniman.id}>
                {" "}
                <div className="relative p-8">
                  <div className="bg-white rounded-2xl border-[0.5px] shadow-md border-opacity-20 border-primary relative p-8 overflow-visible">
                    <div className="absolute top-[-2rem] left-1/2 transform -translate-x-1/2 z-50">
                      <img
                        src={
                          seniman.profile_picture ||
                          "https://via.placeholder.com/100"
                        }
                        className="object-cover w-32 h-32 rounded-full shadow-lg border-primary/20"
                      />
                    </div>

                    <div className="mt-20 text-center">
                      <div className="flex justify-center gap-2 mb-3">
                        {seniman.categories.map((cat, index) => (
                          <p
                            key={index}
                            className="p-1 px-2 text-xs rounded-full bg-tertiary/10 text-primary"
                          >
                            {cat.name}
                          </p>
                        ))}
                      </div>
                      <h3 className="text-xl font-semibold text-primary">
                        {seniman.name}
                      </h3>
                      <p className="text-sm text-gray-600">{seniman.region}</p>

                      <p className="px-2 mx-auto mt-2 text-sm bg-customGreen/10 w-fit text-customGreen">
                        <span className="font-nunito">20</span> Penjualan
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default PopularSenimanSection;
