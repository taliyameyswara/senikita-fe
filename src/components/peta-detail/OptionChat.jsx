import React from "react";
import Plx from "react-plx";

const OptionChat = ({ className, parallaxAvatar, setInput, setIsGeminiLoading }) => {
  const handleButtonClick = (content) => {
    setIsGeminiLoading(true); // Atur loading menjadi true
    setInput(content); // Perbarui konten input
    setIsGeminiLoading(false); // Atur loading menjadi false
  };

  return (
    <div className={`relative z-50 mt-10 xl:ml-5 xl:mx-0 ${className}`}>
      <Plx
        className="grid gap-3 text-xs lg:grid-cols-2 space"
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
            className="bg-gradient-to-bl from-tertiary via-white/30 to-tertiary border-[0.5px] border-white/50 px-4 py-2 rounded-full text-white"
            onClick={() => handleButtonClick(`Apa saja ${question.toLowerCase()}?`)}
          >
            {question}
          </button>
        ))}
      </Plx>
    </div>
  );
};

export default OptionChat;
