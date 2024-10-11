import React from "react";
import { formatNumber } from "../../../../utils/formatNumber";

const ProductOrderTransactionCard = ({
    product,
    quantity,
    provider,
    header,
    button,
}) => {
    return (
        <div className="p-4 mb-4 bg-white border rounded-xl">
            {/* Header */}
            {header}

            {/* Product Details */}
            <div className="flex items-center gap-3">
                {/* Image */}
                <div>
                    <img
                        className="object-cover w-20 h-20 rounded-lg"
                        src={product.productThumbnail}
                        alt={product.productName}
                    />
                </div>

                {/* Details */}
                <div>
                    <div className="text-xs text-tertiary">{provider}</div>
                    <h3 className="font-semibold md:text-lg">{product.productName}</h3>
                    {/* {product.type === "Produk" && ( */}
                    <div className="text-xs font-light text-gray-500 font-nunito">
                        {quantity} item x {formatNumber(product.productPrice)}
                    </div>
                    {/* )} */}
                    <p className="font-semibold text-gray-900 font-nunito">
                        {formatNumber(product.productPrice * quantity)}
                    </p>
                </div>
            </div>

            {/* Button */}
            {button}
        </div>
    );
};

export default ProductOrderTransactionCard;
