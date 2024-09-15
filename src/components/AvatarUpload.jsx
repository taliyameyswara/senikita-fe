import React, { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";

const ImageUpload = ({ onImageSelect, title }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageSize, setImageSize] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500000) {
        setError("File size should not exceed 500KB");
        return;
      }
      setError(null);
      setImageFile(file);
      setImageSize((file.size / 1000).toFixed(1) + " KB");
      setImagePreview(URL.createObjectURL(file));
      onImageSelect(file);
    }
  };

  const handleDelete = () => {
    setImagePreview(null);
    setImageFile(null);
    setImageSize(null);
    setError(null);
  };

  return (
    <div>
      {!imagePreview ? (
        <div className="flex justify-between items-center p-4 border rounded-xl mb-5">
          <div className="flex flex-col gap-1">
            <p className="font-semibold md:text-base text-sm">{title}</p>
            <div className="text-gray-500 text-xs md:text-sm ">
              Ukuran foto maksimal{" "}
              <span className="font-nunito font-light">500</span>kb
            </div>
          </div>
          <label
            htmlFor="file-upload"
            className="text-sm border border-primary text-primary p-2 px-6 rounded-full cursor-pointer font-semibold"
          >
            Upload
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      ) : (
        <div className="flex justify-between items-center p-4 border rounded-xl mb-5">
          <div className="flex items-center">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-10 h-10 object-cover rounded-lg mr-4"
            />
            <div>
              <p className="text-sm">{imageFile.name}</p>
              <p className="text-xs text-gray-400">{imageSize}</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              className="bg-gray-100  p-1.5 px-3.5 rounded-full"
              onClick={handleDelete}
            >
              <FaTrashCan className="text-customRed text-sm" />
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ImageUpload;
