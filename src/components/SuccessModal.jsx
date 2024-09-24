import React, { useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { Link } from "react-router-dom";

const SucesssModal = ({
  isOpen,
  onClose,
  title,
  message,
  buttonText,
  buttonLink,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed z-[999] inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative max-w-md p-5 bg-white border rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-primary">
            <AiOutlineCheck className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {title}
          </h3>
          <div className="py-2 mt-1 px-7">
            <p className="text-sm text-gray-500">{message}</p>
          </div>
          <div className="flex justify-center px-4 py-3">
            <Link
              to={buttonLink}
              className="w-full px-4 py-2 text-base font-medium text-white rounded-lg bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={onClose}
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SucesssModal;
