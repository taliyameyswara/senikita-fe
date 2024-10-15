import React from "react";
import { formatNumber } from "../../utils/formatNumber";

const OrderSummary = ({ productTotal, shippingCost, serviceFee }) => {
  const total =
    (productTotal > 0 ? productTotal : 0) +
    (shippingCost > 0 ? shippingCost : 0) +
    (serviceFee > 0 ? serviceFee : 0);
  return (
    <div className="">
      <h3 className="mb-3 text-lg font-semibold">Ringkasan Belanja</h3>

      {productTotal > 0 ? (
        <div className="flex justify-between">
          <span>Total Harga</span>
          <span className="font-light font-nunito">
            {formatNumber(productTotal)}
          </span>
        </div>
      ) : (
        <div className="flex justify-between">
          <span>Total Harga</span>
          <span className="font-light font-nunito">Rp0</span>
        </div>
      )}

      {shippingCost > 0 && (
        <div className="flex justify-between">
          <span>Total Ongkir</span>
          <span className="font-light font-nunito">
            {formatNumber(shippingCost)}
          </span>
        </div>
      )}

      {serviceFee > 0 && (
        <div className="flex justify-between">
          <span>Biaya Layanan</span>
          <span className="font-light font-nunito">
            {formatNumber(serviceFee)}
          </span>
        </div>
      )}

      <>
        <hr className="my-3" />
        <div className="flex justify-between text-lg font-semibold">
          <span>Total Belanja</span>
          {productTotal > 0 || shippingCost > 0 || serviceFee > 0 ? (
            <span className="font-semibold font-nunito">
              {formatNumber(total)}
            </span>
          ) : (
            <span className="font-semibold font-nunito">Rp0</span>
          )}
        </div>
      </>
    </div>
  );
};

export default OrderSummary;
