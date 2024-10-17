import React, { useState, useEffect } from "react";
import TotalCounter from "../../components/TotalCounter";
import { formatNumber } from "../../utils/formatNumber";
import { limitText } from "../../utils/limitText";

const ProductOrderCard = ({ product, button, onQuantityChange }) => {
  const [textLimit, setTextLimit] = useState(30);

  // Set text limit based on screen size
  useEffect(() => {
    const updateTextLimit = () => {
      if (window.innerWidth >= 768) {
        setTextLimit(150);
      } else {
        setTextLimit(30);
      }
    };
    updateTextLimit();

    window.addEventListener("resize", updateTextLimit);
    return () => window.removeEventListener("resize", updateTextLimit);
  }, []);

  return (
    <div>
      <div className="flex items-start mt-3 space-x-4">
        <img
          src={product.productThumbnail}
          alt={product.productName}
          className="object-cover rounded-lg md:w-36 md:h-28 w-20 h-20"
        />
        <div className="flex flex-col gap-2">
          <div>
            <h3 className="md:text-base text-sm">
              {limitText(product.productName, textLimit)}
            </h3>
            <p className="font-semibold font-nunito text-light">
              {formatNumber(product.productPrice)}
            </p>
            <div className="flex items-center gap-2 mt-1">{button}</div>
          </div>

          <TotalCounter
            productPrice={product.productPrice}
            quantity={product.quantity}
            onQuantityChange={(newQuantity) => {
              onQuantityChange(product.cart_item_id, newQuantity);
            }}
          />
        </div>
      </div>
      <hr className="mt-5 mb-4" />
    </div>
  );
};

export default ProductOrderCard;
