import React from "react";
import { IoHeartOutline, IoHeart } from "react-icons/io5";

const LikeButton = ({ isLiked, onToggleLike, hidden = false, iconSize = "text-xl" }) => {
  if (hidden) return null; // Jika hidden, tidak render tombol

  return (
    <button
      className="p-3 bg-white border rounded-full hover:bg-gray-100"
      onClick={onToggleLike}
    >
      {isLiked ? (
        <IoHeart className={`text-customRed ${iconSize}`} />
      ) : (
        <IoHeartOutline className={iconSize} />
      )}
    </button>
  );
};

export default LikeButton;
