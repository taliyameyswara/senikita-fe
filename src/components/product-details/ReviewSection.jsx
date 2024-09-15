// ReviewSection.js
import React from "react";
import RatingAccumulation from "../../components/review/RatingAccumulation";
import Review from "../../components/review/Review";

const ReviewSection = ({ review }) => {
  return (
    <div className="p-6 bg-white rounded-xl border my-6">
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-10">
        <RatingAccumulation review={review} />
        <Review review={review} />
      </div>
    </div>
  );
};

export default ReviewSection;
