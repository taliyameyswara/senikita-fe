import React from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import UserDashboardLayout from "../../../../layouts/UserDashboardLayout";
import ProductCardDetail from "./ProductCardDetail";
import { ProductData } from "../../../../utils/ProductData";

import ShippingInfo from "./ShippingInfo";
import PaymentDetail from "../PaymentDetail";
import OrderInfo from "../OrderInfo";
import OrderNotes from "./OrderNotes";

const TransactionDetail = () => {
  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/user/dashboard" },
    { label: "Daftar Transaksi", to: "/user/dashboard/transaction" },
    { label: "Detail Transaksi", to: "/user/dashboard/transaction/details" },
  ];
  return (
    <UserDashboardLayout pageTitle="Dashboard | Detail Transaksi">
      <div className="flex flex-col gap-2 border p-3 rounded-xl">
        <div className="border p-3 py-5 rounded-xl bg-gray-50">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Content goes here */}
        <div className="flex flex-col gap-2 p-3">
          {/* Title */}
          <div className="text-xl font-semibold ">Detail Transaksi</div>

          <OrderInfo
            payment="Selesai"
            shipping="Diproses"
            invoiceNumber="INV982618638271"
            purchaseDate="13 Agustus 2024, 09.45 WIB"
          />

          {/* Product Detail */}
          <ProductCardDetail
            products={ProductData.slice(0, 1)}
            provider={"Sanggar Tari Puspita"}
          />

          {/* Notes */}
          <OrderNotes notes="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, quaerat enim fuga praesentium assumenda in eius ex. Aut porro odit, odio dolore corrupti veritatis perspiciatis voluptatem, explicabo velit optio earum?" />

          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            <ShippingInfo
              courier="SiCepat - Reguler"
              trackingNumber="TLJ8726438271231"
              recipientName="Mimoi"
              phone="0887613472"
              address="Jl. Imam Bonjol No.207, Pendrikan Kidul"
              city="Kota Semarang"
              province="Jawa Tengah"
            />

            <PaymentDetail
              totalPrice={1500000}
              shippingCost={10000}
              totalPayment={1510000}
            />
          </div>
        </div>
      </div>
    </UserDashboardLayout>
  );
};

export default TransactionDetail;
