// ServiceTransaction.js
import React, { useState, useEffect } from "react";
import CardHeader from "../CardHeader";
import CardButton from "../CardButton";
import ServiceTransactionCard from "./ServiceTransactionCard";
import { useAxiosInstance } from "../../../../config/axiosConfig";
import { FaStar } from "react-icons/fa";
import Modal from "../../../../components/Modal";
import ReviewForm from "../../../../components/ReviewForm";
import { formatNumber } from "../../../../utils/formatNumber";
import { toast } from "react-toastify";
import MultipleImageUploader from "../../../../components/MultipleImageUploader";
import TextareaInput from "../../../../components/form-input/TextareaInput";
const ServiceTransaction = () => {
  const axios = useAxiosInstance();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  // Tambahkan state untuk menyimpan data ulasan

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("user/transaction-history-service");
        setTransactions(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

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


  return (
    <div className="space-y-4">
      {transactions.map((transaction, index) => (
        <ServiceTransactionCard
          key={`${transaction.service.id}-${transaction.no_transaction}-${index}`}
          service={transaction.service}
          quantity={transaction.qty}
          provider={transaction.service.shop.name}
          header={
            <CardHeader
              item={transaction.service}
              payment={transaction.status}
              shipping={transaction.status_order}
              invoice={transaction.no_transaction}
              date={transaction.created_at}
              type="service"
            />
          }
          button={
            <div className="flex items-center justify-end w-full gap-3">
              {transaction.status === "DONE" && transaction.status_order === "DONE" && (
                <button onClick={() => openReviewModal(transaction.service)} className="p-1 px-2 text-xs border-[0.5px] border-opacity-70 border-primary text-primary font-semibold rounded-lg flex gap-2 items-center hover:bg-primary hover:text-white duration-75 cursor-pointer">
                  <FaStar className="text-yellow-400" />
                  <div>Beri Ulasan</div>
                </button>
              )}
              <CardButton
                buttonLink={`/user/dashboard/transaction/service/details/${transaction.id}`}
                buttonLabel="Lihat Detail Transaksi"
              />
            </div>
          }
        />
      ))}

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
    </div>
  );
};

export default ServiceTransaction;