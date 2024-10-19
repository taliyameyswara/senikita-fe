import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { limitText } from "../../utils/limitText";

const ArtistProfileSection = ({ shop }) => {
  const [textLimit, setTextLimit] = useState(30);

  if (!shop) {
    return null; // Return null if no shop data is available
  }

  // Set text limit based on screen size
  useEffect(() => {
    const updateTextLimit = () => {
      if (window.innerWidth >= 768) {
        setTextLimit(500); // Longer limit for desktop
      } else {
        setTextLimit(200); // Shorter limit for mobile
      }
    };

    updateTextLimit(); // Initial call

    window.addEventListener("resize", updateTextLimit);
    return () => window.removeEventListener("resize", updateTextLimit);
  }, []);

  const { name, region, profile_picture, desc } = shop;

  return (
    <div className="p-6 mb-3 bg-white border rounded-xl">
      <Link to={`/profileseniman`}>
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
          </div>
        </div>
      </Link>
      <div className="mt-2 text-sm">{limitText(desc, textLimit)}</div>
    </div>
  );
};

export default ArtistProfileSection;
