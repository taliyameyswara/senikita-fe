import React from "react";
import { Link } from "react-router-dom"; // Import Link dari react-router-dom
import Heading from "../../../components/Heading";

const categories = [
  {
    id: 1,
    name: "Seni Kriya",
    image: "assets/home/category/kriya.webp",
    height: "h-[20.8rem]",
    grid: "row-span-2",
    link: "/seni-kriya", // Link ke halaman seni kriya
  },
  {
    id: 2,
    name: "Seni Tari",
    image: "assets/home/category/tari.webp",
    height: "h-40",
    grid: "md:col-span-2",
    link: "/seni-tari", // Link ke halaman seni tari
  },
  {
    id: 3,
    name: "Seni Musik",
    image: "assets/home/category/musik.webp",
    height: "h-[20.8rem]",
    grid: "row-span-2",
    link: "/seni-musik", // Link ke halaman seni musik
  },
  {
    id: 4,
    name: "Seni Lukis",
    image: "assets/home/category/lukis.webp",
    height: "h-40",
    grid: "",
    link: "/seni-lukis", // Link ke halaman seni lukis
  },
  {
    id: 5,
    name: "Seni Teater",
    image: "assets/home/category/teater.webp",
    height: "h-[20.8rem]",
    grid: "row-span-2",
    link: "/seni-teater", // Link ke halaman seni teater
  },
  {
    id: 6,
    name: "Seni Ukir",
    image: "assets/home/category/ukir.webp",
    height: "h-40",
    grid: "md:col-span-2",
    link: "/seni-ukir", // Link ke halaman seni ukir
  },
  {
    id: 7,
    name: "Seni Rupa",
    image: "assets/home/category/rupa.webp",
    height: "h-40",
    grid: "",
    link: "/seni-rupa", // Link ke halaman seni rupa
  },
];

const KesenianCategory = () => {
  return (
    <div className="container px-6 mb-6">
      <Heading title={"Kategori Kesenian"} />
      <div className="grid grid-cols-2 md:grid-cols-4  gap-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={category.link}
            className={`relative rounded-xl overflow-hidden shadow-lg ${category.grid} ${category.height} `}
          >
            <img
              src={category.image}
              alt={category.name}
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent opacity-80"></div>
            <div className="absolute text-xl font-semibold text-white bottom-4 left-4">
              {category.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default KesenianCategory;
