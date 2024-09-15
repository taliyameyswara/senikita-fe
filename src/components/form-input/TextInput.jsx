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
        className="w-full p-3 py-2 border rounded-xl mt-1 focus:outline-none"
      />
    </div>
  );
};

export default TextInput;
