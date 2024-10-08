// import React, { useRef, useEffect, useState } from "react";

// const ScrollTab = ({ tabs }) => {
//   const sectionsRef = useRef([]);
//   const [activeTab, setActiveTab] = useState(tabs[0].target);

//   useEffect(() => {
//     scrollToSection(tabs[0].target);

//     const observer = new IntersectionObserver(handleIntersection, {
//       root: null,
//       rootMargin: "-100px",
//       threshold: 0.5,
//     });

//     sectionsRef.current.forEach((section) => {
//       if (section instanceof Element) {
//         observer.observe(section);
//       }
//     });

//     return () => {
//       observer.disconnect();
//     };
//   }, [tabs]);

//   const handleIntersection = (entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         setActiveTab(entry.target.getAttribute("id"));
//       }
//     });
//   };

//   const scrollToSection = (target) => {
//     const section = document.getElementById(target);
//     if (section) {
//       window.scrollTo({
//         top: section.offsetTop - 150,
//         behavior: "smooth",
//       });
//     }
//   };

//   const handleTabClick = (target) => {
//     scrollToSection(target);
//     setActiveTab(target);
//   };

//   return (
//     <div>
//       {/* Tab Navigation */}
//       <div className="flex bg-white sticky md:top-20 top-[9.1rem] z-30 my-3 min-w-[100vh]">
//         {tabs.map((tab, index) => (
//           <button
//             key={index}
//             className={`py-3 px-4 text-sm font-semibold focus:outline-none ${
//               activeTab === tab.target
//                 ? "text-tertiary border-b-2 border-tertiary"
//                 : "text-primary border-b-2 border-transparent"
//             }`}
//             onClick={() => handleTabClick(tab.target)}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Tab Sections */}
//       <div>
//         {tabs.map((tab, index) => (
//           <section
//             key={index}
//             id={tab.target}
//             ref={(el) => (sectionsRef.current[index] = el)}
//             className="scroll-section"
//           >
//             {tab.content}
//           </section>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ScrollTab;

import React, { useRef, useEffect, useState } from "react";

const ScrollTab = ({ tabs }) => {
  const sectionsRef = useRef([]);
  const [activeTab, setActiveTab] = useState(tabs[0].target);
  const isClickRef = useRef(false); // Track if scroll is due to click

  useEffect(() => {
    // Scroll to the first tab when the component mounts
    scrollToSection(tabs[0].target);

    const handleScroll = () => {
      if (isClickRef.current) return; // Prevent updating activeTab when clicking

      // Iterate over each section and find which section is currently in view
      sectionsRef.current.forEach((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom > 150) {
            setActiveTab(section.id);
          }
        }
      });
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Clean up scroll event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [tabs]);

  // Scroll to a specific section by ID
  const scrollToSection = (target) => {
    const section = document.getElementById(target);
    if (section) {
      isClickRef.current = true; // Set click flag to true
      // Scroll smoothly to the section, accounting for a header offset
      window.scrollTo({
        top: section.offsetTop - 150,
        behavior: "smooth",
      });
      setActiveTab(target); // Set the active tab immediately to reduce delay

      // Reset click flag after scrolling
      setTimeout(() => {
        isClickRef.current = false;
      }, 500); // Adjust the delay as needed to match the smooth scroll duration
    }
  };

  // Handle tab click event by scrolling to the corresponding section
  const handleTabClick = (target) => {
    setActiveTab(target); // Set the active tab immediately on click
    scrollToSection(target);
  };

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex bg-white sticky md:top-20 top-[9.1rem] z-30 my-3 min-w-[100vh]">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-3 px-4 text-sm font-semibold focus:outline-none ${
              activeTab === tab.target
                ? "text-tertiary border-b-2 border-tertiary"
                : "text-primary border-b-2 border-transparent"
            }`}
            onClick={() => handleTabClick(tab.target)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Sections */}
      <div>
        {tabs.map((tab, index) => (
          <section
            key={index}
            id={tab.target}
            ref={(el) => (sectionsRef.current[index] = el)}
            className="scroll-section"
          >
            {tab.content}
          </section>
        ))}
      </div>
    </div>
  );
};

export default ScrollTab;
