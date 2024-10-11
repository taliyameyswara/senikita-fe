import React from "react";
import RenderStatus from "../../../utils/RenderStatus";

const OrderInfo = ({
  payment,
  shipping,
  type,
  invoiceNumber,
  purchaseDate,
}) => {
  return (
    <div className="">
      <div className="flex flex-wrap gap-2 mb-2 md:flex-nowrap">

        <RenderStatus payment={payment} shipping={shipping} type={type} />
      </div>
      <div className="flex gap-6">
        <div className="text-gray-500">
          <div>No. Invoice</div>
          <div>Tanggal Pembelian</div>
        </div>
        <div className="">
          <div className="font-nunito">{invoiceNumber}</div>
          <div className="font-nunito">{purchaseDate}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
