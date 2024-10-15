import React, { useEffect } from "react";
import LoadingImage from "/assets/home/loading.png";

const FullPageLoader = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-5 ">
        <div className="animate-spin-slow">
          <img
            src={LoadingImage}
            className="w-20 h-20 rotate-45 lg:w-28 lg:h-28 animate-pulse-slow"
            alt="Loading"
          />
        </div>
        <h1 className="text-2xl font-bold tracking-widest text-primary font-crimson sm:text-5xl loading-text">
          senikita
        </h1>
      </div>
    </div>
  );
};

export default FullPageLoader;
