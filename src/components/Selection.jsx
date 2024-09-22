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
    <div ref={dropdownRef} className="relative inline-block text-left w-full">
      <div className="mb-1 text-gray-700">{name}</div>
      <button
        type="button"
        onClick={handleToggle}
        className="flex items-center justify-between w-full border bg-white text-gray-700 p-3 py-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary"
      >
        {tempSelectedOptions.length > 0 ? (
          <span>
            {placeholder}
            <span className="ml-1 text-gray-400 font-nunito font-light">
              ({tempSelectedOptions.length} terpilih)
            </span>
          </span>
        ) : (
          <span>
            {placeholder}{" "}
            <span className="ml-1 text-gray-400 font-nunito font-light">
              ({tempSelectedOptions.length} terpilih)
            </span>
          </span>
        )}
        <IoChevronDownOutline className="mr-1 text-sm" />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-xl z-10 overflow-y-auto">
          <ul className="py-1 max-h-full overflow-y-auto">
            {options.map((option) => (
              <li
                key={option.value}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center justify-between gap-2"
                onClick={() => handleSelect(option)}
              >
                {option.label}
                {isSelected(option) && (
                  <IoCheckmarkOutline className="text-primary text-xl" />
                )}
              </li>
            ))}
          </ul>
          <div className="p-3 border-t bg-white sticky bottom-0">
            <button
              type="button"
              onClick={handleSave}
              className="bg-primary text-white py-2 px-4 rounded-lg w-full"
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
