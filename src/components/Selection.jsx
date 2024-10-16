import React, { useState, useEffect, useRef } from "react";
import { IoCheckmarkOutline, IoChevronDownOutline } from "react-icons/io5";

const Selection = ({
  name,
  options,
  selectedOptions,
  onSelect,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelectedOptions, setTempSelectedOptions] =
    useState(selectedOptions);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleSelect = (option) => {
    if (
      tempSelectedOptions.some((selected) => selected.value === option.value)
    ) {
      setTempSelectedOptions(
        tempSelectedOptions.filter(
          (selected) => selected.value !== option.value
        )
      );
    } else {
      setTempSelectedOptions([...tempSelectedOptions, option]);
    }
  };

  const isSelected = (option) => {
    return tempSelectedOptions.some(
      (selected) => selected.value === option.value
    );
  };

  const handleSave = () => {
    onSelect(tempSelectedOptions);
    setIsOpen(false);
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
        {tempSelectedOptions.length > 0 ? (
          <span>
            {placeholder}
            <span className="ml-1 font-light text-gray-400 font-nunito">
              ({tempSelectedOptions.length} terpilih)
            </span>
          </span>
        ) : (
          <span>
            {placeholder}{" "}
            <span className="ml-1 font-light text-gray-400 font-nunito">
              ({tempSelectedOptions.length} terpilih)
            </span>
          </span>
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
          <div className="sticky bottom-0 p-3 bg-white border-t">
            <button
              type="button"
              onClick={handleSave}
              className="w-full px-4 py-2 text-white rounded-lg bg-primary"
            >
              Simpan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Selection;
