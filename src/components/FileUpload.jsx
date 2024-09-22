import React, { useState } from "react";
import { FaRegFile } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

const FileUpload = ({ onFilesSelect, title }) => {
  const [filesPreview, setFilesPreview] = useState([]);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (files.length + selectedFiles.length > 3) {
      setError("Anda hanya dapat mengunggah maksimal 3 file.");
      return;
    }

    let newFiles = [];
    for (const selectedFile of selectedFiles) {
      if (selectedFile.size > 3000000) {
        // 3MB
        setError("Ukuran file tidak boleh lebih dari 3MB");
        return;
      }
      setError(null);
      newFiles.push(selectedFile);
    }

    setLoading(true);
    setTimeout(() => {
      // Simulasi loading
      setFiles([...files, ...newFiles]);
      setFilesPreview([
        ...filesPreview,
        ...newFiles.map((file) => URL.createObjectURL(file)),
      ]);
      onFilesSelect([...files, ...newFiles]);
      setLoading(false);
    }, 1000); // Ganti ini dengan proses upload sebenarnya jika diperlukan
  };

  const handleDelete = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newFilesPreview = filesPreview.filter((_, i) => i !== index);
    setFiles(newFiles);
    setFilesPreview(newFilesPreview);
    onFilesSelect(newFiles);
  };

  const formatFileSize = (size) => {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`; // Konversi ke MB
  };

  return (
    <div className="flex flex-col mb-5">
      <label className="text-sm font-semibold">{title}</label>
      <div className="flex justify-between items-center p-4 border rounded-xl mt-1">
        <div className="flex flex-col gap-1">
          <p className="font-semibold md:text-base text-sm">{title}</p>
          <div className="text-gray-500 text-xs md:text-sm ">
            Unggah file yang mendukung kebutuhan acara Anda, seperti gambar
            desain, jadwal acara, atau daftar lagu.
            <div className="text-gray-500 text-xs md:text-sm">
              Format yang didukung adalah JPEG, PNG, PDF, Word, dan Excel.
              Ukuran file maksimal{" "}
              <span className="font-nunito font-light">3</span>mb
            </div>
          </div>
        </div>

        <label
          htmlFor="file-upload"
          className={`text-sm border ${
            loading ? "border-gray-200" : "border-primary"
          } text-primary p-2 px-6 rounded-full cursor-pointer font-semibold`}
        >
          {loading ? "Mengunggah..." : "Unggah File"}
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".jpeg,.png,.jpg,.pdf,.docx,.xlsx"
          className="hidden"
          id="file-upload"
          multiple
        />
      </div>

      {filesPreview.length > 0 && (
        <div className="mt-3">
          {filesPreview.map((preview, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 py-4  border rounded-lg mb-2"
            >
              <div className="flex gap-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <FaRegFile className="text-gray-500" />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm">{files[index].name}</p>
                  <p className="text-xs text-gray-500 font-nunito font-light">
                    {formatFileSize(files[index].size)} {/* Ukuran dalam MB */}
                  </p>
                </div>
              </div>
              <button
                className="bg-gray-100 p-1.5 px-3.5 rounded-full"
                onClick={() => handleDelete(index)}
              >
                <FaTrashCan className="text-customRed text-sm" />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default FileUpload;
