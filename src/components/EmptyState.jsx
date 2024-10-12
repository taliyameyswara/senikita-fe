import React from "react";
import EmptyImage from "../assets/home/404.png"; // Replace with your own empty state image

const EmptyState = ({ message, ctaLabel, onCtaClick }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10">
      {/* Empty State Image */}
      <img
        src={EmptyImage}
        alt="No items"
        className="md:w-[10%] w-[20%] object-contain opacity-20 filter grayscale"
        style={{ userSelect: "none", pointerEvents: "none" }}
      />

      {/* Message */}
      <h2 className=" text-gray-400">
        {message || "Tidak ada item yang ditemukan"}
      </h2>

      {/* Call-to-Action Button (Optional) */}
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
