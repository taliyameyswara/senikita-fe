import React from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import UserDashboardLayout from "../../../../layouts/UserDashboardLayout";
import { ServiceData } from "../../../../utils/ServiceData";
import OrderInfo from "../OrderInfo";
import ServiceCardDetail from "./ServiceCardDetail";
import ServiceOrderDetails from "./ServiceOrderDetails";
import PaymentDetail from "../PaymentDetail";
import CustomerInfo from "./CustomerInfo";

const eventDetails = {
  eventName: "Pernikahan Adat Jawa",
  eventDate: "2024-10-15",
  eventTime: "18:00",
  location: "Gedung Serbaguna Arjuna, Jl. Melati No. 23",
  city: "Bantul",
  province: "DI Yogyakarta",
  note: "Pernikahan adat Jawa dengan tari Gambyong sebagai bagian dari acara penyambutan tamu",
  participants: "300",
  specialRequest: "Kalau bisa bajunya merah",
  files: [
    { name: "Jadwal Acara.pdf", size: 1500000 },
    { name: "Desain Undangan.png", size: 2500000 },
  ],
};

const ServiceTransactionDetails = () => {
  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/user/dashboard" },
    { label: "Daftar Transaksi", to: "/user/dashboard/transaction" },
    {
      label: "Detail Transaksi Jasa",
      to: "/user/dashboard/transaction/service/details",
    },
  ];

  const paymentStatus = "pending";
  const shippingStatus = "dikonfirmasi";

  return (
    <UserDashboardLayout pageTitle="Dashboard | Detail Transaksi Jasa">
      <div className="flex flex-col gap-2 border p-3 rounded-xl">
        <div className="border p-3 py-5 rounded-xl bg-gray-50">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 p-3">
          {/* Title */}
          <div className="text-xl font-semibold">Detail Transaksi Jasa</div>

          <OrderInfo
            type={"service"}
            payment={paymentStatus}
            shipping={shippingStatus}
            invoiceNumber="INV982618638271"
            purchaseDate="13 Agustus 2024, 09.45 WIB"
          />

          {/* Service Detail */}
          <ServiceCardDetail
            services={ServiceData.slice(0, 1)}
            provider={"Sanggar Tari Puspita"}
          />

          {/* Event Details */}
          <ServiceOrderDetails eventDetails={eventDetails} />

          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            {/* Service Info */}
            <CustomerInfo
              name={"Nama User"}
              phoneNumber={"08123456789"}
              address={"Jl. Melati No. 23"}
              city={"Bantul"}
              province={"DI Yogyakarta"}
            />

            {/* Payment Detail */}
            <PaymentDetail
              isService={true}
              totalPrice={1500000}
              shippingCost={10000}
              totalPayment={1510000}
              paymentStatus={paymentStatus}
              shippingStatus={shippingStatus}
            />
          </div>
        </div>
      </div>
    </UserDashboardLayout>
  );
};

export default ServiceTransactionDetails;
