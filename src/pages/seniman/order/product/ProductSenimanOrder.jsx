import React, { useEffect, useState } from "react";
import OrderTable from "../OrderTable";
import Tabs from "../../../../components/Tabs";
import Modal from "../../../../components/Modal";
import OrderInfo from "../../../user/transaction/OrderInfo";
import { useAxiosInstance } from "../../../../config/axiosConfig";
import ProductOrderTable from "./ProductOrderTable";
import ProductCardDetail from "../../../user/transaction/product/ProductCardDetail";
import OrderNotes from "../../../user/transaction/product/OrderNotes";
import ShippingInfo from "../../../user/transaction/product/ShippingInfo";
import PaymentDetail from "../../../user/transaction/PaymentDetail";
import { toast } from "react-toastify";
import ProductTransactionCard from "../../../user/transaction/product/ProductTransactionCard";
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
        await axios.get("/user/shop/order-product")
            .then((res) => {
                setOrders(res.data.orders);
                console.log(res.data.orders);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const sendProduct = (id) => {
        axios.put(`/user/shop/accept-order/${id}`)
            .then((res) => {
                console.log(res);
                handleCloseModal();
                toast.success("Berhasil mengirim produk");
                getOrders();

            }).catch((err) => {
                console.error(err);
            });
    }

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            await getOrders();
            setLoading(false);
        }

        fetchOrders();
    }, []);

    const filterOrderByStatus = (status) => {
        switch (status) {
            case "all":
                return orders;
            case "pending":
                return orders.filter(
                    (order) => order.status === "pending" &&
                        order.status_order === "waiting"
                );
            case "selesai":
                return orders.filter(
                    (order) =>
                        order.status === "DONE" &&
                        order.status_order === "DONE"
                );
            case "diproses":
                return orders.filter(
                    (order) =>
                        order.status === "Success" &&
                        order.status_order === "process"
                );
            case "dikirim":
                return orders.filter(
                    (order) =>
                        order.status === "Success" &&
                        order.status_order === "delivered"
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
                <ProductOrderTable orders={filterOrderByStatus("all")} onViewDetails={handleViewDetails} />
            ),
        },
        {
            name: "pending",
            label: "Belum Dibayar",
            content: (
                <ProductOrderTable orders={filterOrderByStatus("pending")} onViewDetails={handleViewDetails} />
            ),
        },
        {
            name: "diproses",
            label: "Diproses",
            content: (
                <ProductOrderTable orders={filterOrderByStatus("diproses")} onViewDetails={handleViewDetails} />
            ),
        },
        {
            name: "dikirim",
            label: "Dikirim/Dijadwalkan",
            content: (
                <ProductOrderTable orders={filterOrderByStatus("dikirim")} onViewDetails={handleViewDetails} />
            ),
        },
        {
            name: "selesai",
            label: "Selesai",
            content: (
                <ProductOrderTable orders={filterOrderByStatus("selesai")} onViewDetails={handleViewDetails} />
            ),
        },
        {
            name: "dibatalkan",
            label: "Dibatalkan",
            content: (
                <ProductOrderTable orders={filterOrderByStatus("dibatalkan")} onViewDetails={handleViewDetails} />
            ),
        },
    ];


    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            {/* <div className="flex flex-col gap-2 ">
                <div className="text-xl font-semibold">Pesanan Produk</div>
            </div> */}
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
                                type={"product"}
                                payment={selectedOrder.status}
                                shipping={selectedOrder.status_order}
                                invoiceNumber={selectedOrder.no_transaction}
                                purchaseDate={selectedOrder.created_at}
                            />
                            {selectedOrder.status === "Success" && selectedOrder.status_order === "process" &&
                                <button onClick={() => sendProduct(selectedOrder.id)} className="px-4 py-2 mt-2 text-white rounded-xl bg-primary" >Kirim Produk</button>
                            }
                        </>
                    }
                >
                    <div className="flex flex-col gap-2">
                        <>


                            <div className="mt-3">
                                {selectedOrder.product.map((produc, index) => (
                                    <div key={index} className="mb-4">
                                        <ProductTransactionCard
                                            product={produc}
                                            quantity={produc.pivot.qty}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Notes */}
                            {selectedOrder.note && (
                                <OrderNotes notes={selectedOrder.note} />
                            )}

                            <div className="grid grid-cols-2 gap-2">
                                {/* Shipping Info */}
                                {selectedOrder.address && (
                                    <ShippingInfo
                                        recipientName={selectedOrder.address.name}
                                        phone={selectedOrder.address.phone}
                                        address={selectedOrder.address.address_detail}
                                        city={selectedOrder.address.city.name}
                                        province={selectedOrder.address.province.name}
                                        courier={selectedOrder.courier}
                                        trackingNumber={selectedOrder.courier + " - " + selectedOrder.tracking_number}
                                        shippingAddress={selectedOrder.address.address_detail}
                                    />
                                )}
                                {/* Payment Detail */}
                                <PaymentDetail
                                    totalPrice={selectedOrder.price}
                                    shippingCost={selectedOrder.ongkir}
                                    totalPayment={selectedOrder.total_price}
                                />
                            </div>
                        </>
                    </div>
                </Modal>
            )
            }

        </>
    );
};

export default ProductSenimanOrder;