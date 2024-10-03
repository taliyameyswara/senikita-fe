import React, { useState } from "react";

const PriceInput = ({ label, placeholder, value, name, onChange }) => {
  // Function to format the input as a number with commas
  const formatNumber = (num) => {
    return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
  };

  const [formattedValue, setFormattedValue] = useState(formatNumber(value));

  const handleInputChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, "");
    if (!isNaN(rawValue) && rawValue.trim() !== "") {
      const numberValue = parseFloat(rawValue);
      onChange({
        target: {
          name: name,
          value: numberValue,
        },
      });
      setFormattedValue(formatNumber(rawValue));
    } else {
      onChange({
        target: {
          name: name,
          value: "",
        },
      });
    }
  };

  return (
    <div className="">
      <label className="text-sm font-semibold">{label}</label>
      <div className="flex items-center mt-1">
        <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl text-gray-500">
          Rp
        </span>
        <input
          type="text"
          placeholder={placeholder}
          value={formattedValue}
          name={name}
          onChange={handleInputChange}
          className="w-full p-3 py-2 border font-nunito font-light rounded-r-xl focus:ring-primary focus:border-primary/60 border-gray-200"
        />
      </div>
    </div>
  );
};

export default PriceInput;
