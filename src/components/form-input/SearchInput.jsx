import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoLocationOutline } from "react-icons/io5";

const SearchFilter = ({
  name,
  apiUrl,
  placeholder,
  mapData,
  handleSelect,
  queryParam = "name",
}) => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}?${queryParam}=${query}`);
      setItems(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (query) {
      fetchData();
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, [query]);

  const handleItemSelect = (item) => {
    setQuery(mapData(item));
    handleSelect(item);
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <div className="mb-1 text-gray-700">{name}</div>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className="p-3 py-2 border border-gray-200 rounded-2xl shadow-sm focus:outline-none w-full"
          onChange={(event) => setQuery(event.target.value)}
          value={query}
          onFocus={() => query && setIsDropdownOpen(true)}
          onBlur={() => setTimeout(() => setIsDropdownOpen(false), 100)}
        />
        {isDropdownOpen && items.length > 0 && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl max-h-60 overflow-y-auto">
            {items.map((item) => (
              <li
                key={item.id}
                className="p-2 px-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleItemSelect(item)}
              >
                {mapData(item)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
