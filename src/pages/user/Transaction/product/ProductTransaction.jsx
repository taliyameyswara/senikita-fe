import React from "react";
import CardHeader from "../CardHeader";
import CardButton from "../CardButton";
import ProductTransactionCard from "./ProductTransactionCard";
import { ProductData } from "../../../../utils/ProductData";

const ProductTransaction = () => {
  return (
    <div className="space-y-4">
      {ProductData.map((product, index) => {
        const paymentStatus = product.paymentStatus || "Selesai";
        const shippingStatus = product.shippingStatus || "diproses";

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
              <CardButton
                buttonLink={`/user/dashboard/transaction/product/details`}
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
