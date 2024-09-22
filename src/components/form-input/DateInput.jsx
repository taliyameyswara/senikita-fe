import React from "react";
import { AiOutlineCheck } from "react-icons/ai";

const DateInput = ({ label, value, onChange }) => {
  return (
    <div className="">
      <label className="text-sm font-semibold ">{label}</label>
      <input
        type="date"
        value={value}
        onChange={onChange}
        className="w-full p-3 py-2 border rounded-xl mt-1 focus:ring-primary focus:border-primary/60 border-gray-200"
      />
    </div>
  );
};

export default DateInput;
