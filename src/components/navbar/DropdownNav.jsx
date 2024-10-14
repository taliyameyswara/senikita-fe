import { useState, useEffect, useRef } from "react";
// import { FaCaretDown } from "react-icons/fa";

const DropdownNav = ({ title, icon, position, children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative cursor-pointer group" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center md:text-base text-sm font-semibold gap-1 text-secondary hover:text-primary duration-200"
      >
        {title}
        {icon}
      </button>

      <div
        className={`absolute ${position} z-[9999] w-[200px] px-0 bg-gray-50 shadow-md p-2 rounded-xl mt-5  transition-transform duration-100 ease-out transform  ${
          dropdownOpen
            ? "bounce-in scale-100 visible "
            : "bounce-out scale-95 invisible"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default DropdownNav;
