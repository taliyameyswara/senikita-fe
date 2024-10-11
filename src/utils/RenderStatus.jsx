import React from "react";
import StatusDisplay from "../components/status/StatusDisplay";
import PaymentStatus from "../components/status/PaymentStatus";

const RenderStatus = ({ payment, shipping, type }) => {
  const shippingStatus = shipping.toLowerCase();
  const paymentStatus = payment.toLowerCase();

  if (shippingStatus === "menunggu_konfirmasi") {
    return (
      <StatusDisplay transactionStatus="menunggu_konfirmasi" type={"service"} />
    );
  }

  if (paymentStatus === "pending" && shippingStatus === "dikonfirmasi") {
    return (
      <>
        <PaymentStatus transactionStatus={payment} />
        <StatusDisplay transactionStatus={shipping} type={"service"} />
      </>
    );
  }

  if (paymentStatus === "pending") {
    return (
      <>
        <PaymentStatus transactionStatus={payment} />
      </>
    );
  }

  if (shippingStatus === "ditolak") {
    return (
      <>
        <StatusDisplay transactionStatus={shipping} type={"service"} />
      </>
    );
  }

  if (paymentStatus === "gagal" && shippingStatus === "dibatalkan") {
    return (
      <>
        <PaymentStatus transactionStatus={payment} />
        <StatusDisplay transactionStatus={shipping} type={"service"} />
      </>
    );
  }

  if (paymentStatus === "selesai" && shippingStatus === "selesai") {
    return (
      <>
        <StatusDisplay transactionStatus={shipping} type={type} />
      </>
    );
  }

  if (paymentStatus === "selesai") {
    return (
      <>
        <PaymentStatus transactionStatus={payment} />
        <StatusDisplay transactionStatus={shipping} type={type} />
      </>
    );
  }

  return null;
};

export default RenderStatus;
