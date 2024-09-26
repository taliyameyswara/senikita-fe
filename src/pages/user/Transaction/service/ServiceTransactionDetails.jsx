import React from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import UserDashboardLayout from "../../../../layouts/UserDashboardLayout";
import ServiceTransactionCard from "./ServiceTransactionCard";
import { ServiceData } from "../../../../utils/ServiceData";
import StatusDisplay from "../StatusDisplay";
import { formatNumber } from "../../../../utils/formatNumber";

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

          <div className="">
            <div className="mb-2">
              <StatusDisplay transactionStatus="sedang berlangsung" />
            </div>

            <div className="flex gap-6">
              <div className="text-gray-500">
                <div>No. Invoice</div>
                <div>Tanggal Pemesanan</div>
              </div>
              <div className="">
                <div className="font-nunito">INV983762178</div>
                <div className="font-nunito">15 Agustus 2024, 14.00 WIB</div>
              </div>
            </div>
          </div>

          {/* Service Detail */}
          <div className="mt-2">
            <div className="font-semibold mb-1">Detail Jasa</div>
            {ServiceData.slice(0, 1).map((service, index) => (
              <ServiceTransactionCard key={index} service={service} />
            ))}
          </div>

          {/* Event Details */}
          <div className="mb-2">
            <div className="font-semibold mb-1">Detail Acara</div>
            <div className="flex gap-5">
              <div className="text-gray-500 2">
                <div>Nama Acara </div>
                <div>Tanggal Acara </div>
                <div>Waktu Acara</div>
                <div>Lokasi</div>
                <div>Peserta </div>
                <div>Catatan </div>
                <div>Permintaan Khusus </div>
              </div>

              <div className="">
                <div className="">{eventDetails.eventName}</div>
                <div className="">{eventDetails.eventDate}</div>
                <div className="">{eventDetails.eventTime}</div>
                <div className="">
                  {eventDetails.location}, {eventDetails.city},{" "}
                  {eventDetails.province}
                </div>
                <div className="">{eventDetails.participants}</div>
                <div className="">{eventDetails.note}</div>
                <div className="">{eventDetails.specialRequest}</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            {/* Service Info */}
            <div className="">
              <div className="font-semibold">Info Jasa</div>
              <div className="grid grid-cols-3">
                <div className="text-gray-500 col-span-1">
                  <div>Nama Penyedia</div>
                  <div>Telepon</div>
                  <div>Lokasi Layanan</div>
                </div>
                <div className="col-span-2">
                  <div>{ServiceData[0].providerName}</div>
                  <div className="font-nunito font-light">
                    {ServiceData[0].providerPhone}
                  </div>
                  <div>{ServiceData[0].location}</div>
                </div>
              </div>
            </div>

            {/* Payment Detail */}
            <div className="mt-2">
              <div className="font-semibold">Rincian Pembayaran</div>
              <div className="flex gap-8">
                <div className="text-gray-500">
                  <div>Biaya Jasa</div>
                  <div className="font-semibold text-primary">
                    Total Pembayaran
                  </div>
                </div>
                <div className="">
                  <div>{formatNumber(ServiceData[0].price)}</div>
                  <div className="font-semibold text-primary">
                    {formatNumber(ServiceData[0].price)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserDashboardLayout>
  );
};

export default ServiceTransactionDetails;
