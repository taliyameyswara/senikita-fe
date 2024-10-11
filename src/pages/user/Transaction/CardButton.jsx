import React from "react";
import { Link } from "react-router-dom";
import { IoChevronForward } from "react-icons/io5";

const CardButton = ({ buttonLink, buttonLabel }) => {
  return (
    <div className="flex justify-end">
      <Link
        to={buttonLink}
        className="text-xs rounded-lg font-semibold text-primary hover:text-opacity-80 cursor-pointer flex gap-1 items-center"
      >
        <span>{buttonLabel}</span>
        <IoChevronForward className="font-bold" />
      </Link>
    </div>
  );
};

export default CardButton;
