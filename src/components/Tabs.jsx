import React, { useState, useEffect } from "react";

const Tabs = ({ tabs }) => {
  // Cek jika localStorage ada, atau fallback ke tab pertama
  const getInitialTab = () => {
    const savedTab = localStorage.getItem("activeTab");
    const isValidTab = tabs.some((tab) => tab.name === savedTab);
    return isValidTab ? savedTab : tabs[0].name;
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const currentTab = tabs.find((tab) => tab.name === activeTab) || tabs[0];

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
      <div className="py-4">{currentTab.content}</div>
    </div>
  );
};

export default Tabs;
