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
  urlInvoice = "",
  type = ""

}) => {
  const handleCheckout = () => {
    console.log("byr sek bos");
  };

  const handleCheckoutProduct = () => {
    window.open(urlInvoice, "_blank");
  }

  return (
    <div className="mt-2">
      <div className="mb-1 font-semibold">Rincian Pembayaran</div>
      <div className="flex gap-8">
        <div className="text-gray-500">
          <div>Total Harga</div>
          {!isService && <div>Total Ongkos Kirim</div>}
          <div>Total Biaya Layanan</div>
          <div className="font-semibold text-primary">Total Pembayaran</div>
        </div>
        <div className="font-light font-nunito">
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
            className="px-6 py-2 font-bold text-white bg-primary rounded-xl"
            onClick={handleCheckout}
          >
            Bayar
          </button>
        </div>
      )}

      {urlInvoice != null && paymentStatus === "pending" && type === "product" && (
        <div className="mt-2">
          <button
            className="px-6 py-2 font-bold text-white bg-primary rounded-xl"
            onClick={handleCheckoutProduct}
          >
            Bayar
          </button>
        </div>
      )}

      {urlInvoice != null && paymentStatus === "waiting for payment" && type === "service" && (
        <div className="mt-2">
          <button
            className="px-6 py-2 font-bold text-white bg-primary rounded-xl"
            onClick={handleCheckoutProduct}
          >
            Bayar
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentDetail;
