import { useEffect, useState } from "react";
import Slider from "react-slick";
import { formatNumber } from "../../utils/formatNumber";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { limitText } from "../../utils/limitText";

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute z-10 p-2 transition-opacity duration-300 transform -translate-y-1/2 bg-white rounded-full opacity-0 top-1/2 left-3 bg-opacity-85 text-primary hover:bg-opacity-75 group-hover:opacity-100"
    onClick={onClick}
  >
    <FaChevronLeft size={10} />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    className="absolute z-10 p-2 transition-opacity duration-300 transform -translate-y-1/2 bg-white rounded-full opacity-0 top-1/2 right-3 bg-opacity-85 text-primary hover:bg-opacity-75 group-hover:opacity-100"
    onClick={onClick}
  >
    <FaChevronRight size={10} />
  </button>
);

const ProductCard = ({ product, type }) => {
  const {
    id,
    category,
    shop,
    name,
    price,
    average_rating,
    sold,
    images,
    thumbnail,
  } = product;

  const [slug, setSlug] = useState("");
  const [textLimit, setTextLimit] = useState(30); // Initial limit for mobile screens

  useEffect(() => {
    // Function to update text limit based on screen size
    const updateTextLimit = () => {
      if (window.innerWidth >= 768) {
        setTextLimit(50); // Longer limit for larger screens
      } else {
        setTextLimit(30); // Shorter limit for smaller screens
      }
    };
    updateTextLimit();

    window.addEventListener("resize", updateTextLimit);
    return () => window.removeEventListener("resize", updateTextLimit);
  }, []);

  useEffect(() => {
    async function generateSlug() {
      const encryptedId = btoa(product.id + "-" + product.name);
      setSlug(encryptedId);
    }
    generateSlug();
  }, [product.id]);

  const categoryName = category.name;
  const region = shop.region;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          width: "100%",
        }}
      >
        <ul className="flex justify-center space-x-0">{dots}</ul>
      </div>
    ),
  };

  const imageSlider =
    images && images.length > 0
      ? [thumbnail, ...images.map((image) => image.picture)]
      : [thumbnail];

  return (
    <Link to={type === "Product" ? `/product/${slug}` : `/service/${slug}`}>
      <div className="mb-2 mr-2 overflow-hidden rounded-xl md:mr-4 md:mb-4">
        {/* Image slider */}
        <div className="relative overflow-hidden group rounded-xl">
          {images && images.length > 0 ? (
            <Slider {...settings}>
              {imageSlider.slice(0, 5).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={name}
                  className="object-cover w-full lg:h-48 h-36"
                />
              ))}
            </Slider>
          ) : (
            <img
              src={thumbnail}
              alt={name}
              className="object-cover w-full lg:h-48 h-36"
            />
          )}
        </div>

        {/* Product info */}
        <div className="py-1">
          <span className="text-xs text-tertiary">{categoryName}</span>
          <h3 className="text-sm md:text-base">{limitText(name, textLimit)}</h3>
          <span className="font-semibold md:text-lg font-nunito">
            {formatNumber(price)}
          </span>
          <p className="text-xs text-gray-500 md:text-sm">{region}</p>
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-400" />
              <span className="text-xs text-gray-500 md:text-sm font-nunito">
                {average_rating ? average_rating.toFixed(1) : 0}
              </span>
            </div>
            <div className="text-xs text-gray-500 md:text-sm"> | </div>
            <div className="text-xs text-gray-500 md:text-sm font-nunito">
              Terjual {sold}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
