import React from "react";
import StatusDisplay from "./StatusDisplay";

const CardHeader = ({ product, transactionStatus }) => {
  return (
    <div className="pb-2">
      <div className="flex justify-between">
        <div className="text-sm flex items-center gap-2">
          <div className="text-gray-400">{product.type} Kesenian</div>
          <div className="text-gray-400">|</div>
          <div className="text-gray-400">INV982618638271</div>
          <div className="text-gray-400">|</div>
          <div className="text-gray-400">13 Agustus 2024</div>
        </div>
        <div className="flex">
          <StatusDisplay transactionStatus={transactionStatus} />
        </div>
      </div>
      <div className="border-[0.5px] border-gray-100 my-2"></div>
    </div>
  );
};

export default CardHeader;
