import React from "react";
import Plx from "react-plx";

const Avatar = ({ parallaxAvatar, className }) => {
  return (
    <div className={`relative justify-center items-center ${className}`}>
      <Plx className="z-90" parallaxData={parallaxAvatar}>
        <img
          src="/assets/home/avatar.png"
          alt="Avatar"
          className=" avatar-bounce "
          style={{ userSelect: "none", pointerEvents: "none" }}
        />
      </Plx>
    </div>
  );
};

export default Avatar;
