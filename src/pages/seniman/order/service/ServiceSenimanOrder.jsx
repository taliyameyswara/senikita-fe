import React, { useEffect, useState } from "react";
import OrderTable from "../OrderTable";
import Tabs from "../../../../components/Tabs";
import Modal from "../../../../components/Modal";
import OrderInfo from "../../../user/transaction/OrderInfo";
import { useAxiosInstance } from "../../../../config/axiosConfig";
import ServiceOrderTable from "./ServiceOrderTable";
import ProductCardDetail from "../../../user/transaction/product/ProductCardDetail";
import OrderNotes from "../../../user/transaction/product/OrderNotes";
import ShippingInfo from "../../../user/transaction/product/ShippingInfo";
import PaymentDetail from "../../../user/transaction/PaymentDetail";
import { toast } from "react-toastify";
import ProductTransactionCard from "../../../user/transaction/product/ProductTransactionCard";
import ServiceTransactionCard from "../../../user/transaction/service/ServiceTransactionCard";
import ServiceCardDetail from "../../../user/transaction/service/ServiceCardDetail";
import ServiceOrderDetails from "../../../user/transaction/service/ServiceOrderDetails";
import CustomerInfo from "../../../user/transaction/service/CustomerInfo";
import Spinner from "../../../../components/loading/Spinner";
const ProductSenimanOrder = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const axios = useAxiosInstance();
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
        console.log(order);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [loading, setLoading] = useState(false);
    const getOrders = async () => {
        await axios.get("/user/shop/order-service")
            .then((res) => {
                setOrders(res.data.orders);
                console.log(res.data.orders);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const handleConfirmOrder = (id) => {
        axios.put(`/user/shop/accept-order-service/${id}`)
            .then((res) => {
                console.log(res);
                handleCloseModal();
                toast.success("Layanan berhasil dikonfirmasi");
                getOrders();

            }).catch((err) => {
                console.error(err);
            });
    }

    const handleRejectedOrder = (id) => {
        axios.put(`/user/shop/reject-order-service/${id}`)
            .then((res) => {
                console.log(res);
                handleCloseModal();
                toast.success("Layanan berhasil ditolak");
                getOrders();

            }).catch((err) => {
                console.error(err);
            });
    }



    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await getOrders();
            setLoading(false);
        };

        fetchData();
    }, []);

    const filterOrderByStatus = (status) => {
        switch (status) {
            case "all":
                return orders;
            case "menunggu_konfirmasi":
                return orders.filter(
                    (order) => order.status === "pending" &&
                        order.status_order === "pending"
                );
            case "selesai":
                return orders.filter(
                    (order) =>
                        order.status === "DONE" &&
                        order.status_order === "DONE"
                );
            case "menunggu_pembayaran":
                return orders.filter(
                    (order) =>
                        order.status === "waiting for payment" &&
                        order.status_order === "confirmed"
                );
            case "dikirim":
                return orders.filter(
                    (order) =>
                        order.status === "Success" &&
                        order.status_order === "confirmed"
                );
            case "dibatalkan":
                return orders.filter(
                    (order) =>
                        order.status === "rejected" ||
                        order.status_order === "rejected"
                );
            default:
                return orders;
        }
    }



    const tabs = [
        {
            name: "all",
            label: "Semua",
            content: (
                <ServiceOrderTable orders={filterOrderByStatus("all")} onViewDetails={handleViewDetails} />
            ),
        },
        {
            name: "menunggu_konfirmasi",
            label: "Menunggu Konfirmasi",
            content: (
                <ServiceOrderTable orders={filterOrderByStatus("menunggu_konfirmasi")} onViewDetails={handleViewDetails} />
            ),
        },
        {
            name: "menunggu_pembayaran",
            label: "Belum Dibayar",
            content: (
                <ServiceOrderTable orders={filterOrderByStatus("menunggu_pembayaran")} onViewDetails={handleViewDetails} />
            ),
        },

        {
            name: "dikirim",
            label: "Dikirim/Dijadwalkan",
            content: (
                <ServiceOrderTable orders={filterOrderByStatus("dikirim")} onViewDetails={handleViewDetails} />
            ),
        },
        {
            name: "selesai",
            label: "Selesai",
            content: (
                <ServiceOrderTable orders={filterOrderByStatus("selesai")} onViewDetails={handleViewDetails} />
            ),
        },
        {
            name: "dibatalkan",
            label: "Dibatalkan",
            content: (
                <ServiceOrderTable orders={filterOrderByStatus("dibatalkan")} onViewDetails={handleViewDetails} />
            ),
        },
    ];


    if (loading) {
        return <Spinner />;
    }

    return (
        <>

            <Tabs tabs={tabs} />

            {selectedOrder && (
                <Modal
                    isForm={false}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    title={`Detail Pesanan`}
                    subtitle={
                        <>
                            <OrderInfo
                                type={"service"}
                                payment={selectedOrder.status}
                                shipping={selectedOrder.status_order}
                                invoiceNumber={selectedOrder.no_transaction}
                                purchaseDate={selectedOrder.created_at}
                            />
                            {selectedOrder.status != 'pending' ? (
                                <button
                                    className="px-4 py-2 mt-4 text-gray-500 bg-gray-300 cursor-not-allowed rounded-xl"
                                    disabled
                                >
                                    Pesanan Dikonfirmasi
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        className="px-4 py-2 mt-4 text-white transition bg-primary rounded-xl hover:bg-primary-dark"
                                        onClick={() => handleConfirmOrder(selectedOrder.id)}
                                    >
                                        Konfirmasi Pesanan
                                    </button>
                                    <button
                                        className="px-4 py-2 mt-4 text-white transition bg-brick rounded-xl hover:bg-primary-dark"
                                        onClick={() => handleRejectedOrder(selectedOrder.id)}
                                    >
                                        Tolak Pesanan
                                    </button>
                                </div>


                            )}
                        </>
                    }
                >
                    <div className="flex flex-col gap-2">
                        <>

                            <div className="mt-3">
                                <div className="mb-4">
                                    <ServiceTransactionCard
                                        service={selectedOrder.service}
                                        quantity={selectedOrder.qty}
                                        provider={selectedOrder.service.shop.name}
                                    />
                                </div>
                            </div>
                            <>
                                {/* Service Details */}
                                <ServiceOrderDetails
                                    eventDetails={selectedOrder}
                                />

                                <div className="grid grid-cols-2 gap-2">
                                    {/* Shipping Info */}
                                    <CustomerInfo
                                        name={selectedOrder.name}
                                        phoneNumber={selectedOrder.phone}
                                        address={selectedOrder.address}
                                        city={selectedOrder.city.name}
                                        province={selectedOrder.province.name}
                                    />

                                    {/* Payment Detail */}
                                    <PaymentDetail
                                        isService={true}
                                        totalPrice={selectedOrder.price}
                                        totalPayment={selectedOrder.price + 5000}
                                    />
                                </div>
                            </>
                        </>
                    </div>
                </Modal>
            )
            }

        </>
    );
};

export default ProductSenimanOrder;