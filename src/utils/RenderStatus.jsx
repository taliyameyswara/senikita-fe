import React from "react";
import StatusDisplay from "../components/status/StatusDisplay";
import PaymentStatus from "../components/status/PaymentStatus";

const RenderStatus = ({ payment, shipping, type }) => {
  const shippingStatus = shipping.toLowerCase();
  const paymentStatus = payment.toLowerCase();
  if (paymentStatus === "pending" && shippingStatus === "waiting" && type === "product") {
    return (
      <PaymentStatus transactionStatus={"pending"} />
    )
  }

  if (paymentStatus === "success" && shippingStatus === "process" && type === "product") {
    return (
      <>
        <StatusDisplay transactionStatus="diproses" type={type} />
        <PaymentStatus transactionStatus="selesai" />
      </>
    )
  }

  if (paymentStatus === "success" && shippingStatus === "delivered" && type === "product") {
    return (
      <>
        <StatusDisplay transactionStatus="dikirim" type={type} />
        <PaymentStatus transactionStatus="selesai" />
      </>
    )
  }

  if (paymentStatus === "done" && shippingStatus === "done") {
    return (
      <>
        <StatusDisplay transactionStatus="selesai" type={type} />
        <PaymentStatus transactionStatus="selesai" />
      </>
    )
  }


  if (paymentStatus === "waiting for payment" && shippingStatus === "confirmed" && type === "service") {
    return (
      <>
        <StatusDisplay transactionStatus="dikonfirmasi" type={type} />
        <PaymentStatus transactionStatus="pending" />

      </>
    )
  }


  if (paymentStatus === "pending" && shippingStatus === "pending" && type === "service") {
    return (
      <>
        <StatusDisplay transactionStatus="menunggu_konfirmasi" type={type} />
      </>
    )
  }

  if (paymentStatus === "success" && shippingStatus === "confirmed" && type === "service") {
    return (
      <>
        <StatusDisplay transactionStatus="dijadwalkan" type={type} />
        <PaymentStatus transactionStatus="selesai" />

      </>
    )
  }

  if (paymentStatus === "rejected" || shippingStatus === "rejected" && type === "service") {
    return (
      <>
        <StatusDisplay transactionStatus="ditolak" type={type} />
      </>
    )
  }

};

export default RenderStatus;
