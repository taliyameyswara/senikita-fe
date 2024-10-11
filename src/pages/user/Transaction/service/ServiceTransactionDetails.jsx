import React from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import UserDashboardLayout from "../../../../layouts/UserDashboardLayout";
import { ServiceData } from "../../../../utils/ServiceData";
import OrderInfo from "../OrderInfo";
import ServiceCardDetail from "./ServiceCardDetail";
import ServiceOrderDetails from "./ServiceOrderDetails";
import PaymentDetail from "../PaymentDetail";
import CustomerInfo from "./CustomerInfo";
import { useState, useEffect } from "react";
import { useAxiosInstance } from "../../../../config/axiosConfig";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ServiceTransactionCard from "./ServiceTransactionCard";

// const eventDetails = {
//   eventName: "Pernikahan Adat Jawa",
//   eventDate: "2024-10-15",
//   eventTime: "18:00",
//   location: "Gedung Serbaguna Arjuna, Jl. Melati No. 23",
//   city: "Bantul",
//   province: "DI Yogyakarta",
//   note: "Pernikahan adat Jawa dengan tari Gambyong sebagai bagian dari acara penyambutan tamu",
//   participants: "300",
//   specialRequest: "Kalau bisa bajunya merah",
//   files: [
//     { name: "Jadwal Acara.pdf", size: 1500000 },
//     { name: "Desain Undangan.png", size: 2500000 },
//   ],
// };

const ServiceTransactionDetails = () => {
  const { id } = useParams();
  const axios = useAxiosInstance();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta', hour12: false };
    const date = new Date(dateString);

    return date.toLocaleString('id-ID', options).replace(',', ' WIB');
  };


  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/user/dashboard" },
    { label: "Daftar Transaksi", to: "/user/dashboard/transaction" },
    {
      label: "Detail Transaksi Jasa",
      to: "/user/dashboard/transaction/service/details",
    },
  ];

  // const paymentStatus = "pending";
  // const shippingStatus = "dikonfirmasi";
  const fetchTransaction = async () => {
    try {
      const response = await axios.get(`user/transaction-history-service/${id}`);
      setTransaction(response.data.data.order);
      console.log(response.data.data.order);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const doneTranscation = async (id) => {
    axios.put(`/user/order-service/payment-status/${id}`)
      .then((res) => {
        console.log(res);
        fetchTransaction();
        toast.success("Transaksi Berhasil");
      }).catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    fetchTransaction();
  }, []);

  if (loading) {
    return (
      <UserDashboardLayout pageTitle="Dashboard | Detail Transaksi Jasa">
        <div>Loading...</div>
      </UserDashboardLayout>
    );
  }

  return (
    <UserDashboardLayout pageTitle="Dashboard | Detail Transaksi Jasa">
      <div className="flex flex-col gap-2 p-3 border rounded-xl">
        <div className="p-3 py-5 border rounded-xl bg-gray-50">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 p-3">
          {/* Title */}
          <div className="text-xl font-semibold">Detail Transaksi Jasa</div>
          <OrderInfo
            type={"service"}
            payment={transaction.status}
            shipping={transaction.status_order}
            invoiceNumber={transaction.no_transaction}
            purchaseDate={formatDate(transaction.created_at)}
          />
          <div>
            {transaction.status === "Success" && transaction.status_order === "confirmed" &&
              <button onClick={() => doneTranscation(transaction.id)} className="px-4 py-2 mt-2 text-white border-white rounded-xl bg-primary">Selesaikan Transaksi</button>
            }
          </div>

          {/* Service Detail */}
          <div className="mt-3">
            <div className="mb-4">
              <ServiceTransactionCard
                service={transaction.service}
                quantity={transaction.qty}
                provider={transaction.service.shop.name}
              />
            </div>
          </div>

          {/* Event Details */}
          <ServiceOrderDetails eventDetails={transaction} />

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {/* Service Info */}
            <CustomerInfo
              name={transaction.name}
              phoneNumber={transaction.phone}
              address={transaction.address}
              city={transaction.city.name}
              province={transaction.province.name}
            />

            {/* Payment Detail */}
            <PaymentDetail
              isService={true}
              paymentStatus={transaction.status}
              shippingStatus={transaction.status_order}
              urlInvoice={transaction.invoice_url}
              totalPrice={transaction.price}
              totalPayment={transaction.price + 5000}
              type="service"
            />
          </div>
        </div>
      </div>
    </UserDashboardLayout>
  );
};

export default ServiceTransactionDetails;
