import React from "react";
import ImageSlider from "../../components/ImageSlider";
import ReadMore from "../../components/ReadMore";
import { formatNumber } from "../../utils/formatNumber";
import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { BsTruck } from "react-icons/bs";

const ProductDetailSection = ({ product }) => {
  return (
    <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6 items-start">
      {/* image slider */}
      <ImageSlider imageUrls={product.images} />

      {/* product details */}
      <div className="flex flex-col">
        {/* price */}
        <span className="md:text-3xl text-2xl font-bold text-primary font-nunito">
          {formatNumber(product.price)}
        </span>
        <h1 className="md:text-3xl text-2xl text-secondary font-crimson md:my-2 my-1">
          {product.name}
        </h1>

        {/* sold + rating */}
        <div className="flex gap-2 text-sm mb-2">
          <div className="">
            Terjual <span className="font-nunito">{product.sold}</span>
          </div>
          <div className="">•</div>
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-500 mb-1" />
            <div className="text-sm font-nunito">{product.rating}</div>
            <div className="text-sm font-nunito text-gray-500">
              ({product.ratingAmount} Rating)
            </div>
          </div>
        </div>

        {/* details + store */}
        <div className="flex flex-col gap-3">
          <div className="text-sm">
            {/* stock */}
            <div className="">
              <span className="text-gray-500">Stok:</span>
              <span className="ml-1">{product.stock}</span>
            </div>
            {/* category */}
            <div className="">
              <span className="text-gray-500">Kategori:</span>
              <span className="ml-1 font-semibold text-primary">
                {product.category}
              </span>
            </div>
          </div>

          {/* description */}
          <ReadMore description={product.description} />

          {/* shipping */}
          <div className="text-sm">
            <h1 className="font-bold ">Pengiriman</h1>
            <div className="flex flex-col gap-1">
              {/* location */}
              <div className="flex items-center gap-2">
                <IoLocationOutline />
                <div className="">
                  Dikirim dari {""}
                  <span className="font-semibold">
                    {product.store[0].region}
                  </span>
                </div>
              </div>
              {/* shipping cost */}
              <div className="flex items-center gap-2">
                <BsTruck />
                <div className="">
                  Estimasi ongkir {""}
                  <span className="font-nunito font-light">
                    {formatNumber(26000)} - {formatNumber(30000)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSection;
