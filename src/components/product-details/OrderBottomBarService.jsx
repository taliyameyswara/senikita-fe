import { useState, useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";
import TotalCounter from "../../components/TotalCounter";
import LikeButton from "../LikeButton";
import { useAxiosInstance } from "../../config/axiosConfig";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const OrderBottomBarService = ({ service }) => {
    const axiosInstance = useAxiosInstance();
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);
    const [isLiked, setIsLiked] = useState(service ? service.is_bookmarked : false);
    const updateQuantity = (newQuantity) => {
        setQuantity(newQuantity);
    };
    // Ensuring hooks are called consistently
    useEffect(() => {
        if (service) {
            setIsLiked(service.is_bookmarked);
        }
    }, [service]);

    if (!service) {
        return <div>Loading</div>;
    }

    // Handle bookmark toggle
    const handleBookmark = async () => {
        try {
            if (isLiked) {
                await axiosInstance.delete(`/user/bookmark-service/${service.id}`);
                toast.success('Produk berhasil dihapuskan dari bookmark');
            } else {
                await axiosInstance.post("/user/bookmark-service", {
                    service_id: service.id,
                });
                toast.success('Produk berhasil ditambahkan ke bookmark');
            }
            setIsLiked(!isLiked);
        } catch (error) {
            console.error("Failed to bookmark product", error);
        }
    };
    console.log(quantity)

    const handlePurchase = (kuantitas) => {
        const selectedService = {
            id: service.id,
            name: service.name,
            price: service.price,
            thumbnail: service.thumbnail,
            qty: kuantitas,
        };
        navigate('/service-order', { state: { selectedService } });
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 grid items-center grid-cols-12 gap-2 p-4 text-sm bg-white border-t border-gray-200 shadow-lg lg:px-24 md:text-base">
            {/* Left Section */}
            <div className="hidden lg:block lg:col-span-5">
                <div className="flex items-center gap-2">
                    <img
                        src={service.thumbnail}
                        alt={service.name}
                        className="w-12 h-12 rounded-full"
                    />
                    <div>{service.name}</div>
                </div>
            </div>

            {/* Price and Quantity Section */}
            <div className="hidden lg:block lg:col-span-3">
                <TotalCounter
                    productPrice={service.price}
                    quantity={quantity}
                    onQuantityChange={updateQuantity} />
            </div>

            {/* Right Section */}
            <div className="flex items-center col-span-12 gap-2 lg:col-span-4">
                <button
                    onClick={() => handlePurchase(quantity)}
                    className="w-full px-6 py-3 font-semibold text-center text-white bg-primary hover:bg-primary-dark rounded-xl"
                >
                    Beli Sekarang
                </button>
                <LikeButton
                    isLiked={isLiked}
                    onToggleLike={handleBookmark}
                    hidden={!('is_bookmarked' in service)}
                />
            </div>
        </div>
    );
};

export default OrderBottomBarService;
