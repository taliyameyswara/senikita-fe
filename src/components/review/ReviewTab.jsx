import React from "react";
import { formatNumber } from "../../utils/formatNumber";
import Review from "../../components/review/Review";
import EmptyState from "../EmptyState";
import { limitText } from "../../utils/limitText";

const ReviewTab = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <EmptyState message={"Belum ada ulasan tersedia"} />;
  }

  return (
    <div>
      <h1 className="lg:text-lg text-base font-semibold mb-4">
        Ulasan Pilihan
      </h1>
      <div className="flex flex-col lg:gap-4 gap-3">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="grid bg-gray-100 p-3 rounded-2xl lg:grid-cols-12 md:gap-4 gap-2 items-start"
          >
            {/* Product Section */}
            <div className="lg:col-span-2 col-span-1 flex md:flex-col flex-row  md:items-start items-center gap-2 w-full">
              <img
                src="https://cdngnfi2.sgp1.cdn.digitaloceanspaces.com/gnfi/uploads/images/2022/11/0715042022-Lukisan-Balinese-Procession-karya-Lee-Man-Fong-menjadi-salah-satu-lukisan-terkenal-dunia-asal-Indonesia-Good-News-From-Indonesia.jpg"
                alt="Product Thumbnail"
                className="w-16 h-16 md:w-full md:h-32 rounded-xl object-cover"
              />
              <div className="w-full">
                <p className="text-xs md:text-sm">
                  {limitText(review.productName, 50)}
                </p>
                <p className="font-nunito font-semibold">
                  {review.price
                    ? formatNumber(review.price)
                    : "Harga tidak tersedia"}
                </p>
              </div>
            </div>

            {/* Review Section */}
            <div className="lg:col-span-10 col-span-3 flex flex-col">
              <Review review={[review]} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewTab;
