import React, { useRef } from "react";
import ProductCard from "./ProductCard";
import Heading from "../Heading";
import Slider from "react-slick";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
import EmptyState from "../EmptyState";

const ProductList = ({ title, products, type, slidesToShow = 4 }) => {
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
    slidesToShow: slidesToShow,
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

  if (!products || products.length === 0) {
    return (
      <>
        {type === "Product" ? (
          <EmptyState message={"Belum ada produk tersedia"} />
        ) : (
          <EmptyState message={"Belum ada jasa tersedia"} />
        )}
      </>
    );
  }

  return (
    <div className="container px-6">
      <div className="flex items-center justify-between">
        <Heading title={title} />

        {products.length > 1 && (
          <div className="flex items-start md:hidden">
            <ArrowButton
              direction="left"
              onClick={() => sliderRef.current.slickPrev()}
            />
            <ArrowButton
              direction="right"
              onClick={() => sliderRef.current.slickNext()}
            />
          </div>
        )}

        {products.length >= 4 && (
          <div className="items-start hidden md:flex">
            <ArrowButton
              direction="left"
              onClick={() => sliderRef.current.slickPrev()}
            />
            <ArrowButton
              direction="right"
              onClick={() => sliderRef.current.slickNext()}
            />
          </div>
        )}
      </div>

      {products.length <= 3 ? (
        <div className="flex flex-wrap justify-start gap-4">
          {products.map((product, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/4">
              <ProductCard product={product} type={type} />
            </div>
          ))}
        </div>
      ) : (
        <Slider ref={sliderRef} {...settings}>
          {products.map((product, index) => (
            <div key={index} className="">
              <ProductCard product={product} type={type} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ProductList;
