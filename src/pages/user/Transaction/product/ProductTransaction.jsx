import React from "react";
import CardHeader from "../CardHeader";
import CardButton from "../CardButton";
import ProductTransactionCard from "./ProductTransactionCard";
import { ProductData } from "../../../../utils/ProductData";

const ProductTransaction = () => {
  return (
    <div className="space-y-4">
      {ProductData.map((product, index) => {
        const transactionStatus = product.status || "diproses";

        return (
          <ProductTransactionCard
            key={product.id || index}
            product={product}
            header={
              <CardHeader
                item={product}
                transactionStatus={transactionStatus}
                isService={false}
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
