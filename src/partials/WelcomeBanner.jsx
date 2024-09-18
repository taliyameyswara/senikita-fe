import React from "react";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
function WelcomeBanner() {
  const { user } = useContext(UserContext); // Mengambil data user dari UserContext
  return (
    <div className="relative p-4 mb-8 overflow-hidden rounded-xl border sm sm:p-6">
      {/* Background illustration */}
      <div
        className="absolute top-0 right-0 hidden mr-16 -mt-4 pointer-events-none xl:block"
        aria-hidden="true"
      ></div>

      {/* Content */}
      <div className="relative">
        <h1 className="mb-1 text-2xl font-bold md:text-3xl text-slate-800">
          Halo, {user ? user.name : "Guest"} 👋
        </h1>
        <p>Here is what’s happening with your projects today:</p>
      </div>
    </div>
  );
}

export default WelcomeBanner;
