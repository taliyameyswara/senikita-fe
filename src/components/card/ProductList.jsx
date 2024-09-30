import React, { useRef } from "react";
import ProductCard from "./ProductCard";
import Heading from "../Heading";
import Slider from "react-slick";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";

const ProductList = ({ title, products, type }) => {
  const sliderRef = useRef(null);

  const ArrowButton = ({ onClick, direction }) => (
    <button
      className={`bg-primary bg-opacity-85 p-2 rounded-full text-white z-10 hover:bg-opacity-75 transition-opacity duration-300 ${direction === "left" ? "mr-2" : "ml-2"
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

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    initialSlide: 0,
    draggable: false,
    swipe: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="container px-6 mb-6">
      <div className="flex items-center justify-between">
        <Heading title={title} />
        <div className="flex items-start">
          <ArrowButton
            direction="left"
            onClick={() => sliderRef.current.slickPrev()} // Use ref to go to previous slide
          />
          <ArrowButton
            direction="right"
            onClick={() => sliderRef.current.slickNext()} // Use ref to go to next slide
          />
        </div>
      </div>
      <Slider ref={sliderRef} {...settings}> {/* Attach ref to Slider */}
        {products.map((product, index) => (
          <div key={index}>
            <ProductCard product={product}
              type={type} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductList;
