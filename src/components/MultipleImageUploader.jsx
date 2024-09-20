import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { RiImageAddLine } from "react-icons/ri";

const MultipleImageUploader = ({
  images,
  setImages,
  maxImages = 9, // Maximum 9 additional images + 1 main image
  acceptedFormats = [".jpg", ".jpeg", ".png"],
  minSize = 300, // Minimum image size
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFiles = (files) => {
    setError("");
    let newImages = [...images];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExtension = file.name.split(".").pop().toLowerCase();
      const img = new Image();

      if (!acceptedFormats.includes(`.${fileExtension}`)) {
        setError("Format file harus .jpg, .jpeg, atau .png.");
        return;
      }

      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const { width, height } = img;

        if (width < minSize || height < minSize) {
          setError(`Ukuran gambar minimal adalah ${minSize}x${minSize}px.`);
        } else {
          if (newImages.length < maxImages + 1) {
            newImages.push({ file, preview: img.src });
            setImages(newImages);
          } else {
            setError(`Maksimal ${maxImages + 1} gambar.`);
          }
        }
      };
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setLoading(true);
    const files = e.dataTransfer.files;
    handleFiles(files);
    setLoading(false);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    handleFiles(files);
  };

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <div className="border p-5 rounded-xl">
      <div className="font-semibold text-lg">Upload Gambar Produk</div>
      <div className=" text-sm text-gray-400">
        Pilih foto produk atau tarik dan letakkan hingga 9 foto sekaligus di
        sini dengan minimal 1 foto utama (thumbnail).
      </div>
      <div className="mb-4 text-sm text-gray-400">
        Upload min 3 foto produk yang menarik dan berbeda satu sama lain untuk
        menarik perhatian pembeli.
      </div>

      <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 ">
        {Array.from({ length: maxImages + 1 }).map((_, index) => (
          <div
            key={index}
            className={`relative w-32 h-32 rounded-xl flex items-center justify-center ${
              images[index] ? "" : "border border-dashed border-gray-300"
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {images[index] ? (
              <>
                <img
                  src={images[index].preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-customRed text-white text-sm rounded-full p-1"
                >
                  <IoClose className="text-lg" />
                </button>
              </>
            ) : (
              <>
                <label
                  htmlFor={`fileInput-${index}`}
                  className="flex flex-col justify-center items-center gap-2 font-nunito font-light text-center text-gray-400 cursor-pointer"
                >
                  <RiImageAddLine className="text-4xl" />
                  {index === 0 ? "Thumbnail" : `Foto ${index}`}
                </label>
                <input
                  type="file"
                  id={`fileInput-${index}`}
                  accept={acceptedFormats.join(", ")}
                  className="hidden"
                  onChange={handleFileChange}
                />
              </>
            )}
          </div>
        ))}
      </div>

      {loading && <p className="text-center text-blue-500">Mengupload...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
    </div>
  );
};

export default MultipleImageUploader;
