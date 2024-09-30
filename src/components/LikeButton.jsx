import React, { useState } from "react";
import { IoHeartOutline, IoHeart } from "react-icons/io5";

const LikeButton = ({ iconSize = "text-md md:text-xl" }) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <button
      className="p-3 bg-white border rounded-full hover:bg-gray-100"
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
