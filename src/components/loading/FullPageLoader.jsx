import React from "react";
import LoadingImage from "../../assets/home/loading.png";

const FullPageLoader = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-5 ">
        <div className="animate-spin-slow ">
          <img
            src={LoadingImage}
            className="w-28 h-28 animate-pulse-slow rotate-45"
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
