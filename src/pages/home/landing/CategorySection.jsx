import React from "react";
import Heading from "../../../components/Heading";

const categories = [
  {
    id: 1,
    name: "Seni Kriya",
    image: "src/assets/home/category/kriya.webp",
    height: "h-[20.8rem]",
    grid: "row-span-2",
  },
  {
    id: 2,
    name: "Seni Tari",
    image: "src/assets/home/category/tari.webp",
    height: "h-40",
    grid: "col-span-2",
  },
  {
    id: 3,
    name: "Seni Musik",
    image: "src/assets/home/category/musik.webp",
    height: "h-[20.8rem]",
    grid: "row-span-2",
  },
  {
    id: 4,
    name: "Seni Lukis",
    image: "src/assets/home/category/lukis.webp",
    height: "h-40",
    grid: "",
  },
  {
    id: 5,
    name: "Seni Teater",
    image: "src/assets/home/category/teater.webp",
    height: "h-[20.8rem]",
    grid: "row-span-2",
  },
  {
    id: 6,
    name: "Seni Ukir",
    image: "src/assets/home/category/ukir.webp",
    height: "h-40",
    grid: "col-span-2",
  },
  {
    id: 7,
    name: "Seni Rupa",
    image: "src/assets/home/category/rupa.webp",
    height: "h-40",
    grid: "",
  },
];

const KesenianCategory = () => {
  return (
    <div className="container px-6 mb-6">
      <Heading title={"Kategori Kesenian"} />

      <div className="grid grid-cols-4 gap-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`relative rounded-xl overflow-hidden shadow-lg ${category.grid} ${category.height}`}
          >
            <img
              src={category.image}
              alt="Seni Kriya"
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent opacity-80"></div>
            <div className="absolute bottom-4 left-4 text-white text-xl font-semibold">
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KesenianCategory;
