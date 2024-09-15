import React, { useState } from "react";
import { IoHeartOutline, IoHeart } from "react-icons/io5";

const LikeButton = ({ iconSize = "text-sm md:text-base" }) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <button
      className="bg-white p-2 rounded-full border hover:bg-gray-100"
      onClick={toggleLike}
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
