import React, { useState, useEffect } from "react";
import { formatNumber } from "../../../../utils/formatNumber";
import { limitText } from "../../../../utils/limitText";

const ProductOrderTransactionCard = ({
  product,
  quantity,
  provider,
  header,
  button,
}) => {
  const [textLimit, setTextLimit] = useState(30);

  // Set text limit based on screen size
  useEffect(() => {
    const updateTextLimit = () => {
      if (window.innerWidth >= 768) {
        setTextLimit(50);
      } else {
        setTextLimit(25);
      }
    };
    updateTextLimit();

    window.addEventListener("resize", updateTextLimit);
    return () => window.removeEventListener("resize", updateTextLimit);
  }, []);

  return (
    <div className="md:p-4 p-3 mb-4 bg-white border rounded-xl">
      {/* Header */}
      {header}

      {/* Product Details */}
      <div className="flex items-center gap-3">
        {/* Image */}
        <div>
          <img
            className="object-cover md:w-20 md:h-20 w-16 h-16 rounded-lg"
            src={product.productThumbnail}
            alt={product.productName}
          />
        </div>

        {/* Details */}
        <div>
          <div className="text-xs text-tertiary">{provider}</div>
          <h3 className="font-semibold md:text-base text-sm">
            {limitText(product.productName, textLimit)}
          </h3>
          {/* {product.type === "Produk" && ( */}
          <div className="text-xs font-light text-gray-500 font-nunito">
            {quantity} item x {formatNumber(product.productPrice)}
          </div>
          {/* )} */}
          <p className="font-semibold text-gray-900 font-nunito md:text-base text-sm">
            {formatNumber(product.productPrice * quantity)}
          </p>
        </div>
      </div>

      {/* Button */}
      {button}
    </div>
  );
};

export default ProductOrderTransactionCard;
