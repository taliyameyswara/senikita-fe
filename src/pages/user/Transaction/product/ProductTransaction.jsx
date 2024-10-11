import React, { useState } from "react";
import CardHeader from "../CardHeader";
import CardButton from "../CardButton";
import ProductTransactionCard from "./ProductTransactionCard";
import { ProductData } from "../../../../utils/ProductData";
import { FaStar } from "react-icons/fa";
import Modal from "../../../../components/Modal";
import ReviewForm from "../../../../components/ReviewForm";
import { formatNumber } from "../../../../utils/formatNumber";

const ProductTransaction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const openReviewModal = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const closeReviewModal = () => {
    setCurrentProduct(null);
    setIsModalOpen(false);
  };

  return (
    <div className="">
      {ProductData.map((product, index) => {
        const paymentStatus = product.paymentStatus || "selesai";
        const shippingStatus = product.shippingStatus || "selesai";

        return (
          <ProductTransactionCard
            key={product.id || index}
            product={product}
            header={
              <CardHeader
                item={product}
                payment={paymentStatus}
                shipping={shippingStatus}
                type={"product"}
              />
            }
            button={
              <div className="flex items-center gap-3 w-full justify-end">
                {shippingStatus === "selesai" &&
                  paymentStatus === "selesai" && (
                    <div
                      onClick={() => openReviewModal(product)}
                      className="p-1 px-2 text-xs border-[0.5px] border-opacity-70 border-primary  text-primary font-semibold rounded-lg flex gap-2 items-center hover:bg-primary hover:text-white duration-75 cursor-pointer"
                    >
                      <FaStar className="text-yellow-400" />
                      <div className="">Beri Ulasan</div>
                    </div>
                  )}
                <CardButton
                  buttonLink={`/user/dashboard/transaction/product/details`}
                  buttonLabel="Lihat Detail Produk"
                />
              </div>
            }
          />
        );
      })}

      {currentProduct && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeReviewModal}
          title="Beri Ulasan"
          subtitle={
            <div className="flex gap-3 py-2">
              <img
                src={
                  // currentProduct.thumbnail
                  "https://via.placeholder.com/100"
                }
                alt={currentProduct.name}
                className="object-cover w-12 h-12 rounded-lg"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-black">
                  {currentProduct.name}
                </span>
                <span className="text-sm text-black font-nunito font-light">
                  {formatNumber(currentProduct.price)}
                </span>
              </div>
            </div>
          }
          handleSubmit={() => {}}
        >
          <ReviewForm />
        </Modal>
      )}
    </div>
  );
};

export default ProductTransaction;
