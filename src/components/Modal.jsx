import React from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen, onClose, title, handleSubmit, children }) => {
  if (!isOpen) return null;

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl w-2/3 ">
          {/* header */}
          <div className="flex justify-between items-center p-4 border-b">
            <div className="text-xl font-bold">{title}</div>
            <button onClick={onClose} className="text-gray-500  px-4 py-2">
              <IoClose className="text-xl" />
            </button>
          </div>

          {/* Modal content */}
          <div className="max-h-[80vh] overflow-auto p-4 px-6">
            <div className="mb-4">{children}</div>

            {/* Footer buttons */}
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-primary text-white font-semibold rounded-xl px-4 py-3 flex flex-grow justify-center"
              >
                Simpan
              </button>
            </div>
          </div>
          <div className="h-5 bg-white rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
