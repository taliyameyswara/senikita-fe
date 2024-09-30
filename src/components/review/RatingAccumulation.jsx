import { FaStar } from "react-icons/fa";

const RatingAccumulation = ({ review }) => {
  if (!review || review.length === 0) {
    return (
      <div className="col-span-1">
        <h2 className="mb-2 text-lg font-semibold md:text-xl">Ulasan Pembeli</h2>
        <div className="font-nunito">Belum ada ulasan.</div>
      </div>
    );
  }

  const totalReview = review.length;
  const totalRating = review.reduce((sum, data) => sum + data.rating, 0);
  const averageRating = totalRating / totalReview;

  // Rating distribution
  const ratingCounts = [1, 2, 3, 4, 5].map(
    (rate) => review.filter((r) => r.rating === rate).length
  );

  // Function to render stars
  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < filledStars) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (i === filledStars && hasHalfStar) {
        stars.push(
          <FaStar
            key={i}
            className="text-yellow-500"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        );
      } else {
        stars.push(<FaStar key={i} className="text-gray-300" />);
      }
    }

    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="col-span-1">
      <h2 className="mb-2 text-lg font-semibold md:text-xl">Ulasan Pembeli</h2>
      <div className="mb-4 font-nunito">
        <div className="flex items-end gap-2 mb-2">
          <div className="flex items-center">
            <FaStar className="text-yellow-500 text-3xl mb-[0.5]" />
            <div className="ml-2 text-4xl font-bold">
              {averageRating.toFixed(1)}
            </div>
          </div>
          <div className="text-gray-500">/</div>
          <div className="text-gray-500">5.0</div>
        </div>

        {/* Total rating + review */}
        <div className="flex items-center gap-2 text-gray-500">
          <div>
            <span className="font-nunito">{totalRating}</span> rating
          </div>
          <div className="text-xs">•</div>
          <div>
            <span className="font-nunito">{totalReview}</span> ulasan
          </div>
        </div>
      </div>

      {/* Rating Bar Accumulation */}
      <div className="mt-4 space-y-2">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = ratingCounts[rating - 1];
          return (
            <div
              key={rating}
              className="flex items-center font-light font-nunito"
            >
              <span className="flex items-center gap-1 mr-2">
                {renderStars(rating)}
                <div>{rating}</div>
              </span>
              <span className="relative flex-1 h-3 overflow-hidden bg-gray-200 rounded-full">
                <div
                  className="absolute top-0 left-0 h-full bg-yellow-500"
                  style={{ width: `${(count / totalReview) * 100}%` }}
                ></div>
              </span>
              <span className="ml-2 text-sm text-gray-400">({count})</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RatingAccumulation;
