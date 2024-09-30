import React from "react";
import { formatNumber } from "../../../../utils/formatNumber";

const ProductTransactionCard = ({
  product,
  quantity = product.quantity,
  provider,
  header,
  button,
}) => {
  return (
    <div className="p-4 bg-white border rounded-xl mb-4">
      {/* Header */}
      {header}

      {/* Product/Service Details */}
      <div className="flex gap-3">
        {/* Image */}
        <div className="">
          <img
            className="w-20 h-20 object-cover rounded-lg"
            src="https://cdngnfi2.sgp1.cdn.digitaloceanspaces.com/gnfi/uploads/images/2022/11/0715042022-Lukisan-Balinese-Procession-karya-Lee-Man-Fong-menjadi-salah-satu-lukisan-terkenal-dunia-asal-Indonesia-Good-News-From-Indonesia.jpg"
            alt="Product"
          />
        </div>

        {/* Details */}
        <div>
          <div className="text-xs text-tertiary">{provider}</div>
          <h3 className="font-semibold md:text-lg">{product.name}</h3>
          {/* {product.type === "Produk" && ( */}
          <div className="text-xs font-nunito font-light text-gray-500">
            {quantity} item x {formatNumber(product.price)}
          </div>
          {/* )} */}
          <p className="text-gray-900 font-semibold font-nunito">
            {formatNumber(product.price)}
          </p>
        </div>
      </div>

      {/* Button */}
      {button}
    </div>
  );
};

export default ProductTransactionCard;
