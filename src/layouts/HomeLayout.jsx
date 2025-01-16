import React, { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import MainFooter from "../components/footer/Footer";

const HomeLayout = ({ children, pageTitle, subtitle }) => {
  useEffect(() => {
    document.title = pageTitle || "Senikita";
  }, [pageTitle]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="">
      <Navbar />
      <header className="bg-gradient-to-r from-primary to-tertiary p-16">
        <div className="space-y-2 container text-center text-white">
          <h1 className="lg:text-4xl text-3xl font-crimson">{pageTitle}</h1>
          <p className="text-lg">{subtitle}</p>
        </div>
      </header>
      <div className="py-10 px-6">
        <div className="container">{children}</div>
      </div>
      <MainFooter />
    </div>
  );
};

export default HomeLayout;
