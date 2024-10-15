// TotalCounter.jsx
import React, { useState, useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const TotalCounter = ({ productPrice, quantity, onQuantityChange }) => {
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const [totalPrice, setTotalPrice] = useState(productPrice * quantity);

  useEffect(() => {
    setLocalQuantity(quantity);
    setTotalPrice(productPrice * quantity);
  }, [quantity, productPrice]);

  const updateQuantity = (newQuantity) => {
    setLocalQuantity(newQuantity);
    setTotalPrice(newQuantity * productPrice);
    onQuantityChange(newQuantity); // Call onQuantityChange with the new quantity
  };

  const increaseQuantity = () => {
    updateQuantity(localQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (localQuantity > 1) {
      updateQuantity(localQuantity - 1);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    updateQuantity(isNaN(value) ? 1 : value);
  };

  return (
    <div className="flex flex-row items-center md:gap-3 gap-2">
      <div className="flex items-center px-1 md:space-x-1 border rounded-lg">
        <button
          onClick={decreaseQuantity}
          className="md:p-2 p-1 transition duration-200 bg-white rounded-md hover:bg-primary hover:text-white text-primary"
        >
          <AiOutlineMinus className="text-sm" />
        </button>
        <input
          className="w-10 text-sm font-light text-center border-0 focus:ring-0 font-nunito"
          value={localQuantity}
          onChange={handleQuantityChange}
        />
        <button
          onClick={increaseQuantity}
          className="md:p-2 p-1 transition duration-200 bg-white rounded-md hover:bg-primary hover:text-white text-primary"
        >
          <AiOutlinePlus className="text-sm" />
        </button>
      </div>
      <div className="flex flex-col">
        <div className="text-sm text-gray-500">Total Harga:</div>
        <span className="font-semibold font-nunito md:text-base text-sm">
          Rp{totalPrice.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default TotalCounter;
