import React from "react";
import { formatNumber } from "../../../../utils/formatNumber";

const ServiceTransactionCard = ({ service, header, button, provider, quantity }) => {
  return (
    <div className="p-4 mb-4 bg-white border rounded-xl">
      {/* Header */}
      {header}

      {/* Service Details */}
      <div className="flex gap-3">
        {/* Image */}
        <div className="">
          <img
            className="object-cover w-20 h-20 rounded-lg"
            src={service.thumbnail}
            alt="Service"
          />
        </div>

        {/* Details */}
        <div>
          <div className="text-xs text-tertiary">{provider}</div>
          <h3 className="font-semibold md:text-lg">{service.name}</h3>
          <p className="font-semibold text-gray-900 font-nunito">
            {quantity} item x {formatNumber(service.price)}
          </p>
        </div>
      </div>

      {/* Button */}
      {button}
    </div>
  );
};

export default ServiceTransactionCard;
