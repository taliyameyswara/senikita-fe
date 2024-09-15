import React from "react";

const ArtistProfileSection = ({ store }) => {
  if (!store || store.length === 0) {
    return null; //  null if no store data is available
  }

  const { name, region, address, avatar, description } = store[0];

  return (
    <div className="mb-3 p-6 bg-white rounded-xl border">
      <h2 className="md:text-xl text-lg font-semibold mb-4">Profil Seniman</h2>
      <div className="flex items-center gap-4 text-sm">
        <img
          src={avatar}
          alt={`${name} Avatar`}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <div className="text-lg font-semibold">{name}</div>
          <div className="text-gray-600">{region}</div>
          <div className="text-gray-500">{address}</div>
        </div>
      </div>
      <div className="mt-2 text-sm">{description}</div>
    </div>
  );
};

export default ArtistProfileSection;
