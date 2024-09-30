import React from "react";
import CardHeader from "../CardHeader";
import CardButton from "../CardButton";
import ServiceTransactionCard from "./ServiceTransactionCard";
import { ServiceData } from "../../../../utils/ServiceData";

const ServiceTransaction = () => {
  return (
    <div className="space-y-4">
      {ServiceData.map((service, index) => {
        const paymentStatus = service.paymentStatus || "";
        const shippingStatus = service.shippingStatus || "ditolak";
        return (
          <ServiceTransactionCard
            key={service.id || index}
            service={service}
            header={
              <CardHeader
                item={service}
                payment={paymentStatus}
                shipping={shippingStatus}
                type={"service"}
              />
            }
            button={
              <CardButton
                buttonLink={`/user/dashboard/transaction/service/details`}
                buttonLabel="Lihat Detail Transaksi"
              />
            }
          />
        );
      })}
    </div>
  );
};

export default ServiceTransaction;
