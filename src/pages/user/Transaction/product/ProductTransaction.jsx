import React, { useState } from "react";
import CardHeader from "../CardHeader";
import CardButton from "../CardButton";
import ProductTransactionCard from "./ProductTransactionCard";
import { ProductData } from "../../../../utils/ProductData";
import { useEffect } from "react";
import { useAxiosInstance } from "../../../../config/axiosConfig";
const ProductTransaction = () => {
  const axios = useAxiosInstance();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("user/transaction-history");
        setTransactions(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="space-y-4">
      {transactions.map((transaction, index) => {
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
              <CardButton
                buttonLink={`/user/dashboard/transaction/product/details/${transaction.id}`}
                buttonLabel="Lihat Detail Transaksi"
              />
            }
          />
        );
      })}
    </div>
  );
};

export default ProductTransaction;
