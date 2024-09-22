import { useState } from "react";
import Slider from "react-slick";
import { formatNumber } from "../../utils/formatNumber";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoCartOutline, IoHeartOutline, IoHeart } from "react-icons/io5";
import { Link } from "react-router-dom";
import LikeButton from "../LikeButton";

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white bg-opacity-85 p-2 rounded-full text-primary z-10 hover:bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    onClick={onClick}
  >
    <FaChevronLeft size={10} />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white bg-opacity-85 p-2 rounded-full text-primary z-10 hover:bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    onClick={onClick}
  >
    <FaChevronRight size={10} />
  </button>
);

const ProductCard = ({ product }) => {
  const { category, name, price, rating, region, sold, images } = product;
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

  return (
    <Link to={`/productdetails`}>
      <div className="bg-white rounded-xl overflow-hidden md:mr-4 mr-2 md:mb-4 mb-2">
        {/* image slider */}
        <div className="relative group overflow-hidden rounded-xl">
          <Slider {...settings}>
            {images.slice(0, 5).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={name}
                className="w-full h-48 object-cover"
              />
            ))}
          </Slider>
          {/* like & cart */}
          <div className="absolute top-2 right-3 space-y-2 space-x-2">
            {/* like */}
            <LikeButton />
            {/* cart */}
            <button className="bg-white p-2 rounded-full border hover:bg-gray-100">
              <IoCartOutline className="text-gray-700 text-sm md:text-base" />
            </button>
          </div>
        </div>

        {/* product info */}
        <div className="py-1">
          {/* category */}
          <span className="text-xs text-tertiary">{category}</span>
          {/* product name */}
          <h3 className="md:text-base text-sm">{name}</h3>
          {/* Price */}
          <span className="md:text-lg font-semibold font-nunito">
            {formatNumber(price)}
          </span>
          {/* Store Name */}
          <p className="text-gray-500 md:text-sm text-xs">{region}</p>
          {/* Rating */}
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-400" />
              <span className="md:text-sm text-xs text-gray-500 font-nunito">
                {rating}
              </span>
            </div>
            <div className="md:text-sm text-xs text-gray-500"> | </div>
            <div className="md:text-sm text-xs text-gray-500 font-nunito">
              Terjual {sold}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
