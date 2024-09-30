import React from "react";
import { formatNumber } from "../../../../utils/formatNumber";

const ServiceTransactionCard = ({ service, header, button }) => {
  return (
    <div className="p-4 bg-white border rounded-xl mb-4">
      {/* Header */}
      {header}

      {/* Service Details */}
      <div className="flex gap-3">
        {/* Image */}
        <div className="">
          <img
            className="w-20 h-20 object-cover rounded-lg"
            src={service.image}
            alt="Service"
          />
        </div>

        {/* Details */}
        <div>
          <div className="text-xs text-tertiary">{service.providerName}</div>
          <h3 className="font-semibold md:text-lg">{service.name}</h3>
          <p className="text-gray-900 font-semibold font-nunito">
            {formatNumber(service.price)}
          </p>
        </div>
      </div>

      {/* Button */}
      {button}
    </div>
  );
};

export default ServiceTransactionCard;
