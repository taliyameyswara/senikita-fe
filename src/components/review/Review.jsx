import { FaStar } from "react-icons/fa";

const Review = ({ review }) => {
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
    <div className="col-span-2 space-y-4 lg:mt-0 md:mt-4 text-sm">
      {review.map(({ name, date, rating, comment, image }, index) => (
        <div key={index} className="">
          <div className="flex lg:flex-row flex-col lg:items-center lg:gap-2">
            <div className="font-semibold">{name}</div>
            <div className="hidden lg:block"> - </div>
            <div className="flex items-center ">
              {renderStars(rating)}
              <div className="md:text-lg font-semibold ml-2 font-nunito">
                {rating.toFixed(1)}
              </div>
            </div>
          </div>

          <p className="text-gray-700 my-1">{comment}</p>
          {image && image.length > 0 && (
            <div className="flex gap-2">
              {image.map((imgUrl, idx) => (
                <img
                  key={idx}
                  src={imgUrl}
                  alt={`Review image ${idx}`}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Review;
