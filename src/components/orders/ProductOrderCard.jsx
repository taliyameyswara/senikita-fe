import React, { useState } from "react";
import { formatNumber } from "../../utils/formatNumber";
import TotalCounter from "../../components/TotalCounter";

const ProductOrderCard = ({ product, setTotalPrice }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    setTotalPrice(newQuantity * product.productPrice);
  };

  return (
    <div>
      <div className="flex items-center space-x-4 mt-3">
        <img
          src={product.productThumbnail}
          alt={product.productName}
          className="w-36 h-28 object-cover rounded-lg"
        />
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="text-lg">{product.productName}</h3>
            <p className="font-nunito text-light font-semibold">
              {formatNumber(product.productPrice)}
            </p>
          </div>
          <TotalCounter
            productPrice={product.productPrice}
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductOrderCard;
