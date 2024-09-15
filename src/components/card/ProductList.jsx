import React from "react";
import ProductCard from "./ProductCard";
import Heading from "../Heading";
import Slider from "react-slick";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";

const ProductList = ({ title, products }) => {
  const ArrowButton = ({ onClick, direction }) => (
    <button
      className={`bg-primary bg-opacity-85 p-2 rounded-full text-white z-10 hover:bg-opacity-75 transition-opacity duration-300 ${
        direction === "left" ? "mr-2" : "ml-2"
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
    <div className="px-6 container mb-6">
      <div className="flex items-center justify-between">
        <Heading title={title} />
        <div className="flex items-start">
          <ArrowButton
            direction="left"
            onClick={() => document.querySelector(".slick-prev")?.click()}
          />
          <ArrowButton
            direction="right"
            onClick={() => document.querySelector(".slick-next")?.click()}
          />
        </div>
      </div>
      <Slider {...settings}>
        {products.map((product, index) => (
          <div key={index}>
            <ProductCard product={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductList;
