import React from "react";
import { formatNumber } from "../../utils/formatNumber";
import Review from "../../components/review/Review";
import EmptyState from "../EmptyState";

const ReviewTab = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <EmptyState message={"Belum ada ulasan tersedia"} />;
  }

  return (
    <div>
      <h1 className="text-lg font-semibold mb-4">Ulasan Pilihan</h1>
      <div className="flex flex-col gap-3">
        {reviews.map((review, index) => (
          <div key={index} className="grid grid-cols-4 gap-5 items-start">
            {/* Product Section */}
            <div className="flex flex-col gap-2 w-fit">
              <img
                src="https://via.placeholder.com/100" // Replace with actual product image if available
                alt="Product Thumbnail"
                className="w-32 h-32 rounded-xl object-cover"
              />
              <div className="">
                <p className="font-semibold">
                  {review.productName || "Nama Produk"}
                </p>
                <p className="font-nunito">
                  {review.price
                    ? formatNumber(review.price)
                    : "Harga tidak tersedia"}
                </p>
              </div>
            </div>

            {/* Review Section */}
            <div className="col-span-3">
              <Review review={[review]} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewTab;
