import React, { useEffect } from "react";
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

    // Add event listener
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Reset body overflow when modal is closed
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Close modal on click outside
  const handleClickOutside = (event) => {
    if (event.target.closest(".modal-content")) return;
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClickOutside}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        className={`bg-white rounded-xl ${width} max-w-4xl max-h-[90vh] flex flex-col modal-content`}
      >
        {/* Header */}
        <div className="flex justify-between items-start p-5 border-b">
          <div className="flex flex-col gap-2 ">
            <div className="text-xl font-bold">{title}</div>
            <div className="text-gray-500">{subtitle}</div>
          </div>
          <button onClick={onClose} className="text-gray-500 px-4 py-2">
            <IoClose className="text-xl" />
          </button>
        </div>

        {/* Modal content */}
        <div className="flex-grow overflow-auto p-4 px-6">{children}</div>

        {/* Footer buttons */}
        {isForm && (
          <div className="flex justify-end border-t p-4">
            <button
              onClick={handleSubmit}
              className="bg-primary text-white font-semibold rounded-xl px-4 py-3 flex-grow"
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
