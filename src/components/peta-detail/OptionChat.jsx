import React from "react";
import Plx from "react-plx";

const OptionChat = ({ className, parallaxAvatar }) => {
  return (
    <>
      <div className={`relative z-50 mt-10 xl:ml-5 xl:mx-0 ${className}`}>
        <Plx
          className="text-xs grid lg:grid-cols-2 gap-3 space"
          parallaxData={parallaxAvatar}
        >
          {[
            "💃 Tarian tradisional",
            "🪘 Alat musik tradisional",
            "🎊 Festival budaya",
            "🥻 Pakaian adat",
          ].map((question, index) => (
            <button
              key={index}
              className="bg-gradient-to-bl from-tertiary via-white/30 to-tertiary  border-[0.5px] border-white/50   px-4 py-2 rounded-full text-white "
            >
              {question}
            </button>
          ))}
        </Plx>
      </div>
    </>
  );
};

export default OptionChat;
