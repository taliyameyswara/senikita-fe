import { FaStar } from "react-icons/fa";

const Review = ({ review, type }) => {
  if (!review || review.length === 0) {
    return null;
  }

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
    <div className="col-span-2 space-y-4 text-sm lg:mt-0 md:mt-4">
      {review.map(({ user, date, rating, comment, rating_images }, index) => (
        <div key={index} className="">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
            <div className="font-semibold">{user.name}</div>
            <div className="hidden lg:block"> - </div>
            <div className="flex items-center ">
              {renderStars(rating)}
              <div className="ml-2 font-semibold md:text-lg font-nunito">
                {rating.toFixed(1)}
              </div>
            </div>
            <div className="text-gray-500">{date}</div>
          </div>

          <p className="my-1 text-gray-700">{comment}</p>

          {rating_images && rating_images.length > 0 && (
            <div className="flex gap-2">
              {rating_images.map((data, idx) =>
                type === "product" ? (
                  <img
                    key={idx}
                    src={data.picture_rating_product}
                    alt={`Review image ${idx}`}
                    className="object-cover w-20 h-20 rounded-lg"
                  />
                ) : (
                  <img
                    key={idx}
                    src={data.picture_rating_service}
                    alt={`Review image ${idx}`}
                    className="object-cover w-20 h-20 rounded-lg"
                  />
                )
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Review;
