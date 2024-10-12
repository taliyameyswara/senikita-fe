import React, { useState, useRef, useEffect } from "react";
import { IoCheckmarkOutline, IoChevronDownOutline } from "react-icons/io5";

const DropdownFilter = ({
  icon,
  options, // List of filter options
  selectedOption, // Currently selected option
  setSelectedOption, // Function to set selected option
  label = "Filter", // Customizable label for the dropdown
  width = "w-60", // Customizable width for the dropdown
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  const handleSelect = (option) => {
    setSelectedOption(option === selectedOption ? "" : option);
    setIsOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current || !trigger.current) return;
      if (
        !isOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      ) {
        return;
      }
      setIsOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [isOpen]);

  // Close dropdown if the "Esc" key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!isOpen || keyCode !== 27) return;
      setIsOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [isOpen]);

  return (
    <>
      {/* <div className="mb-1 text-sm">{title}</div> */}
      <div className="relative inline-block text-left">
        <button
          ref={trigger}
          onClick={() => setIsOpen(!isOpen)}
          className={`inline-flex justify-between ${width} px-4 py-2 rounded-xl items-center text-sm focus:outline-none transition-colors duration-200 ${
            isOpen
              ? "bg-tertiary/10 text-primary border border-opacity-20 border-primary"
              : "bg-gray-50 hover:bg-gray-100 border "
          }`}
        >
          <div className="flex items-center gap-2">
            {icon}
            {selectedOption || label}
          </div>
          <IoChevronDownOutline
            className={`${isOpen ? "text-primary" : "text-gray-700"}`}
          />
        </button>

        <div
          ref={dropdown}
          className={`absolute z-[9999] ${width} px-0 bg-white shadow-md p-2 rounded-xl mt-1 transition-transform duration-100 ease-out transform ${
            isOpen
              ? "bounce-in scale-100 visible"
              : "bounce-out scale-95 invisible"
          }`}
        >
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={`flex text-start justify-between items-center w-full px-4 py-2 text-sm focus:outline-none transition-colors duration-200
                ${
                  selectedOption === option
                    ? "bg-tertiary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {option}
                {selectedOption === option && (
                  <IoCheckmarkOutline className="text-lg font-semibold text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DropdownFilter;
