import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const TotalCounter = ({ productPrice }) => {
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    setTotalPrice((prevTotal) => prevTotal + productPrice);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      setTotalPrice((prevTotal) => prevTotal - productPrice);
    }
  };

  return (
    <div className="flex flex-row items-center gap-3">
      {/* button */}
      <div className="flex items-center space-x-4 bg-gray-200 rounded-lg">
        <button onClick={decreaseQuantity} className="p-3">
          <AiOutlineMinus />
        </button>
        <span className="font-nunito text-sm">{quantity}</span>
        <button onClick={increaseQuantity} className="p-2">
          <AiOutlinePlus />
        </button>
      </div>
      {/* total */}
      <div className="flex flex-col">
        <div className="text-sm text-gray-500">Total Harga:</div>
        <span className="font-semibold font-nunito">
          {" "}
          Rp{totalPrice.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default TotalCounter;
