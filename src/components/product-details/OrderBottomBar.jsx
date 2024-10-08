import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import TotalCounter from "../../components/TotalCounter";
import LikeButton from "../LikeButton";
import { useAxiosInstance } from "../../config/axiosConfig";
import { toast } from 'react-toastify';

const OrderBottomBar = ({ product }) => {

  const axiosInstance = useAxiosInstance();
  if (!product) {
    return <div>Loading</div>
  }

  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(product.is_bookmarked || false);

  // Fungsi untuk meng-handle bookmark
  const handleBookmark = async () => {
    try {
      if (isLiked === true) {
        await axiosInstance.delete(`/user/bookmark-product/${product.id}`);
        toast.success('Produk berhasil dihapuskan dari bookmark');
      } else {
        await axiosInstance.post("/user/bookmark-product", {
          product_id: product.id,
        });
        toast.success('Produk berhasil ditambahkan ke bookmark');
      }
      // Toggle liked state
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Failed to bookmark product", error);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 grid items-center grid-cols-12 gap-2 p-4 text-sm bg-white border-t border-gray-200 shadow-lg lg:px-24 md:text-base">
      {/* left section */}
      <div className="hidden lg:block lg:col-span-5">
        <div className="flex items-center gap-2">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-12 h-12 rounded-full"
          />
          <div className="">{product.name}</div>
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-3">
        <TotalCounter productPrice={product.price} quantity={quantity} />
      </div>

      {/* right section */}
      <div className="flex items-center col-span-12 gap-2 lg:col-span-4">
        <button className="w-full px-6 py-3 font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl">
          Beli Sekarang
        </button>
        <button className="w-full px-6 py-3 font-semibold text-white bg-secondary hover:bg-secondary-dark rounded-xl">
          <div className="flex items-center justify-center gap-1">
            <IoCartOutline className="text-xl text-white" />
            <span className="">Keranjang</span>
          </div>
        </button>

        <LikeButton
          isLiked={isLiked}
          onToggleLike={handleBookmark}
          hidden={!('is_bookmarked' in product)}
        />
      </div>
    </div>
  );
};

export default OrderBottomBar;
