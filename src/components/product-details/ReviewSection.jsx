// ReviewSection.js
import React from "react";
import RatingAccumulation from "../../components/review/RatingAccumulation";
import Review from "../../components/review/Review";

const ReviewSection = ({ review }) => {
  return (
    <div className="p-6 my-6 bg-white border rounded-xl">
      <div className="grid grid-cols-1 md:gap-10 gap-5 lg:grid-cols-3">
        <RatingAccumulation review={review} />
        <Review review={review} />
      </div>
    </div>
  );
};

export default ReviewSection;
