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
import { FaStar } from "react-icons/fa";
import Modal from "../../../../components/Modal";
import { formatNumber } from "../../../../utils/formatNumber";
import TextareaInput from "../../../../components/form-input/TextareaInput";
import MultipleImageUploader from "../../../../components/MultipleImageUploader";
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


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  const openReviewModal = (service) => {
    setCurrentService(service);
    setIsModalOpen(true);
  };

  const closeReviewModal = () => {
    setCurrentService(null);
    setIsModalOpen(false);
  };
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [photos, setPhotos] = useState([]);


  const handleSubmit = async () => {

    const formData = new FormData();
    formData.append("comment", reviewText);
    formData.append("rating", rating);
    photos.forEach((photo, index) => {
      formData.append(`images_rating[]`, photo.file);
    });

    try {
      await axios.post(`/user/service/rating/${currentService.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      toast.success("Ulasan berhasil dikirim");
      setReviewText("");
      setRating(0);
      setPhotos([]);
      closeReviewModal();
    } catch (error) {
      if (error.response) {
        const serverErrors = error.response.data.errors;
        for (const key in serverErrors) {
          if (serverErrors.hasOwnProperty(key)) {
            serverErrors[key].forEach((errorMessage) => {
              toast.error(errorMessage);
            });
          }
        }
      } else if (error.request) {
        toast.error("Tidak ada respon dari server");
      } else {
        toast.error("Terjadi kesalahan dalam menambahkan Ulasan");
      }
    }
  };

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
                  button={
                    transaction.status === "DONE" && transaction.status_order === "DONE" &&
                    <button onClick={() => openReviewModal(produc)} className="p-1 px-2 text-xs border-[0.5px] border-opacity-70 border-primary text-primary font-semibold rounded-lg flex gap-2 items-center hover:bg-primary hover:text-white duration-75 cursor-pointer">
                      <FaStar className="text-yellow-400" />
                      <div>Beri Ulasan</div>
                    </button>
                  }

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


      {currentService && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeReviewModal}
          title="Beri Ulasan"
          subtitle={
            <div className="flex gap-3 py-2">
              <img
                src={currentService.thumbnail}
                alt={currentService.name}
                className="object-cover w-12 h-12 rounded-lg"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-black">
                  {currentService.name}
                </span>
                <span className="text-sm font-light text-black font-nunito">
                  {formatNumber(currentService.price)}
                </span>
              </div>
            </div>
          }
          handleSubmit={handleSubmit} // Fungsi submit akan dijalankan saat tombol "Simpan" pada Modal diklik
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-sm text-center text-gray-400">
              Seberapa puas Anda dengan produk atau jasa yang diterima? <br /> Bagikan pengalaman Anda dengan memberikan rating dan ulasan produk atau jasa ini.
            </div>

            <div className="flex items-center justify-center gap-2 my-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer text-3xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>

            <TextareaInput
              placeholder="Tulis ulasan Anda..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            <MultipleImageUploader
              title={
                <>
                  <div className="text-lg font-semibold">
                    Upload Gambar Ulasan (Opsional)
                  </div>
                  <div className="mb-4 text-sm text-gray-400">
                    Pilih foto atau tarik dan letakkan hingga 5 foto sekaligus di sini
                    dengan minimal 1 foto utama (thumbnail).
                  </div>
                </>
              }
              images={photos}
              setImages={(newPhotos) => setPhotos(newPhotos)}
              maxImages={3}
              acceptedFormats={[".jpg", ".jpeg", ".png"]}
              minSize={100}
              optimalSize={1200}
            />
          </form>
        </Modal>
      )}



    </UserDashboardLayout>


  );
};

export default TransactionDetail;
