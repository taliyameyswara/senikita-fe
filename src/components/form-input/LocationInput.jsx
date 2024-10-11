import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios"; // Using axios directly for simplicity
import { IoLocationSharp } from "react-icons/io5";

const LocationInput = ({ placeholder, handleSelect }) => {
  const [locations, setLocations] = useState([]);
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fetch data based on search query
  const fetchLocations = async () => {
    try {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: query, // The search query
            format: "json",
            addressdetails: 1,
            limit: 5, // Limit the results to 5
          },
        }
      );
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  useEffect(() => {
    if (query) {
      fetchLocations();
    }
  }, [query]);

  const handleLocationSelect = (location) => {
    handleSelect(location);
  };

  return (
    <div className="w-full flex items-center">
      <div className="bg-tertiary/20 p-2 rounded-xl">
        <IoLocationSharp className="text-primary text-xl" />
      </div>
      <div className="w-full">
        <Select
          inputValue={query}
          onInputChange={(value) => setQuery(value)}
          options={locations.map((loc) => ({
            label: loc.display_name, // Display the full location name
            value: loc,
          }))}
          onChange={(selected) =>
            handleLocationSelect(selected ? selected.value : null)
          }
          onMenuOpen={() => setIsMenuOpen(true)}
          onMenuClose={() => setIsMenuOpen(false)}
          placeholder={placeholder}
          isClearable
          unstyled
          classNames={{
            input: () => "[&_input:focus]:ring-0",
            clearIndicator: ({ isFocused }) =>
              ` ${
                isFocused ? "text-neutral-600" : "text-neutral-200"
              } hover:text-neutral-400`,
            control: ({ isFocused }) =>
              `p-3 py-2 rounded-xl border-none shadow-sm w-full`,
            option: ({ isSelected }) =>
              `p-3 cursor-pointer hover:bg-gray-100 ${
                isSelected ? "text-primary bg-tertiary/20" : "text-black"
              }`,
            menu: () => "bg-white rounded-xl shadow-lg mt-3 w-full",
            placeholder: () => "text-gray-500",
            singleValue: () => "text-gray-900",
          }}
        />
      </div>
    </div>
  );
};

export default LocationInput;
