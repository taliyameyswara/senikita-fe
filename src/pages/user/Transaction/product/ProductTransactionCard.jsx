import React from "react";
import { formatNumber } from "../../../../utils/formatNumber";

const ProductTransactionCard = ({
  product,
  quantity,
  provider,
  header,
  button,
}) => {
  return (
    <div className="p-4 bg-white border rounded-xl mb-4">
      {/* Header */}
      {header}

      {/* Product Details */}
      <div className="flex gap-3 items-center">
        {/* Image */}
        <div>
          <img
            className="w-20 h-20 object-cover rounded-lg"
            src={product.thumbnail}
            alt={product.name}
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
