import React from "react";
import { formatNumber } from "../../utils/formatNumber";

const OrderSummary = ({ productTotal, shippingCost, serviceFee }) => {
  const total = productTotal + shippingCost + serviceFee;

  return (
    <div className="">
      <h3 className="text-lg font-semibold mb-3">Ringkasan Belanja</h3>
      <div className="flex justify-between">
        <span>Total Harga</span>
        <span className="font-nunito font-light">
          {formatNumber(productTotal)}
        </span>
      </div>
      <div className="flex justify-between">
        <span>Total Ongkir</span>
        <span className="font-nunito font-light">
          {formatNumber(shippingCost)}
        </span>
      </div>
      <div className="flex justify-between">
        <span>Biaya Layanan</span>
        <span className="font-nunito font-light">
          {formatNumber(serviceFee)}
        </span>
      </div>
      <hr className="my-3" />
      <div className="flex justify-between font-semibold text-lg">
        <span>Total Belanja</span>
        <span className="font-nunito font-semibold">{formatNumber(total)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
