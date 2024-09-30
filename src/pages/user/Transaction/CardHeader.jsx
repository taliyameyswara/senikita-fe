import React from "react";
import RenderStatus from "../../../utils/RenderStatus";

const CardHeader = ({ item, payment, shipping, type }) => {
  const { invoice = "Unknown Invoice", date = "Unknown Date" } = item || {};

  return (
    <div className="pb-2">
      <div className="flex justify-between">
        <div className="text-sm flex items-center gap-2">
          <div className="text-gray-400">{type}</div>
          <div className="text-gray-400">|</div>
          <div className="text-gray-400 font-nunito font-light">{invoice}</div>
          <div className="text-gray-400">|</div>
          <div className="text-gray-400 font-nunito font-light">{date}</div>
        </div>
        <div className="flex gap-2">
          <RenderStatus payment={payment} shipping={shipping} type={type} />
        </div>
      </div>
      <div className="border-[0.5px] border-gray-100 my-2"></div>
    </div>
  );
};

export default CardHeader;
