import React from "react";
import { IoIosHourglass } from "react-icons/io";
import { BsTruck } from "react-icons/bs";
import { IoCheckmarkDone } from "react-icons/io5";
import { FaRegCalendarCheck, FaRegClock, FaTimesCircle } from "react-icons/fa";

// Product status map
const productStatusMap = {
  diproses: {
    icon: <IoIosHourglass />,
    text: "Produk Diproses",
    bgClass:
      "bg-yellow-300/20 border-[0.5px] border-yellow-600/30 text-yellow-600",
  },
  dikirim: {
    icon: <BsTruck />,
    text: "Produk Dikirim",
    bgClass: "bg-blue-300/20 border-[0.5px] border-blue-500/30 text-blue-500",
  },
  selesai: {
    icon: <IoCheckmarkDone />,
    text: "Produk Selesai",
    bgClass:
      "bg-green-300/20 border-[0.5px] border-green-600/30 text-green-600",
  },
  dibatalkan: {
    icon: <FaTimesCircle />,
    text: "Produk Dibatalkan",
    bgClass: "bg-red-300/20 border-[0.5px] border-red-600/30 text-red-600",
  },
  unknown: {
    icon: <IoIosHourglass />,
    text: "Status Tidak Diketahui",
    bgClass: "bg-gray-300/20 border-[0.5px] border-gray-500/30 text-gray-500",
  },
};

// Service status map
const serviceStatusMap = {
  menunggu_konfirmasi: {
    icon: <FaRegClock />,
    text: "Jasa Menunggu Konfirmasi",
    bgClass:
      "bg-yellow-300/20 border-[0.5px] border-yellow-600/30 text-yellow-600",
  },
  dikonfirmasi: {
    icon: <IoCheckmarkDone />,
    text: "Jasa Dikonfirmasi",
    bgClass:
      "bg-green-300/20 border-[0.5px] border-green-600/30 text-green-600",
  },
  dijadwalkan: {
    icon: <FaRegCalendarCheck />,
    text: "Jasa Dijadwalkan",
    bgClass: "bg-blue-300/20 border-[0.5px] border-blue-500/30 text-blue-500",
  },
  selesai: {
    icon: <IoCheckmarkDone />,
    text: "Jasa Selesai",
    bgClass:
      "bg-green-300/20 border-[0.5px] border-green-600/30 text-green-600",
  },
  dibatalkan: {
    icon: <FaTimesCircle />,
    text: "Jasa Dibatalkan",
    bgClass: "bg-red-300/20 border-[0.5px] border-red-600/30 text-red-600",
  },
  ditolak: {
    icon: <FaTimesCircle />,
    text: "Jasa Ditolak",
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
      ? serviceStatusMap[transactionStatus.toLowerCase()] ||
      serviceStatusMap.unknown
      : productStatusMap[transactionStatus.toLowerCase()] ||
      productStatusMap.unknown;

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
