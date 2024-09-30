import { useState } from "react";
import Slider from "react-slick";
import { formatNumber } from "../../utils/formatNumber";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoCartOutline, IoHeartOutline, IoHeart } from "react-icons/io5";
import { Link } from "react-router-dom";
import LikeButton from "../LikeButton";

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
  const { id, category, shop, name, price, rating_count, sold, images, thumbnail } = product;
  const createSlug = (name) => {
    return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  };
  const categoryName = category.name;
  const shopName = shop.name;
  const region = shop.region;
  const slug = createSlug(name) + createSlug(shopName);
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
  const imageSlider = images && images.length > 0
    ? [thumbnail, ...images.map(image => image.picture)]
    : [thumbnail];



  return (
    <Link to={type === 'Product' ? `/product/${id}-${slug}` : `/service/${id}-${slug}`}>
      <div className="mb-2 mr-2 overflow-hidden bg-white rounded-xl md:mr-4 md:mb-4">
        {/* image slider */}
        <div className="relative overflow-hidden group rounded-xl">
          {images && images.length > 0 ? (
            // Jika ada gambar, render gambar
            <Slider {...settings}>
              {imageSlider.slice(0, 5).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={name}
                  className="object-cover w-full h-48"
                />
              ))}
            </Slider>
          ) : (
            // Jika tidak ada gambar, render thumbnail
            <img
              src={thumbnail}
              alt={name}
              className="object-cover w-full h-48"
            />
          )}

          {/* <Slider {...settings}>
            {images.slice(0, 5).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={name}
                className="object-cover w-full h-48"
              />
            ))}
          </Slider> */}
          {/* like & cart */}
          {/* <div className="absolute space-x-2 space-y-2 top-2 right-3"> */}
          {/* like */}
          {/* <LikeButton /> */}
          {/* cart */}
          {/* <button className="p-2 bg-white border rounded-full hover:bg-gray-100"> */}
          {/* <IoCartOutline className="text-sm text-gray-700 md:text-base" /> */}
          {/* </button> */}
          {/* </div> */}
        </div>

        {/* product info */}
        <div className="py-1">
          {/* category */}
          <span className="text-xs text-tertiary">{categoryName}</span>
          {/* product name */}
          <h3 className="text-sm md:text-base">{name}</h3>
          {/* Price */}
          <span className="font-semibold md:text-lg font-nunito">
            {formatNumber(price)}
          </span>
          {/* Store Name */}
          <p className="text-xs text-gray-500 md:text-sm">{region}</p>
          {/* rating_count */}
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-400" />
              <span className="text-xs text-gray-500 md:text-sm font-nunito">
                {rating_count}
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