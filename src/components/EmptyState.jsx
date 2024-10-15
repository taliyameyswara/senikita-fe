import React from "react";
import EmptyImage from "../assets/home/404.png";

const EmptyState = ({ message, ctaLabel, onCtaClick }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10">
      <img
        src={EmptyImage}
        alt="No items"
        className="md:w-[10%] w-[25%] object-contain opacity-20 filter grayscale"
        style={{ userSelect: "none", pointerEvents: "none" }}
      />

      {/* Message */}
      <h2 className=" text-gray-400">
        {message || "Tidak ada item yang ditemukan"}
      </h2>

      {ctaLabel && onCtaClick && (
        <button
          className="px-6 py-2 text-white bg-brick rounded-full hover:bg-opacity-90 transition"
          onClick={onCtaClick}
        >
          {ctaLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
