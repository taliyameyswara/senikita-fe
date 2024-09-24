import React, { useState } from "react";
import { formatNumber } from "../../utils/formatNumber";
import TotalCounter from "../../components/TotalCounter";

const ProductOrderCard = ({ product, button, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(product.quantity || 1);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    onQuantityChange && onQuantityChange(product, newQuantity);
  };

  return (
    <div>
      <div className="flex items-start space-x-4 mt-3">
        <img
          src={product.productThumbnail}
          alt={product.productName}
          className="w-36 h-28 object-cover rounded-lg"
        />
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="text">{product.productName}</h3>
            <p className="font-nunito text-light font-semibold">
              {formatNumber(product.productPrice)}
            </p>
            <div className="flex gap-2 items-center mt-2">{button}</div>
          </div>

          <TotalCounter
            productPrice={product.productPrice}
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
          />
        </div>
      </div>
      <hr className="mt-5 mb-4" />
    </div>
  );
};

export default ProductOrderCard;
