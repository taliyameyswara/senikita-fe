import React, { useState, useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const TotalCounter = ({ productPrice, quantity, onQuantityChange }) => {
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const [totalPrice, setTotalPrice] = useState(productPrice * quantity);

  // Update local quantity dan total price saat quantity berubah
  useEffect(() => {
    setLocalQuantity(quantity);
    setTotalPrice(productPrice * quantity);
  }, [quantity, productPrice]);

  // Function untuk update quantity dan total price secara lokal
  const updateQuantity = (newQuantity) => {
    if (newQuantity < 1) newQuantity = 1; // Menghindari nilai kurang dari 1
    setLocalQuantity(newQuantity);
    setTotalPrice(newQuantity * productPrice);
    onQuantityChange(newQuantity); // Panggil fungsi dari parent untuk update quantity
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
    <div className="flex flex-row items-center gap-3">
      {/* button */}
      <div className="flex items-center space-x-1 border rounded-lg px-1">
        <button
          onClick={decreaseQuantity}
          className="p-2 hover:bg-primary bg-white hover:text-white text-primary rounded-md transition duration-200"
        >
          <AiOutlineMinus className="text-sm" />
        </button>
        <input
          className="w-10 text-center border-0 focus:ring-0 font-nunito font-light text-sm"
          value={localQuantity}
          onChange={handleQuantityChange}
        />
        <button
          onClick={increaseQuantity}
          className="p-2 hover:bg-primary bg-white hover:text-white text-primary rounded-md transition duration-200"
        >
          <AiOutlinePlus className="text-sm  " />
        </button>
      </div>
      {/* total */}
      <div className="flex flex-col">
        <div className="text-sm text-gray-500">Total Harga:</div>
        <span className="font-semibold font-nunito">
          Rp{totalPrice.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default TotalCounter;
