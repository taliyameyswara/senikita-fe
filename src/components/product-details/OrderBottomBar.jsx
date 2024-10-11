import { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import TotalCounter from "../../components/TotalCounter";
import LikeButton from "../LikeButton";
import { useAxiosInstance } from "../../config/axiosConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OrderBottomBar = ({ product }) => {
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(
    product ? product.is_bookmarked : false
  );

  useEffect(() => {
    if (product) {
      setIsLiked(product.is_bookmarked);
    }
  }, [product]);

  // Function to handle bookmark
  const handleBookmark = async () => {
    try {
      if (isLiked) {
        await axiosInstance.delete(`/user/bookmark-product/${product.id}`);
        toast.success("Produk berhasil dihapuskan dari wishlist");
      } else {
        await axiosInstance.post("/user/bookmark-product", {
          product_id: product.id,
        });
        toast.success("Produk berhasil ditambahkan ke wishlist");
      }
      // Toggle liked state
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Failed to bookmark product", error);
    }
  };

  const addCart = async () => {
    try {
      const response = await axiosInstance.post("user/cart/items", {
        product_id: product.id,
        qty: quantity,
      });
      if (response.status === 201) {
        toast.success("Produk berhasil ditambahkan ke keranjang");
        navigate("/cart");
      }
    } catch (error) {
      console.error("Failed to add product to cart", error);
    }
  };

  // Function to update quantity
  const updateQuantity = (newQuantity) => {
    setQuantity(newQuantity);
  };

  // Return loading state if product is not available
  if (!product) {
    return <div>Loading</div>;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 grid items-center grid-cols-12 gap-2 p-4 text-sm bg-white border-t border-gray-200 shadow-lg lg:px-24 md:text-base">
      <div className="hidden lg:block lg:col-span-5">
        <div className="flex items-center gap-2">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-12 h-12 rounded-full"
          />
          <div>{product.name}</div>
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-3">
        <TotalCounter
          productPrice={product.price}
          quantity={quantity}
          onQuantityChange={updateQuantity}
        />
      </div>
      <div className="flex items-center col-span-12 gap-2 lg:col-span-4">
        <button className="w-full px-6 py-3 font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl">
          Beli Sekarang
        </button>
        <button
          onClick={addCart}
          className="w-full px-6 py-3 font-semibold text-white bg-secondary hover:bg-secondary-dark rounded-xl"
        >
          <div className="flex items-center justify-center gap-1">
            <IoCartOutline className="text-xl text-white" />
            <span>Keranjang</span>
          </div>
        </button>
        <LikeButton
          isLiked={isLiked}
          onToggleLike={handleBookmark}
          hidden={!("is_bookmarked" in product)}
        />
      </div>
    </div>
  );
};

export default OrderBottomBar;
