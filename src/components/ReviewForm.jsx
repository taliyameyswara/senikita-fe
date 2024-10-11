import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import MultipleImageUploader from "./MultipleImageUploader";
import TextareaInput from "./form-input/TextareaInput";

const ReviewForm = () => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [photos, setPhotos] = useState([]); // Array untuk menyimpan file gambar

  const handleSubmit = async (event) => {
    event.preventDefault(); // Mencegah reload halaman pada submit

    // Buat FormData untuk mengirim data ulasan
    const formData = new FormData();
    formData.append("text", reviewText);
    formData.append("rating", rating);

    photos.forEach((photo, index) => {
      formData.append(`photo_${index}`, photo); // Menambahkan setiap file gambar ke FormData
    });

    try {
      // Contoh pengiriman FormData menggunakan fetch atau axios
      const response = await fetch("URL_ENDPOINT", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Review berhasil dikirim!");
        // Reset form setelah berhasil mengirim
        setReviewText("");
        setRating(0);
        setPhotos([]);
      } else {
        console.error("Gagal mengirim review");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengirim data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-sm text-center text-gray-400">
        Seberapa puas Anda dengan produk atau jasa yang diterima? <br /> Bagikan
        pengalaman Anda dengan memberikan rating dan ulasan produk atau jasa
        ini.
      </div>
      {/* Star Rating */}
      <div className="flex items-center justify-center gap-2 my-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`cursor-pointer text-3xl ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>

      {/* Text Area untuk Ulasan */}
      <TextareaInput
        label=""
        placeholder="Tulis ulasan Anda..."
        value={reviewText}
        name="review"
        onChange={(e) => setReviewText(e.target.value)}
      />

      {/* Multiple Image Uploader */}
      <MultipleImageUploader
        title={
          <>
            <div className="text-lg font-semibold">
              Upload Gambar Ulasan (Opsional)
            </div>
            <div className="text-sm text-gray-400 mb-4">
              Pilih foto atau tarik dan letakkan hingga 5 foto sekaligus di sini
              dengan minimal 1 foto utama (thumbnail).
            </div>
          </>
        }
        images={photos}
        setImages={(newPhotos) => setPhotos(newPhotos)} // Update state untuk menyimpan array gambar
        maxImages={3}
        acceptedFormats={[".jpg", ".jpeg", ".png"]}
        minSize={100}
        optimalSize={1200}
        hasThumbnail={false}
      />
    </form>
  );
};

export default ReviewForm;
