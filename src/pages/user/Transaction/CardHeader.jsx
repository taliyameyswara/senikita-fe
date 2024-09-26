import React from "react";
import StatusDisplay from "./StatusDisplay";

const CardHeader = ({ item, transactionStatus, isService }) => {
  const itemType = item?.type || (isService ? "Service" : "Product");
  const invoiceNumber = item?.invoice || "Unknown Invoice";
  const transactionDate = item?.date || "Unknown Date";

  return (
    <div className="pb-2">
      <div className="flex justify-between">
        <div className="text-sm flex items-center gap-2">
          <div className="text-gray-400">{itemType}</div>
          <div className="text-gray-400">|</div>
          <div className="text-gray-400 font-nunito font-light">
            {invoiceNumber}
          </div>
          <div className="text-gray-400">|</div>
          <div className="text-gray-400 font-nunito font-light">
            {transactionDate}
          </div>
        </div>
        <div className="flex">
          <StatusDisplay
            transactionStatus={transactionStatus}
            type={isService ? "service" : "product"}
          />
        </div>
      </div>
      <div className="border-[0.5px] border-gray-100 my-2"></div>
    </div>
  );
};

export default CardHeader;
