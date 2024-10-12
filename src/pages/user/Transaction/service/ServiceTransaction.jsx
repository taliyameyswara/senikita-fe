import React, { useState, useEffect } from "react";
import CardHeader from "../CardHeader";
import CardButton from "../CardButton";
import ServiceTransactionCard from "./ServiceTransactionCard";
import { useAxiosInstance } from "../../../../config/axiosConfig";
import { FaStar } from "react-icons/fa";
import EmptyState from "../../../../components/EmptyState"; // Import your EmptyState component

const ServiceTransaction = ({ setProgress }) => {
  const axios = useAxiosInstance();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setProgress(30);
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("user/transaction-history-service");
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

  return (
    <div className="space-y-4">
      {transactions.length > 0 ? (
        transactions.map((transaction, index) => {
          const paymentStatus = transaction.status || "";
          const shippingStatus = transaction.status_order || "ditolak";
          return (
            <ServiceTransactionCard
              key={transaction.service.id || index}
              service={transaction.service}
              quantity={transaction.qty}
              provider={transaction.service.shop.name}
              header={
                <CardHeader
                  item={transaction.service}
                  payment={paymentStatus}
                  shipping={shippingStatus}
                  invoice={transaction.no_transaction}
                  date={transaction.created_at}
                  type={"service"}
                />
              }
              button={
                <div className="flex items-center justify-end w-full gap-3">
                  {shippingStatus === "selesai" &&
                  paymentStatus === "selesai" ? (
                    <div className="p-1 px-2 text-xs border-[0.5px] border-opacity-70 border-primary text-primary font-semibold rounded-lg flex gap-2 items-center hover:bg-primary hover:text-white duration-75 cursor-pointer">
                      <FaStar className="text-yellow-400" />
                      <div className="">Beri Ulasan</div>
                    </div>
                  ) : null}
                  <CardButton
                    buttonLink={`/user/dashboard/transaction/service/details/${transaction.id}`}
                    buttonLabel="Lihat Detail Transaksi"
                  />
                </div>
              }
            />
          );
        })
      ) : (
        <EmptyState message="Tidak ada transaksi jasa" />
      )}
    </div>
  );
};

export default ServiceTransaction;
