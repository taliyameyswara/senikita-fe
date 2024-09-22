import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import TotalCounter from "../../components/TotalCounter";

const OrderBottomBar = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 lg:px-24 grid grid-cols-12 gap-2 items-center md:text-base text-sm z-50">
      {/* left section */}
      <div className="hidden lg:block lg:col-span-5">
        <div className="flex items-center gap-2">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="rounded-full w-12 h-12"
          />
          <div className="">{product.name}</div>
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-3">
        <TotalCounter productPrice={product.price} quantity={quantity} />
      </div>

      {/* right section */}
      <div className="flex gap-2 lg:col-span-4 col-span-12 items-center">
        <button className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-xl w-full">
          Beli Sekarang
        </button>
        <button className="bg-secondary hover:bg-secondary-dark text-white font-semibold py-3 px-6 rounded-xl w-full">
          <div className="flex items-center justify-center gap-1">
            <IoCartOutline className="text-xl text-white" />
            <span className="">Keranjang</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default OrderBottomBar;
