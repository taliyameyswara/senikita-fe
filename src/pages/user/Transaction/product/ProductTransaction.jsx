import React, { useState, useEffect } from "react";
import CardHeader from "../CardHeader";
import CardButton from "../CardButton";
import ProductTransactionCard from "./ProductTransactionCard";
import { useAxiosInstance } from "../../../../config/axiosConfig";
import { FaStar } from "react-icons/fa";
import Modal from "../../../../components/Modal";
import ReviewForm from "../../../../components/ReviewForm";
import { formatNumber } from "../../../../utils/formatNumber";
import EmptyState from "../../../../components/EmptyState"; // Import your EmptyState component

const ProductTransaction = ({ setProgress }) => {
  const axios = useAxiosInstance();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setProgress(30);
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("user/transaction-history");
        setTransactions(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
        setProgress(100);
      }
    };

    fetchTransactions();
  }, []);

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
    <div className="space-y-4">
      {transactions.length > 0 ? (
        transactions.map((transaction, index) => {
          const paymentStatus = transaction.status || "Selesai";
          const shippingStatus = transaction.status_order || "diproses";
          return (
            <ProductTransactionCard
              provider={transaction.product[0].shop.name}
              key={transaction.product[0].id || index}
              product={transaction.product[0]}
              quantity={transaction.product[0].pivot.qty}
              header={
                <CardHeader
                  item={transaction.product[0]}
                  payment={paymentStatus}
                  shipping={shippingStatus}
                  type={"product"}
                  invoice={transaction.no_transaction}
                  date={transaction.created_at}
                />
              }
              button={
                <div className="flex items-center justify-end w-full gap-3">
                  {shippingStatus === "DONE" &&
                    paymentStatus === "DONE" && (
                      <div
                        onClick={() => openReviewModal(transaction.product[0])}
                        className="p-1 px-2 text-xs border-[0.5px] border-opacity-70 border-primary text-primary font-semibold rounded-lg flex gap-2 items-center hover:bg-primary hover:text-white duration-75 cursor-pointer"
                      >
                        <FaStar className="text-yellow-400" />
                        <div className="">Beri Ulasan</div>
                      </div>
                    )}
                  <CardButton
                    buttonLink={`/user/dashboard/transaction/product/details/${transaction.id}`}
                    buttonLabel="Lihat Detail Transaksi"
                  />
                </div>
              }
            />
          );
        })
      ) : (
        <EmptyState message="Tidak ada transaksi produk" />
      )}

      {currentProduct && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeReviewModal}
          title="Beri Ulasan"
          subtitle={
            <div className="flex gap-3 py-2">
              <img
                src={"https://via.placeholder.com/100"}
                alt={currentProduct.name}
                className="object-cover w-12 h-12 rounded-lg"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-black">
                  {currentProduct.name}
                </span>
                <span className="text-sm font-light text-black font-nunito">
                  {formatNumber(currentProduct.price)}
                </span>
              </div>
            </div>
          }
          handleSubmit={() => { }}
        >
          <ReviewForm />
        </Modal>
      )}
    </div>
  );
};

export default ProductTransaction;
