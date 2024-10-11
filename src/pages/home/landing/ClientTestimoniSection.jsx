import React from "react";
import Slider from "react-slick";
import { IoStar } from "react-icons/io5";
import Heading from "../../../components/Heading";
import HeroTexture from "../../../assets/home/hero-texture2.png";
import Client1 from "../../../assets/home/client1.png";
import Client2 from "../../../assets/home/client2.png";

const ClientTestimoniSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Fendi Suryana",
      position: "Penyelenggara Festival Seni - Artzie Indonesia",
      rating: 4.9,
      review:
        "Senikita telah membantu kami menemukan seniman rupa lokal yang berbakat untuk festival seni kami. Pelayanan yang sangat memuaskan!",
      service: "Lukisan Abstrak Khas Jawa Tengah",
      image: "https://img.antaranews.com/cache/1200x800/2023/09/26/Rudini.jpg",
    },
    {
      id: 2,
      name: "Dimas Aditya",
      position: "Musisi - Payung Teduh",
      rating: 4.8,
      review:
        "Dengan Senikita, saya bisa terhubung dengan musisi lainnya dan berbagi pengalaman. Platform yang luar biasa untuk seniman musik!",
      service: "Pementasan Keroncong Solo",
      image:
        "https://www.permatabank.com/sites/default/files/2021-03/7%20Landing%20gtr-Mobile.jpg",
    },
    {
      id: 3,
      name: "Siti Nurjanah",
      position: "Penari Tradisional",
      rating: 4.7,
      review:
        "Senikita memberikan ruang bagi saya untuk menampilkan tarian tradisional. Saya merasa dihargai dan didukung!",
      service: "Tari Saman Aceh",
      image:
        "https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2022/06/17/2345639924.jpg",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
  };

  return (
    <section className="py-8 my-20 relative overflow-hidden">
      {/* Background Texture Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${HeroTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.07,
          zIndex: 0,
        }}
      ></div>

      {/* Fade Effect Overlays */}

      <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent h-1/4 top-0 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent h-1/4 bottom-0 translate-y-[300%] z-10"></div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="text-center mb-10">
          <Heading title={"Testimoni Klien Tentang Senikita"} />
          <p className="text-gray-600">Kata klien tentang Senikita</p>
        </div>

        {/* Slider Section */}
        <Slider {...settings} className="w-full md:w-[60%] mx-auto">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="p-4">
              <div className="overflow-hidden flex">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 object-cover rounded-full m-4"
                />
                <div className="p-4 flex-1">
                  <div className="flex items-center mb-2">
                    <IoStar className="text-yellow-400 text-lg mb-1" />
                    <span className="ml-2 text-lg font-semibold font-nunito">
                      {testimonial.rating}{" "}
                      <span className="text-gray-400 font-light">/ 5.0</span>
                    </span>
                  </div>
                  <p className="text-gray-800 font-semibold mb-2">
                    {testimonial.review}
                  </p>
                  <p className="text-gray-600 mb-2">
                    {testimonial.name}, {testimonial.position}
                  </p>
                  <div className="text-sm text-gray-500">
                    Jasa Yang Dipesan:{" "}
                    <span className="text-primary">{testimonial.service}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <img
        src={Client1}
        alt="Client1"
        className="hidden lg:block absolute left-1/2 bottom-20 h-full"
        style={{ transform: "translate(-125%, 20%) scaleX(-1)" }}
      />
      <img
        src={Client2}
        alt="Client2"
        className="hidden lg:block absolute right-1/2 -bottom-20 h-full object-fill"
        style={{ transform: "translate(125%, -20%)" }}
      />
    </section>
  );
};

export default ClientTestimoniSection;
