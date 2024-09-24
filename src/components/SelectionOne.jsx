import React, { useState, useEffect, useRef } from "react";
import { IoCheckmarkOutline, IoChevronDownOutline } from "react-icons/io5";

const SelectionOne = ({
  name,
  options,
  selectedOption,
  onSelect,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelectedOption, setTempSelectedOption] = useState(selectedOption);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleSelect = (option) => {
    setTempSelectedOption(option);
    onSelect(option.value);  // Call onSelect immediately after SelectionOne 
    setIsOpen(false);  // Close the dropdown
  };

  const isSelected = (option) => {
    return tempSelectedOption?.value === option.value;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block w-full text-left">
      <div className="mb-1 text-gray-700">{name}</div>
      <button
        type="button"
        onClick={handleToggle}
        className="flex items-center justify-between w-full p-3 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
      >
        {tempSelectedOption ? (
          <span>{tempSelectedOption.label}</span>
        ) : (
          <span>{placeholder}</span>
        )}
        <IoChevronDownOutline className="mr-1 text-sm" />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 z-10 mt-1 overflow-y-auto bg-white border border-gray-300 rounded-xl">
          <ul className="max-h-full py-1 overflow-y-auto">
            {options.map((option) => (
              <li
                key={option.value}
                className="flex items-center justify-between gap-2 px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelect(option)}
              >
                {option.label}
                {isSelected(option) && (
                  <IoCheckmarkOutline className="text-xl text-primary" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectionOne;
