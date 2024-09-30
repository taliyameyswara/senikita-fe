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

const orders = [
  {
    id: 1,
    type: "service",
    invoiceNumber: "INV982618638271",
    purchaseDate: "13 Agustus 2024, 09:45 WIB",
    customer: "Jane Doe",
    total: "Rp 1.510.000",
    paymentStatus: "pending",
    shippingStatus: "menunggu_konfirmasi",
    items: "1",
    status: "cancelled",
    service: [
      {
        image:
          "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        name: "Tari Gambyong Pareanom",
        quantity: 1,
        price: 1500000,
        providerName: "Sanggar Nyenyenyonye",
      },
    ],
    customerInfo: {
      name: "John Doe",
      address: "Jl. Imam Bonjol No.207, Pendrikan Kidul",
      city: "Semarang",
      province: "Jawa Tengah",
      phone: "0887613472",
    },
    eventDetails: {
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
    },
    paymentDetails: {
      totalPrice: 1500000,
      shippingCost: 10000,
      totalPayment: 1510000,
    },
  },
  {
    id: 2,
    type: "product",
    invoiceNumber: "INV982618638271",
    purchaseDate: "13 Agustus 2024, 09:45 WIB",
    customer: "Jane Doe",
    total: "Rp 1.510.000",
    paymentStatus: "Selesai",
    shippingStatus: "Diproses",
    items: "2",
    products: [
      {
        name: "Lukisan Abstrak Khas Jawa Tengah",
        quantity: 1,
        price: 1500000,
      },
      {
        name: "Lukisan Abstrak Khas Jawa Barat",
        quantity: 2,
        price: 2000000,
      },
    ],
    notes: "Tidak ada catatan khusus.",
    shippingInfo: {
      courier: "SiCepat - Reguler",
      trackingNumber: "TLJ8726438271231",
      recipientName: "Mimoy Doe",
      address: "Jl. Imam Bonjol No.207, Pendrikan Kidul",
      city: "Semarang",
      province: "Jawa Tengah",
      phone: "0887613472",
    },
    paymentDetails: {
      totalPrice: 1500000,
      shippingCost: 10000,
      totalPayment: 1510000,
    },
  },
];

const SenimanOrder = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJenisKesenian, setSelectedJenisKesenian] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/seniman/dashboard" },
    { label: "Pesanan", to: "/seniman/dashboard/order" },
  ];

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const filterOrdersByJenisKesenian = (orders) => {
    if (selectedJenisKesenian === "Produk") {
      return orders.filter((order) => order.type === "product");
    } else if (selectedJenisKesenian === "Jasa") {
      return orders.filter((order) => order.type === "service");
    }
    return orders;
  };

  const filterOrdersByStatus = (orders, status) => {
    switch (status) {
      case "all":
        return orders;
      case "pending":
        return orders.filter(
          (order) => order.paymentStatus === "Belum Dibayar"
        );
      case "selesai":
        return orders.filter(
          (order) =>
            order.paymentStatus === "Selesai" &&
            order.shippingStatus === "Selesai"
        );
      case "diproses":
        return orders.filter(
          (order) =>
            order.paymentStatus === "Selesai" &&
            order.shippingStatus === "Diproses"
        );
      case "dikirim":
        return orders.filter(
          (order) =>
            order.paymentStatus === "Selesai" &&
            order.shippingStatus === "Dikirim/Dijadwalkan"
        );
      case "dibatalkan":
        return orders.filter(
          (order) =>
            order.shippingStatus === "Dibatalkan" ||
            order.paymentStatus === "Gagal"
        );
      default:
        return orders;
    }
  };

  const filteredOrders = filterOrdersByStatus(
    filterOrdersByJenisKesenian(orders),
    selectedStatus
  );

  const tabs = [
    {
      name: "all",
      label: "Semua",
      content: (
        <OrderTable orders={filteredOrders} onViewDetails={handleViewDetails} />
      ),
    },
    {
      name: "pending",
      label: "Belum Dibayar",
      content: (
        <OrderTable orders={filteredOrders} onViewDetails={handleViewDetails} />
      ),
    },
    {
      name: "diproses",
      label: "Diproses",
      content: (
        <OrderTable orders={filteredOrders} onViewDetails={handleViewDetails} />
      ),
    },
    {
      name: "dikirim",
      label: "Dikirim/Dijadwalkan",
      content: (
        <OrderTable orders={filteredOrders} onViewDetails={handleViewDetails} />
      ),
    },
    {
      name: "selesai",
      label: "Selesai",
      content: (
        <OrderTable orders={filteredOrders} onViewDetails={handleViewDetails} />
      ),
    },
    {
      name: "dibatalkan",
      label: "Dibatalkan",
      content: (
        <OrderTable orders={filteredOrders} onViewDetails={handleViewDetails} />
      ),
    },
  ];
  const handleConfirmOrder = () => {
    setSelectedOrder((prevState) => ({
      ...prevState,
      isConfirmed: true,
    }));
    console.log("Pesanan telah dikonfirmasi:", selectedOrder);
  };

  return (
    <SenimanDashboardLayout pageTitle="Pesanan">
      <div className="flex flex-col gap-2 border p-3 rounded-xl">
        <div className="border p-3 py-5 rounded-xl bg-gray-50">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <div className="p-3 flex flex-col gap-2">
          <div className="text-xl font-semibold">Pesanan</div>

          <DropdownFilter
            options={["Semua Jenis Kesenian", "Produk", "Jasa"]}
            selectedOption={selectedJenisKesenian}
            setSelectedOption={setSelectedJenisKesenian}
            label="Jenis Kesenian"
          />
          <Tabs tabs={tabs} />
        </div>
      </div>

      {selectedOrder && (
        <Modal
          isForm={false}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={`Detail Pesanan`}
          subtitle={
            <>
              {selectedOrder.type === "product" && (
                <OrderInfo
                  type={"product"}
                  payment={selectedOrder.paymentStatus}
                  shipping={selectedOrder.shippingStatus}
                  invoiceNumber={selectedOrder.invoiceNumber}
                  purchaseDate={selectedOrder.purchaseDate}
                />
              )}
              {selectedOrder.type === "service" && (
                <>
                  <>
                    <OrderInfo
                      type={"service"}
                      payment={selectedOrder.paymentStatus}
                      shipping={selectedOrder.shippingStatus}
                      invoiceNumber={selectedOrder.invoiceNumber}
                      purchaseDate={selectedOrder.purchaseDate}
                    />

                    {selectedOrder.isConfirmed ? (
                      <button
                        className="mt-4 px-4 py-2 bg-gray-300 text-gray-500 rounded-xl cursor-not-allowed"
                        disabled
                      >
                        Pesanan Dikonfirmasi
                      </button>
                    ) : (
                      <button
                        className="mt-4 px-4 py-2 bg-primary text-white rounded-xl transition hover:bg-primary-dark"
                        onClick={() => handleConfirmOrder()}
                      >
                        Konfirmasi Pesanan
                      </button>
                    )}
                  </>
                </>
              )}
            </>
          }
        >
          <div className="flex flex-col gap-2">
            {selectedOrder.type === "product" && (
              <>
                {/* Product Details */}
                <ProductCardDetail
                  products={selectedOrder.products}
                  provider={selectedOrder.provider}
                />

                {/* Notes */}
                {selectedOrder.notes && (
                  <OrderNotes notes={selectedOrder.notes} />
                )}

                <div className="grid grid-cols-2 gap-2">
                  {/* Shipping Info */}
                  {selectedOrder.shippingInfo && (
                    <ShippingInfo
                      recipientName={selectedOrder.shippingInfo.recipientName}
                      phone={selectedOrder.shippingInfo.phone}
                      address={selectedOrder.shippingInfo.address}
                      city={selectedOrder.shippingInfo.city}
                      province={selectedOrder.shippingInfo.province}
                      courier={selectedOrder.shippingInfo.courier}
                      trackingNumber={selectedOrder.shippingInfo.trackingNumber}
                      shippingAddress={selectedOrder.shippingInfo.address}
                    />
                  )}
                  {/* Payment Detail */}
                  <PaymentDetail
                    totalPrice={selectedOrder.paymentDetails.totalPrice}
                    shippingCost={selectedOrder.paymentDetails.shippingCost}
                    totalPayment={selectedOrder.paymentDetails.totalPayment}
                  />
                </div>
              </>
            )}

            {/* For Service Orders */}
            {selectedOrder.type === "service" && (
              <>
                {/* Service Details */}

                <ServiceCardDetail
                  services={selectedOrder.service}
                  provider={selectedOrder.provider}
                />

                <ServiceOrderDetails
                  eventDetails={selectedOrder.eventDetails}
                />

                <div className="grid grid-cols-2 gap-2">
                  {/* Shipping Info */}
                  {selectedOrder.customerInfo && (
                    <CustomerInfo
                      name={selectedOrder.customerInfo.name}
                      phoneNumber={selectedOrder.customerInfo.phone}
                      address={selectedOrder.customerInfo.address}
                      city={selectedOrder.customerInfo.city}
                      province={selectedOrder.customerInfo.province}
                    />
                  )}
                  {/* Payment Detail */}
                  <PaymentDetail
                    totalPrice={selectedOrder.paymentDetails.totalPrice}
                    shippingCost={selectedOrder.paymentDetails.shippingCost}
                    totalPayment={selectedOrder.paymentDetails.totalPayment}
                  />
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
    </SenimanDashboardLayout>
  );
};

export default SenimanOrder;
