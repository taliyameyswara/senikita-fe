import React, { useState } from "react";
import classNames from "classnames";

const ToggleButton = ({ icon, title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div className="mb-4">
      <button
        onClick={handleToggle}
        className="flex gap-2 items-center p-2 px-4  rounded-xl bg-white border border-gray-300 text-secondary"
      >
        {icon}
        <span className="text-sm">{title}</span>
      </button>
      <div
        className={classNames(
          "transition-max-height duration-300 ease-in-out overflow-auto",
          {
            "max-h-0": !isOpen,
            "max-h-full": isOpen,
          }
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default ToggleButton;
