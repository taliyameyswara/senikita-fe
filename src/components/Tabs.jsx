import React, { useState, useEffect } from "react";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || tabs[0].name
  );

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <div className="w-full">
      <div className="flex md:gap-4 gap-0 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`py-2 text-sm md:text-base font-medium w-full ${
              activeTab === tab.name
                ? "border-b-2 border-primary text-primary w-full md:w-auto"
                : "border-b-2 border-transparent text-gray-700 hover:text-primary w-full md:w-auto"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-4">
        {tabs.find((tab) => tab.name === activeTab).content}
      </div>
    </div>
  );
};

export default Tabs;
