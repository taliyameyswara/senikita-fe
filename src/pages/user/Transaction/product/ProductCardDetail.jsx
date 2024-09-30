import React from "react";
import ProductTransactionCard from "./ProductTransactionCard";
const ProductCardDetail = ({ products, provider }) => {
  return (
    <div className="mt-2">
      <div className="font-semibold mb-1">Detail Produk</div>
      {products.map((product, index) => (
        <ProductTransactionCard
          key={index}
          product={product}
          provider={provider}
        />
      ))}
    </div>
  );
};

export default ProductCardDetail;
