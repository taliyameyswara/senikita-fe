import React, { useRef, useEffect, useState } from "react";
import { Element, scroller } from "react-scroll";

const ScrollTab = ({ tabs }) => {
  const sectionsRef = useRef([]);
  const [activeTab, setActiveTab] = useState(tabs[0].target);

  document.addEventListener("DOMContentLoaded", function () {
    useEffect(() => {
      const handleIntersection = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.getAttribute("name"));
          }
        });
      };

      const observer = new IntersectionObserver(handleIntersection, {
        root: null,
        rootMargin: "0px",
        threshold: 0.6,
      });

      sectionsRef.current.forEach((section) => {
        if (section) observer.observe(section);
      });

      return () => {
        sectionsRef.current.forEach((section) => {
          if (section) observer.unobserve(section);
        });
      };
    }, [sectionsRef, tabs]);
  });

  const handleTabClick = (target) => {
    scroller.scrollTo(target, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -150,
    });
    setActiveTab(target);
  };

  return (
    <div>
      <div
        className="flex  bg-white sticky top-20 z-20 my-3  "
        style={{ width: "100% !important" }}
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-3 px-4 text-sm font-semibold focus:outline-none ${
              activeTab === tab.target
                ? "text-tertiary border-b-2 border-tertiary"
                : "text-primary"
            }`}
            onClick={() => handleTabClick(tab.target)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab Contents */}
      <div>
        {tabs.map((tab, index) => (
          <Element
            key={index}
            name={tab.target}
            className="scroll-section"
            ref={(el) => (sectionsRef.current[index] = el)}
          >
            <div className="">{tab.content}</div>
          </Element>
        ))}
      </div>
    </div>
  );
};

export default ScrollTab;
