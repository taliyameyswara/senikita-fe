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
        className="relative p-5 border max-w-md rounded-xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary mb-4">
            <AiOutlineCheck className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {title}
          </h3>
          <div className="mt-1 px-7 py-2">
            <p className="text-sm text-gray-500">{message}</p>
          </div>
          <div className="flex justify-center px-4 py-3">
            <Link
              to={buttonLink}
              className="px-4 py-2 w-full bg-primary text-white text-base font-medium rounded-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary"
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
