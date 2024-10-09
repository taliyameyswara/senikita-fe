// ProductOrderCard.jsx
import React from "react";
import TotalCounter from "../../components/TotalCounter";
import { formatNumber } from "../../utils/formatNumber";

const ProductOrderCard = ({ product, button, onQuantityChange }) => {
  return (
    <div>
      <div className="flex items-start mt-3 space-x-4">
        <img
          src={product.productThumbnail}
          alt={product.productName}
          className="object-cover rounded-lg w-36 h-28"
        />
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="text">{product.productName}</h3>
            <p className="font-semibold font-nunito text-light">
              {formatNumber(product.productPrice)}
            </p>
            <div className="flex items-center gap-2 mt-2">{button}</div>
          </div>

          <TotalCounter
            productPrice={product.productPrice}
            quantity={product.quantity}
            // Pass both cart_item.id and new quantity to onQuantityChange
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
