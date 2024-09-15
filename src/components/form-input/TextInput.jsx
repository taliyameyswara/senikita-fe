import React from "react";

const TextInput = ({ label, placeholder, value, onChange }) => {
  return (
    <div className="mb-5">
      <label className="text-sm font-semibold">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-3 py-2 border-[0.5px] rounded-xl mt-1 focus:ring-primary focus:border-primary/60 border-gray-200"
      />
    </div>
  );
};

export default TextInput;
