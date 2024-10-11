import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { RiImageAddLine } from "react-icons/ri";

const MultipleImageUploader = ({
  title,
  images,
  setImages,
  maxImages = 5,
  acceptedFormats = [".jpg", ".jpeg", ".png"],
  minSize = 100, // Minimum image size
  hasThumbnail = true, // Parameter untuk menentukan thumbnail
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
          if (newImages.length < maxImages) {
            newImages.push({ file, preview: img.src });
            setImages(newImages);
          } else {
            setError(`Maksimal ${maxImages} gambar.`);
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
    <div className="p-5 border rounded-xl">
      {title}

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 ">
        {Array.from({ length: maxImages }).map((_, index) => (
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
                  className="object-cover w-full h-full rounded-xl"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute p-1 text-sm text-white rounded-full top-2 right-2 bg-customRed"
                >
                  <IoClose className="text-lg" />
                </button>
              </>
            ) : (
              <>
                <label
                  htmlFor={`fileInput-${index}`}
                  className="flex flex-col items-center justify-center gap-2 font-light text-center text-gray-400 cursor-pointer font-nunito"
                >
                  <RiImageAddLine className="text-4xl" />
                  {hasThumbnail && index === 0
                    ? "Thumbnail"
                    : `Foto ${index + 1}`}
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
