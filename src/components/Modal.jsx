import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  handleSubmit,
  children,
  width = "w-2/3",
  isForm = true,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    // Disable background scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Close modal when 'Esc' key is pressed
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Add event listener for 'Esc' key
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Reset body overflow when modal is closed
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Close modal on click outside
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClickOutside}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        className={`bg-white rounded-xl ${width} max-w-4xl max-h-[90vh] flex flex-col modal-content`}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b">
          <div className="flex flex-col gap-2 ">
            <div className="text-xl font-bold">{title}</div>
            <div className="text-gray-500">{subtitle}</div>
          </div>
          <button onClick={onClose} className="px-4 py-2 text-gray-500">
            <IoClose className="text-xl" />
          </button>
        </div>

        {/* Modal content */}
        <div className="flex-grow p-4 px-6 overflow-auto">{children}</div>

        {/* Footer buttons */}
        {isForm && (
          <div className="flex justify-end p-4 border-t">
            <button
              onClick={handleSubmit}
              className="flex-grow px-4 py-3 font-semibold text-white bg-primary rounded-xl"
            >
              Simpan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
