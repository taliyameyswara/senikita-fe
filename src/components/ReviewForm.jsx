// ReviewForm.js
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import MultipleImageUploader from "./MultipleImageUploader";
import TextareaInput from "./form-input/TextareaInput";

const ReviewForm = ({ onSubmit }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [photos, setPhotos] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Siapkan data ulasan
    const formData = new FormData();
    formData.append("text", reviewText);
    formData.append("rating", rating);
    photos.forEach((photo, index) => {
      formData.append(`images_rating[]`, photo);
    });

    // Kirim data ke ServiceTransaction melalui onSubmit
    onSubmit(formData);
  };

  return (
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
  );
};

export default ReviewForm;
