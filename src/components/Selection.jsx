import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

const Selection = ({
  name,
  options,
  selectedOptions,
  onSelect,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleSelect = (option) => {
    if (selectedOptions.some((selected) => selected.value === option.value)) {
      onSelect(
        selectedOptions.filter((selected) => selected.value !== option.value)
      );
    } else {
      onSelect([...selectedOptions, option]);
    }
  };

  const isSelected = (option) => {
    return selectedOptions.some((selected) => selected.value === option.value);
  };

  return (
    <div className="relative inline-block text-left w-full">
      <div className="mb-1 text-gray-700">{name}</div>
      <button
        type="button"
        onClick={handleToggle}
        className="flex items-center justify-between w-full border bg-white text-gray-700 p-3 py-2 border-gray-200 rounded-2xl focus:outline-none"
      >
        {placeholder}
        <FaCaretDown className="ml-2 -mr-1" />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-xl z-10 max-h-60 overflow-y-auto">
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option.value}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center justify-between gap-2"
                onClick={() => handleSelect(option)}
              >
                {option.label}
                {isSelected(option) && <FaCheck className="text-green-500" />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Selection;
