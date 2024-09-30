import React, { useState } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// Custom arrow components
const PrevArrow = ({ onClick }) => (
  <button
    className="absolute top-[44%]  left-4 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow-lg text-primary z-10 hover:bg-gray-200 transition-colors duration-300"
    onClick={onClick}
  >
    <FaChevronLeft size={20} />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    className="absolute top-[44%]  right-4 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow-lg text-primary z-10 hover:bg-gray-200 transition-colors duration-300"
    onClick={onClick}
  >
    <FaChevronRight size={20} />
  </button>
);

const ImageSlider = ({ imageUrls }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handle image click to open lightbox
  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const settings = {
    customPaging: function (i) {
      return (
        <a onClick={() => handleImageClick(i)}>
          <img
            src={imageUrls[i]}
            alt={`Thumbnail ${i + 1}`}
            className="object-cover h-full rounded-lg"
          />
        </a>
      );
    },
    dots: true,
    fade: true,
    dotsClass: "custom-dots",
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <>
      <div className="relative max-w-full slider-container">
        <Slider {...settings}>
          {imageUrls.map((url, index) => (
            <img
              src={url}
              onClick={() => handleImageClick(index)}
              className="object-cover w-full rounded-xl h-60 md:h-96"
            />
          ))}
        </Slider>
      </div>

      <Lightbox
        plugins={[Thumbnails]}
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={imageUrls.map((src) => ({ src }))}
        index={currentImageIndex}
      />
    </>
  );
};

export default ImageSlider;
