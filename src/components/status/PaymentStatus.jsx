import React from "react";
import { IoIosHourglass } from "react-icons/io";
import { IoCheckmarkDone } from "react-icons/io5";
import { FaTimesCircle } from "react-icons/fa";

const statusMap = {
  pending: {
    icon: <IoIosHourglass />,
    text: "Menunggu Pembayaran",
    bgClass:
      "bg-yellow-300/20 border-[0.5px] border-yellow-600/30 text-yellow-600",
  },
  selesai: {
    icon: <IoCheckmarkDone />,
    text: "Pembayaran Berhasil",
    bgClass:
      "bg-green-300/20 border-[0.5px] border-green-600/30 text-green-600",
  },
  gagal: {
    icon: <FaTimesCircle />,
    text: "Pembayaran Gagal",
    bgClass: "bg-red-300/20 border-[0.5px] border-red-600/30 text-red-600",
  },
};

const PaymentStatus = ({ transactionStatus }) => {
  const statusInfo =
    statusMap[transactionStatus.toLowerCase()] || statusMap.pending;

  return (
    <div>
      <div className="flex items-center gap-2">
        <div
          className={`${statusInfo.bgClass} p-1 px-2 rounded-lg flex gap-1 items-center text-xs font-semibold`}
        >
          {statusInfo.icon}
          <span>{statusInfo.text}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;
