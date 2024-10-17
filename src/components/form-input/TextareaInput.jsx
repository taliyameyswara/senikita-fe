import React from "react";

const TextareaInput = ({
  label,
  placeholder,
  value,
  name,
  onChange,
  rows = 4,
}) => {
  return (
    <div className="">
      <label className="md:text-sm text-xs font-semibold">{label}</label>
      <textarea
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        className="w-full md:text-base text-sm p-3 py-2 border rounded-xl mt-1 focus:ring-primary focus:border-primary/60 border-gray-200 resize-none"
        rows={rows}
      />
    </div>
  );
};

export default TextareaInput;
