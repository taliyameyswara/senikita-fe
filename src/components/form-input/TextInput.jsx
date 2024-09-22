import React from "react";

const TextInput = ({
  type = "text",
  label,
  placeholder,
  value,
  name,
  onChange,
}) => {
  return (
    <div className="">
      <label className="text-sm font-semibold">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        className="w-full p-3 py-2 border rounded-xl mt-1 focus:ring-primary focus:border-primary/60 border-gray-200"
      />
    </div>
  );
};

export default TextInput;
