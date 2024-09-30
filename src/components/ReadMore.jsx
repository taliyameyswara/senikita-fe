import React, { useState, useEffect } from "react";

const ReadMore = ({ description = "", maxLength = 400 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const [truncatedContent, setTruncatedContent] = useState(description);

  useEffect(() => {
    // Check if the description needs truncation
    if (description.length > maxLength) {
      setIsTruncated(true);
      setTruncatedContent(description.substring(0, maxLength) + "...");
    } else {
      setIsTruncated(false);
      setTruncatedContent(description);
    }
  }, [description, maxLength]);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <p
        className="text-sm"
        dangerouslySetInnerHTML={{
          __html: isExpanded ? description : truncatedContent,
        }}
      />
      {isTruncated && (
        <button
          onClick={toggleDescription}
          className="text-sm font-semibold text-tertiary hover:underline"
        >
          {isExpanded ? "Lihat Lebih Sedikit" : "Lihat Selengkapnya"}
        </button>
      )}
    </div>
  );
};

export default ReadMore;
