import React, { useEffect, useState } from "react";
import Plx from "react-plx";

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

  const parallaxData = [
    {
      start: 0,
      end: 500,
      properties: [
        {
          easing: "ease-in",
          startValue: 1,
          endValue: 50,
          property: "translateY",
        },
      ],
    },
  ];

  return (
    <div className="image-header-container ">
      <div className="relative w-full h-[100vh] bg-primary overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 bg-secondary opacity-60 z-10"></div>

        {/* Title and Subtitle */}
        <div className="absolute inset-0 flex flex-col justify-center xl:mb-20 items-center container px-4 text-white z-10">
          <h1 className="xl:text-[6rem] text-[3rem] font-semibold tracking-wide font-crimson ">
            Provinsi {title}
          </h1>
          <p className="text-base xl:text-xl mt-2 max-w-2xl text-center">
            {subtitle}
          </p>
        </div>

        {/* Images Container */}
        <div className="w-full h-full flex overflow-hidden">
          {images.map((image, index) => (
            <div
              key={index}
              className="w-[calc(36%+100px)] h-full lg:-mr-[200px] -mr-[100px]"
              style={{
                transform: `translateY(${scrollOffset * 0.35}px)`,
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

      {/* Cloud */}
      <div className="relative w-full">
        <Plx
          className="parallax-cloud 3xl:-bottom-64 xl:-bottom-36 bottom-0 absolute z-30"
          parallaxData={parallaxData}
        >
          <img
            src="/assets/cloud.png"
            alt="Parallax"
            className="cloud-image xl:w-screen w-full object-cover"
            style={{ userSelect: "none", pointerEvents: "none" }}
          />
        </Plx>
        <div className="absolute bg-gradient-to-t from-tertiary to-transparent xl:h-64 h-32 w-full z-30 xl:bottom-[-200px] -bottom-[50px]"></div>
        <div className="absolute bg-gradient-to-t from-tertiary to-transparent xl:h-24 h-36 w-full z-30 xl:bottom-[-200px] -bottom-[50px]"></div>
      </div>
    </div>
  );
};

export default ImageHeader;
