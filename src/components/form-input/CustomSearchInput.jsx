import React, { useState } from "react";
import Select from "react-select";

const CustomSearchInput = ({
  label,
  placeholder,
  mapData,
  handleSelect,
  disabled,
  itemsData = [], // Assume itemsData will be passed with data
}) => {
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    handleSelect(item);
  };

  return (
    <div>
      <div className="text-gray-700 ">{label}</div>
      <Select
        inputValue={query}
        onInputChange={(value) => setQuery(value)}
        options={itemsData.map((item) => ({
          label: mapData(item),
          value: item.id,
        }))}
        onChange={(selected) =>
          handleItemSelect(selected ? selected.value : null)
        }
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
        placeholder={placeholder}
        isClearable
        isDisabled={disabled}
        unstyled
        classNames={{
          input: () => "[&_input:focus]:ring-0",
          clearIndicator: ({ isFocused }) =>
            ` ${
              isFocused ? "text-neutral-600" : "text-neutral-200"
            } hover:text-neutral-400`,
          control: ({ isFocused }) =>
            `px-4 py-2 rounded-xl border border-gray-200 shadow-sm w-full ${
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

export default CustomSearchInput;
