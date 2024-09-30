import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import TotalCounter from "../../components/TotalCounter";

const OrderBottomBarService = ({ service }) => {

    if (!service) {
        return <div>Loading</div>
    }

    const [quantity, setQuantity] = useState(1);
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 grid items-center grid-cols-12 gap-2 p-4 text-sm bg-white border-t border-gray-200 shadow-lg lg:px-24 md:text-base">
            {/* left section */}
            <div className="hidden lg:block lg:col-span-5">
                <div className="flex items-center gap-2">
                    <img
                        src={service.thumbnail}
                        alt={service.name}
                        className="w-12 h-12 rounded-full"
                    />
                    <div className="">{service.name}</div>
                </div>
            </div>
            <div className="hidden lg:block lg:col-span-3">
                <TotalCounter productPrice={service.price} quantity={quantity} />
            </div>

            {/* right section */}
            <div className="flex items-center col-span-12 gap-2 lg:col-span-4">
                <button className="w-full px-6 py-3 font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl">
                    Beli Sekarang
                </button>

            </div>
        </div>
    );
};

export default OrderBottomBarService;
