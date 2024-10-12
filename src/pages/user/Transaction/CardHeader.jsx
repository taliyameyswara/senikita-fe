import React from "react";
import RenderStatus from "../../../utils/RenderStatus";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("id-ID", options); // Menggunakan locale Indonesia
};

const CardHeader = ({
  item,
  payment,
  shipping,
  type,
  invoice,
  date,
  customer,
}) => {
  const formattedDate = formatDate(date);

  return (
    <div className="pb-2">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 text-sm">
          <div className="text-gray-400">
            {type === "product" ? "Produk Kesenian" : "Jasa Kesenian"}
          </div>
          <div className="text-gray-400">|</div>
          <div className="font-light text-gray-400 font-nunito">{invoice}</div>
          <div className="text-gray-400">|</div>
          <div className="font-light text-gray-400 font-nunito">
            {formattedDate}
          </div>

          <div className="font-light text-gray-400 font-nunito">
            | {customer}
          </div>
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
