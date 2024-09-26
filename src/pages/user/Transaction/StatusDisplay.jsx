import React from "react";
import { IoIosHourglass } from "react-icons/io";
import { BsTruck } from "react-icons/bs";
import { IoCheckmarkDone } from "react-icons/io5";
import { FaRegCalendarCheck, FaRegClock, FaTimesCircle } from "react-icons/fa";

// Status for product transactions
const productStatusMap = {
  diproses: {
    icon: <IoIosHourglass />,
    text: "Diproses",
    bgClass:
      "bg-yellow-300/20 border-[0.5px] border-yellow-600/30 text-yellow-600",
  },
  dikirim: {
    icon: <BsTruck />,
    text: "Dikirim",
    bgClass: "bg-blue-300/20 border-[0.5px] border-blue-500/30 text-blue-500",
  },
  selesai: {
    icon: <IoCheckmarkDone />,
    text: "Selesai",
    bgClass:
      "bg-green-300/20 border-[0.5px] border-green-600/30 text-green-600",
  },
  unknown: {
    icon: <IoIosHourglass />,
    text: "Status Tidak Diketahui",
    bgClass: "bg-gray-300/20 border-[0.5px] border-gray-500/30 text-gray-500",
  },
};

// Status for service transactions
const serviceStatusMap = {
  menunggu_konfirmasi: {
    icon: <FaRegClock />,
    text: "Menunggu Konfirmasi",
    bgClass:
      "bg-yellow-300/20 border-[0.5px] border-yellow-600/30 text-yellow-600",
  },
  diproses: {
    icon: <IoIosHourglass />,
    text: "Diproses",
    bgClass:
      "bg-yellow-300/20 border-[0.5px] border-yellow-600/30 text-yellow-600",
  },
  dijadwalkan: {
    icon: <FaRegCalendarCheck />,
    text: "Dijadwalkan",
    bgClass: "bg-blue-300/20 border-[0.5px] border-blue-500/30 text-blue-500",
  },
  dalam_pelaksanaan: {
    icon: <BsTruck />,
    text: "Dalam Pelaksanaan",
    bgClass:
      "bg-purple-300/20 border-[0.5px] border-purple-500/30 text-purple-500",
  },
  selesai: {
    icon: <IoCheckmarkDone />,
    text: "Selesai",
    bgClass:
      "bg-green-300/20 border-[0.5px] border-green-600/30 text-green-600",
  },
  dibatalkan: {
    icon: <FaTimesCircle />,
    text: "Dibatalkan",
    bgClass: "bg-red-300/20 border-[0.5px] border-red-600/30 text-red-600",
  },
  unknown: {
    icon: <IoIosHourglass />,
    text: "Status Tidak Diketahui",
    bgClass: "bg-gray-300/20 border-[0.5px] border-gray-500/30 text-gray-500",
  },
};

const StatusDisplay = ({ transactionStatus, type }) => {
  const statusInfo =
    type === "service"
      ? serviceStatusMap[transactionStatus] || serviceStatusMap.unknown
      : productStatusMap[transactionStatus] || productStatusMap.unknown;

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
