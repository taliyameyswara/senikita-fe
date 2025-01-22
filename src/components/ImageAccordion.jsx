import React, { useState } from "react";

const ImageAccordion = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4 overflow-hidden px-4 translate-y-16">
      {images.map((image, index) => (
        <div
          key={image.id}
          className={`relative cursor-pointer transition-all duration-500 ${
            activeIndex === index ? "h-[40%] rounded-xl" : "h-[15%] rounded-lg"
          }`}
          onClick={() => setActiveIndex(index)}
        >
          <img
            src={image.image}
            alt={image.name}
            className="w-full h-full object-cover rounded-xl"
          />

          {activeIndex === index ? (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/60 to-transparent text-white rounded-b-xl">
              <h3 className="font-bold">{image.name}</h3>
              <p className="text-xs">{image.description}</p>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white rounded-lg">
              <h3 className="text-center text-sm font-medium">{image.name}</h3>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageAccordion;
