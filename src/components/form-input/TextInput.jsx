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
      <label className="md:text-sm text-xs font-semibold">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        className="w-full p-3 py-2 md:text-base text-sm mt-1 border border-gray-200 rounded-xl focus:ring-primary focus:border-primary/60"
      />
    </div>
  );
};

export default TextInput;
