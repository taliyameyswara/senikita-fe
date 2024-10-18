import React from "react";
import ImageSlider from "../../components/ImageSlider";
import ReadMore from "../../components/ReadMore";
import { formatNumber } from "../../utils/formatNumber";
import { FaStar } from "react-icons/fa";
import {
  IoLocationOutline,
  IoCash,
  IoCalendarOutline,
  IoSwapHorizontalOutline,
  IoTimeOutline,
  IoCashOutline,
} from "react-icons/io5";

const ServiceDetailSection = ({ service }) => {
  const imageServices =
    service.images && service.images.length > 0
      ? [service.thumbnail, ...service.images.map((image) => image.picture)]
      : [service.thumbnail];

  const paymentLabel = (type) => {
    if (type === "hari") {
      return "Pembayaran per hari";
    } else if (type === "tampil") {
      return "Pembayaran per tampil";
    } else if (type === "jam") {
      return "Pembayaran per jam";
    } else {
      return "Tipe pembayaran tidak diketahui";
    }
  };

  return (
    <div className="grid items-start grid-cols-1 gap-3 mt-4 lg:grid-cols-2 md:gap-6">
      {/* image slider */}
      <ImageSlider imageUrls={imageServices} />

      {/* service details */}
      <div className="flex flex-col">
        {/* price */}
        <span className="text-2xl font-bold md:text-3xl text-primary font-nunito">
          {formatNumber(service.price)}
        </span>
        <h1 className="my-1 text-2xl md:text-3xl text-secondary font-crimson md:my-2">
          {service.name}
        </h1>

        {/* sold + rating */}
        <div className="flex gap-2 mb-2 text-sm">
          <div className="">
            Terjual <span className="font-nunito">{service.sold}</span>
          </div>
          <div className="">•</div>
          <div className="flex items-center gap-1">
            <FaStar className="mb-1 text-yellow-500" />
            <div className="text-sm font-nunito">{service.average_rating ? service.average_rating.toFixed(1) : 0}</div>
            <div className="text-sm text-gray-500 font-nunito">
              ({service.ratings.length} Rating)
            </div>
          </div>
        </div>

        {/* details + shop */}
        <div className="flex flex-col gap-3">
          <div className="text-sm">
            {/* stock */}
            <div className="">
              <span className="text-gray-500">Jumlah Orang:</span>
              <span className="ml-1">{service.person_amount}</span>
            </div>
            {/* category */}
            <div className="">
              <span className="text-gray-500">Kategori:</span>
              <span className="ml-1 font-semibold text-primary">
                {service.category_name}
              </span>
            </div>
          </div>

          {/* description */}
          <ReadMore description={service.desc} />

          {/* shipping */}
          <div className="text-sm">
            <h1 className="font-bold ">Alamat Layanan Kesenian</h1>
            <div className="flex flex-col gap-1">
              {/* location */}
              <div className="flex items-center gap-2">
                <IoLocationOutline />
                <div className="">
                  Lokasi Layanan dari {""}
                  <span className="font-semibold">
                    {service.shop.region}
                    {/* {service.shop} */}
                  </span>
                </div>
              </div>
              {/* Pembayaran */}
              <div className="flex items-center gap-2">
                <IoCashOutline />
                <div className="">
                  <span className="">
                    {paymentLabel(service.type)}
                    {/* {service.shop} */}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailSection;
