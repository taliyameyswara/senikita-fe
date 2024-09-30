// src/components/PasswordInput.jsx
import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const PasswordInput = ({ label, value, onChange, required }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-primary focus:border-primary/60"
          placeholder={label}
          value={value}
          onChange={onChange}
          required={required}
        />
        <div
          className="absolute inset-y-0 flex items-center cursor-pointer right-4"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <IoEyeOffOutline className="text-lg text-gray-400" />
          ) : (
            <IoEyeOutline className="text-lg text-gray-400" />
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
