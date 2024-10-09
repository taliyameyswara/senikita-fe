import React from "react";
import CardHeader from "../CardHeader";
import CardButton from "../CardButton";
import ServiceTransactionCard from "./ServiceTransactionCard";
import { ServiceData } from "../../../../utils/ServiceData";
import { FaStar } from "react-icons/fa";

const ServiceTransaction = () => {
  return (
    <div className="space-y-4">
      {ServiceData.map((service, index) => {
        const paymentStatus = service.paymentStatus || "selesai";
        const shippingStatus = service.shippingStatus || "selesai";
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
              <>
                <div className="flex items-center gap-3 w-full justify-end">
                  {shippingStatus === "selesai" &&
                  paymentStatus === "selesai" ? (
                    <div className="p-1 px-2 text-xs border-[0.5px] border-opacity-70 border-primary  text-primary font-semibold rounded-lg flex gap-2 items-center hover:bg-primary hover:text-white duration-75 cursor-pointer">
                      <FaStar className="text-yellow-400" />
                      <div className="">Beri Ulasan</div>
                    </div>
                  ) : (
                    <></>
                  )}
                  <CardButton
                    buttonLink={`/user/dashboard/transaction/product/details`}
                    buttonLabel="Lihat Detail Produk"
                  />
                </div>
              </>
            }
          />
        );
      })}
    </div>
  );
};

export default ServiceTransaction;
