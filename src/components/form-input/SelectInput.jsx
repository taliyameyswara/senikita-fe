import React, { useState } from "react";

const SelectInput = ({ label, placeholder, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value || "");

  const handleOptionClick = (optionValue, optionLabel) => {
    setSelected(optionLabel);
    setIsOpen(false);
    onChange({ value: optionValue });
  };

  return (
    <div className="mb-5">
      <div className="relative">
        <label className="text-sm font-semibold">{label}</label>
        {/* Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full p-3 py-2 border rounded-xl mt-1 flex items-center justify-between ${
            selected ? "text-black" : "text-gray-500"
          }`}
        >
          <span className="overflow-hidden">{selected || placeholder}</span>
          <svg
            className="ml-2 w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute mt-1 bg-white border rounded-xl w-full z-10">
            <ul className="max-h-full overflow-auto">
              {options.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionClick(option.value, option.label)}
                  className="text-gray-500 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectInput;
