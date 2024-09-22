import React from "react";
import { IoIosHourglass } from "react-icons/io";
import { BsTruck } from "react-icons/bs";
import { IoCheckmarkDone } from "react-icons/io5";

const statusMap = {
  diproses: {
    icon: <IoIosHourglass />,
    text: "Diproses",
    bgClass: "bg-yellow-300/20 text-yellow-600",
  },
  dikirim: {
    icon: <BsTruck />,
    text: "Dikirim",
    bgClass: "bg-blue-300/20 text-blue-500",
  },
  selesai: {
    icon: <IoCheckmarkDone />,
    text: "Selesai",
    bgClass: "bg-green-300/20 text-green-600",
  },
};

const StatusDisplay = ({ transactionStatus }) => {
  const statusInfo = statusMap[transactionStatus];
  return (
    <div className="flex items-center gap-2">
      <div
        className={`${statusInfo.bgClass} p-1 px-2 rounded-lg flex gap-1 items-center text-xs font-semibold`}
      >
        {statusInfo.icon}
        <span>{statusInfo.text}</span>
      </div>
    </div>
  );
};

export default StatusDisplay;
