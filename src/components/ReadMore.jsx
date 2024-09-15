import React, { useState, useEffect } from "react";

const ReadMore = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const [truncatedContent, setTruncatedContent] = useState(description);

  const maxLength = 400; // max char

  useEffect(() => {
    if (description.props.children) {
      const totalLength = description.props.children.reduce(
        (acc, child) => acc + (typeof child === "string" ? child.length : 0),
        0
      );

      if (totalLength > maxLength) {
        setIsTruncated(true);
        setTruncatedContent(truncateDescription(description, maxLength));
      }
    }
  }, [description]);

  const truncateDescription = (desc, maxLength) => {
    let charCount = 0;
    const truncatedChildren = React.Children.toArray(
      desc.props.children
    ).reduce((acc, child) => {
      if (charCount >= maxLength) return acc;

      if (typeof child === "string") {
        const remainingChars = maxLength - charCount;
        if (child.length > remainingChars) {
          acc.push(child.substring(0, remainingChars) + "...");
          charCount = maxLength;
        } else {
          acc.push(child);
          charCount += child.length;
        }
      } else {
        acc.push(child);
      }
      return acc;
    }, []);

    return <>{truncatedChildren}</>;
  };

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <p className="text-sm">{isExpanded ? description : truncatedContent}</p>
      {isTruncated && (
        <button
          onClick={toggleDescription}
          className="text-tertiary hover:underline text-sm font-semibold"
        >
          {isExpanded ? "Lihat Lebih Sedikit" : "Lihat Selengkapnya"}
        </button>
      )}
    </div>
  );
};

export default ReadMore;
