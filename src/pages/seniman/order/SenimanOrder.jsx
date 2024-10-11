import React, { useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import SenimanDashboardLayout from "../../../layouts/SenimanDashboardLayout";
import Modal from "../../../components/Modal";
import Tabs from "../../../components/Tabs";
import ShippingInfo from "../../user/transaction/product/ShippingInfo";
import PaymentDetail from "../../user/transaction/PaymentDetail";
import OrderInfo from "../../user/transaction/OrderInfo";
import OrderNotes from "../../user/transaction/product/OrderNotes";
import ProductCardDetail from "../../user/transaction/product/ProductCardDetail";
import DropdownFilter from "../../../components/DropdownFilter";
import OrderTable from "./OrderTable";
import CustomerInfo from "../../user/transaction/service/CustomerInfo";
import ServiceCardDetail from "../../user/transaction/service/ServiceCardDetail";
import ServiceOrderDetails from "../../user/transaction/service/ServiceOrderDetails";
import ProductSenimanOrder from "./product/ProductSenimanOrder";
import ServiceSenimanOrder from "./service/ServiceSenimanOrder";


const SenimanOrder = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJenisKesenian, setSelectedJenisKesenian] = useState("Produk");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/seniman/dashboard" },
    { label: "Pesanan", to: "/seniman/dashboard/order" },
  ];

  return (
    <SenimanDashboardLayout pageTitle="Pesanan">
      <div className="flex flex-col gap-2 p-3 border rounded-xl">
        <div className="p-3 py-5 border rounded-xl bg-gray-50">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <div className="flex flex-col gap-2 p-3">
          <div className="text-xl font-semibold">Pesanan</div>

          <DropdownFilter
            options={["Produk", "Jasa"]}
            selectedOption={selectedJenisKesenian}
            setSelectedOption={setSelectedJenisKesenian}
            label="Jenis Kesenian"
          />
          {
            selectedJenisKesenian === "Produk" ? (
              <ProductSenimanOrder />
            ) : (
              <ServiceSenimanOrder />
            )
          }
        </div>
      </div>
    </SenimanDashboardLayout>
  );
};

export default SenimanOrder;
