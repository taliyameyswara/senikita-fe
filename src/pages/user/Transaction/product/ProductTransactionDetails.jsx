import React from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import UserDashboardLayout from "../../../../layouts/UserDashboardLayout";
import ProductCardDetail from "./ProductCardDetail";
import { ProductData } from "../../../../utils/ProductData";

import ShippingInfo from "./ShippingInfo";
import PaymentDetail from "../PaymentDetail";
import OrderInfo from "../OrderInfo";
import OrderNotes from "./OrderNotes";

import { useState, useEffect } from "react";
import { useAxiosInstance } from "../../../../config/axiosConfig";
import { useParams } from "react-router-dom";
import ProductOrderTransactionCard from "./ProductOrderTransactionCard";
import ProductTransactionCard from "./ProductTransactionCard";
import { toast } from "react-toastify";
const TransactionDetail = () => {
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
    { label: "Detail Transaksi", to: "/user/dashboard/transaction/details" },
  ];
  const fetchTransaction = async () => {
    try {
      const response = await axios.get(`user/transaction-history/${id}`);
      setTransaction(response.data.data.order);
      console.log(response.data.data.order);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const doneTranscation = async (id) => {
    axios.put(`/user/order/payment-status/${id}`)
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

  // /user/order/payment-status/2

  if (loading) {
    return (
      <UserDashboardLayout pageTitle="Dashboard | Detail Transaksi">
        <div>Loading...</div>
      </UserDashboardLayout>
    );
  }

  return (
    <UserDashboardLayout pageTitle="Dashboard | Detail Transaksi">
      <div className="flex flex-col gap-2 p-3 border rounded-xl">
        <div className="p-3 py-5 border rounded-xl bg-gray-50">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Content goes here */}
        <div className="flex flex-col gap-2 p-3">
          {/* Title */}
          <div className="text-xl font-semibold ">Detail Transaksi</div>

          <OrderInfo
            payment={transaction.status}
            shipping={transaction.status_order}
            type={"product"}
            invoiceNumber={transaction.no_transaction}
            purchaseDate={formatDate(transaction.created_at)}
          />
          <div>
            {transaction.status === "Success" && transaction.status_order === "delivered" &&
              <button onClick={() => doneTranscation(transaction.id)} className="px-4 py-2 mt-2 text-white rounded-xl bg-primary">Produk Diterima</button>
            }
          </div>

          <div className="mt-3">
            {transaction.product.map((produc, index) => (
              <div key={index} className="mb-4">
                <ProductTransactionCard
                  product={produc}
                  quantity={produc.pivot.qty}
                />
              </div>
            ))}
          </div>

          <OrderNotes notes={transaction.note} />

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <ShippingInfo
              courier={transaction.courier.toUpperCase() + ' - ' + transaction.service}
              trackingNumber="Nomor Resi"
              recipientName={transaction.address.name}
              phone={transaction.address.phone}
              address={transaction.address.address_detail}
              city={transaction.address.city.name}
              province={transaction.address.province.name}
            />

            <PaymentDetail
              paymentStatus={transaction.status}
              shippingStatus={transaction.status_order}
              urlInvoice={transaction.invoice_url}
              totalPrice={transaction.price}
              shippingCost={transaction.ongkir}
              totalPayment={transaction.price + transaction.ongkir + 5000}
              type="product"
            />
          </div>
        </div>
      </div>
    </UserDashboardLayout>
  );
};

export default TransactionDetail;
