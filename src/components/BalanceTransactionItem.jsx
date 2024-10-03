import React from "react";
import { IoArrowUpOutline, IoArrowDownOutline } from "react-icons/io5";
import { formatNumber } from "../utils/formatNumber";

const BalanceTransactionItem = ({
  date,
  time,
  title,
  amount,
  type = "in",
  description = "Uang Masuk/Keluar",
}) => {
  const isMoneyOut = type === "out";
  const arrowIcon = isMoneyOut ? (
    <IoArrowUpOutline className="text-lg font-semibold text-customRed" />
  ) : (
    <IoArrowDownOutline className="text-lg font-semibold text-green-700" />
  );
  const iconColor = isMoneyOut ? "text-customRed" : "text-green-700";
  const bgColor = isMoneyOut ? "bg-customRed/10" : "bg-green-500/10";
  const textColor = isMoneyOut ? "text-customRed" : "text-green-700";
  const transactionTypeText = isMoneyOut ? "Uang Keluar" : "Uang Masuk";

  return (
    <div className="flex gap-2 items-center mb-4">
      <div
        className={`flex items-center justify-center p-3 rounded-full ${bgColor}`}
      >
        {arrowIcon}
      </div>
      <div className="flex items-center justify-between w-full">
        <div>
          <div className="font-semibold">{title}</div>
          <div className="font-nunito text-light text-sm text-gray-500">
            {date}, {time}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-400 text-end">
            {transactionTypeText}
          </div>
          <div className={`font-semibold font-nunito ${textColor} text-end`}>
            {formatNumber(amount)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceTransactionItem;
