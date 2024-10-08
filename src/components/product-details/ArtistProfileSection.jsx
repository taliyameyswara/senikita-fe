import React from "react";
import { Link } from "react-router-dom";

const ArtistProfileSection = ({ shop }) => {
  if (!shop || shop.length === 0) {
    return null; //  null if no shop data is available
  }

  const { name, region, address, profile_picture, desc } = shop;

  return (
    <div className="p-6 mb-3 bg-white border rounded-xl">
      <Link to={`/profileseniman}`}>
        <h2 className="mb-4 text-lg font-semibold md:text-xl">
          Profil Seniman
        </h2>
        <div className="flex items-center gap-4 text-sm">
          <img
            src={profile_picture}
            alt={`${name} Avatar`}
            className="object-cover w-16 h-16 rounded-full"
          />
          <div>
            <div className="text-lg font-semibold hover:text-primary">
              {name}
            </div>
            <div className="text-gray-600">{region}</div>
            <div className="text-gray-500">{address}</div>
          </div>
        </div>
      </Link>
      <div className="mt-2 text-sm">{desc}</div>
    </div>
  );
};

export default ArtistProfileSection;
