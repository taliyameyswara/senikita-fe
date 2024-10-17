import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useAxiosInstance } from "../../config/axiosConfig";
import Spinner from "../loading/Spinner";

const SearchInput = ({
  label,
  apiUrl,
  placeholder,
  mapData,
  handleSelect,
  queryParam = "name",
  dataKey,
  disabled, // Add disabled prop
}) => {
  const axios = useAxiosInstance();

  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data when the dropdown menu is opened
  const fetchDataOnOpen = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${apiUrl}`);
      setItems(data[dataKey]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data when typing in the search query
  const fetchDataOnQuery = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}?${queryParam}=${query}`);
      setItems(data[dataKey]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (query) {
      fetchDataOnQuery();
    }
  }, [query]);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    handleSelect(item);
  };

  return (
    <div>
      <div className="mb-1 text-gray-700 ">{label}</div>
      <Select
        inputValue={query}
        onInputChange={(value) => setQuery(value)}
        options={items.map((item) => ({
          label: mapData(item),
          value: item.id,
        }))}
        onChange={(selected) =>
          handleItemSelect(selected ? selected.value : null)
        }
        onMenuOpen={() => {
          setIsMenuOpen(true);
          fetchDataOnOpen(); // Fetch data when dropdown is opened
        }}
        onMenuClose={() => setIsMenuOpen(false)}
        placeholder={placeholder}
        isClearable
        isDisabled={disabled}
        isLoading={isLoading} // Menampilkan spinner di dalam dropdown menu
        noOptionsMessage={() =>
          isLoading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
            "No options"
          )
        }
        unstyled
        classNames={{
          input: () => "[&_input:focus]:ring-0",
          clearIndicator: ({ isFocused }) =>
            ` ${
              isFocused ? "text-neutral-600" : "text-neutral-200"
            } hover:text-neutral-400`,
          control: ({ isFocused }) =>
            `p-3 py-2 rounded-xl border border-gray-200 shadow-sm w-full text-sm md:text-base ${
              isFocused ? "border-primary" : ""
            }`,
          option: ({ isSelected }) =>
            `p-3 px-4 cursor-pointer hover:bg-gray-100 ${
              isSelected ? " text-primary" : "text-black"
            }`,
          menu: () => "bg-white rounded-xl shadow-lg",
          placeholder: () => "text-gray-500",
          singleValue: () => "text-gray-900",
        }}
      />
    </div>
  );
};

export default SearchInput;
