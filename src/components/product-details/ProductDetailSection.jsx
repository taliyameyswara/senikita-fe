import React from "react";
import ImageSlider from "../../components/ImageSlider";
import ReadMore from "../../components/ReadMore";
import { formatNumber } from "../../utils/formatNumber";
import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { BsTruck } from "react-icons/bs";

const ProductDetailSection = ({ product }) => {
  const imageProducts = product.images && product.images.length > 0
    ? [product.thumbnail, ...product.images.map(image => image.picture)]
    : [product.thumbnail];
  return (
    <div className="grid items-start grid-cols-1 gap-3 mt-4 lg:grid-cols-2 md:gap-6">
      {/* image slider */}
      <ImageSlider imageUrls={imageProducts} />

      {/* product details */}
      <div className="flex flex-col">
        {/* price */}
        <span className="text-2xl font-bold md:text-3xl text-primary font-nunito">
          {formatNumber(product.price)}
        </span>
        <h1 className="my-1 text-2xl md:text-3xl text-secondary font-crimson md:my-2">
          {product.name}
        </h1>

        {/* sold + rating */}
        <div className="flex gap-2 mb-2 text-sm">
          <div className="">
            Terjual <span className="font-nunito">{product.sold}</span>
          </div>
          <div className="">•</div>
          <div className="flex items-center gap-1">
            <FaStar className="mb-1 text-yellow-500" />
            <div className="text-sm font-nunito">{product.average_rating}</div>
            <div className="text-sm text-gray-500 font-nunito">
              ({product.ratings.length} Rating)
            </div>
          </div>
        </div>

        {/* details + shop */}
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
                {product.category_name}
              </span>
            </div>
          </div>

          {/* description */}
          <ReadMore description={product.desc} />

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
                    {product.shop.region}
                    {/* {product.shop} */}
                    {/* Menunggu Backend */}
                  </span>
                </div>
              </div>
              {/* shipping cost */}
              <div className="flex items-center gap-2">
                <BsTruck />
                <div className="">
                  Estimasi ongkir {""}
                  <span className="font-light font-nunito">
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
