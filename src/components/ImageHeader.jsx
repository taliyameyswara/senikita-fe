import React, { useEffect, useState } from "react";

const ImageHeader = ({ title, subtitle, images }) => {
  const [scrollOffset, setScrollOffset] = useState(0);

  // Update scroll offset
  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Mask Images settings
  const getMaskImage = (index) => {
    switch (index) {
      case 0:
        return "linear-gradient(to right, black 85%, transparent 100%)";
      case 1:
        return "linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)";
      case 2:
        return "linear-gradient(to right, transparent 0%, black 15%)";
      default:
        return "none";
    }
  };

  return (
    <div className="relative w-full h-[100vh] bg-primary overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-secondary opacity-60 z-10"></div>

      {/* Title and Subtitle */}
      <div className="absolute inset-0 flex flex-col justify-center mb-20 items-center container px-4 text-white z-10">
        {/* <img src="/assets/home/sulir.png" className="max-w-sm translate-y-3" /> */}
        <h1 className="text-[6rem] font-semibold tracking-wide font-crimson ">
          Provinsi {title}
        </h1>
        <p className="text-xl mt-2 max-w-2xl text-center">{subtitle}</p>
      </div>

      {/* Images Container */}
      <div className="w-full h-full flex overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className="w-[calc(36%+100px)] h-full lg:-mr-[200px] -mr-[100px]"
            style={{
              transform: `translateY(${scrollOffset * 0.35}px)`, // Parallax effect
              transition: "transform 0.1s ease-out",
            }}
          >
            <img
              src={image.src}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover opacity-70 auto-zoom"
              style={{
                WebkitMaskImage: getMaskImage(index),
                maskImage: getMaskImage(index),
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "100% 100%",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageHeader;
