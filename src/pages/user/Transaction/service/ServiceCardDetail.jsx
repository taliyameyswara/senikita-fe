import React from "react";
import ServiceTransactionCard from "./ServiceTransactionCard";
const ServiceCardDetail = ({ services, provider }) => {
  return (
    <div className="mt-2">
      <div className="font-semibold mb-1">Detail Jasa</div>
      {services.map((service, index) => (
        <ServiceTransactionCard
          key={index}
          service={service}
          provider={provider}
        />
      ))}
    </div>
  );
};

export default ServiceCardDetail;
