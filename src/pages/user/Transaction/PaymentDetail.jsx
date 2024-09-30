import React from "react";
import { formatNumber } from "../../../utils/formatNumber";

const PaymentDetail = ({
  totalPrice,
  shippingCost,
  serviceFee = 5000,
  totalPayment,
  isService = false,
  paymentStatus = "",
  shippingStatus = "",
}) => {
  const handleCheckout = () => {
    console.log("byr sek bos");
  };

  return (
    <div className="mt-2">
      <div className="font-semibold mb-1">Rincian Pembayaran</div>
      <div className="flex gap-8">
        <div className="text-gray-500">
          <div>Total Harga</div>
          {!isService && <div>Total Ongkos Kirim</div>}
          <div>Total Biaya Layanan</div>
          <div className="font-semibold text-primary">Total Pembayaran</div>
        </div>
        <div className="font-nunito font-light">
          <div>{formatNumber(totalPrice)}</div>
          {!isService && <div>{formatNumber(shippingCost)}</div>}
          <div>{formatNumber(serviceFee)}</div>
          <div className="font-semibold text-primary">
            {formatNumber(totalPayment)}
          </div>
        </div>
      </div>

      {paymentStatus === "pending" && shippingStatus === "dikonfirmasi" && (
        <div className="mt-2">
          <button
            className="bg-primary  text-white font-bold py-2 px-6 rounded-xl"
            onClick={handleCheckout}
          >
            Bayar
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentDetail;
