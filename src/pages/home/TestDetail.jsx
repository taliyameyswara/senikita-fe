import React from "react";
import Navbar from "../../components/navbar/Navbar";
import ImageHeader from "../../components/peta-detail/ImageHeader";
import Plx from "react-plx";
import MainFooter from "../../components/footer/Footer";
import { IoSendOutline } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";
import ImageAccordion from "../../components/peta-detail/ImageAccordion";
import ProductCard from "../../components/card/ProductCard";
import Avatar from "../../components/peta-detail/Avatar";
import OptionChat from "../../components/peta-detail/OptionChat";

const artProvince = {
  name: "Bali",
  subtitle:
    "Dikenal sebagai pulau para dewa, Bali memikat wisatawan dengan pesona alam dan kekayaan budaya.",
  art_province_details: [
    {
      id: 1,
      image:
        "https://lokadewata.com/wp-content/uploads/2020/12/Harga-Tiket-Barong-Dance-Batubulan-Bali-Feature-Image.jpg",
      name: "Pantai Indah",
      description: "Pantai yang indah dengan pasir putih dan air biru jernih.",
    },
    {
      id: 2,
      image:
        "https://awsimages.detik.net.id/community/media/visual/2022/07/03/ilustrasi-jadwal-pesta-kesenian-bali-pkb-selasa-5-juli-2022_169.jpeg?w=1200",
      name: "Gunung Megah",
      description: "Gunung tinggi yang dikelilingi oleh hutan hijau.",
    },
    {
      id: 3,
      image:
        "https://kemenparekraf.go.id/_next/image?url=https%3A%2F%2Fapi2.kemenparekraf.go.id%2Fstorage%2Fapp%2Fuploads%2Fpublic%2F648%2Ff0c%2F196%2F648f0c196e680823572901.jpeg&w=3840&q=75",
      name: "Air Terjun Eksotis",
      description:
        "Air terjun dengan aliran air yang deras dan pemandangan spektakuler.",
    },
  ],
};

const parallaxAvatar = [
  {
    start: 0,
    end: 500,
    properties: [
      {
        startValue: 1,
        endValue: 1.2,
        property: "scale",
      },
      {
        startValue: 0,
        endValue: -180,
        property: "translateY",
      },
    ],
  },
];

const dummyProduct = {
  id: "1",
  category: { name: "Musik" },
  shop: { region: "Jakarta" },
  name: "Gitar Akustik Berkualitas Tinggi",
  price: 2500000,
  average_rating: 4.5,
  sold: 120,
  images: [
    { picture: "https://via.placeholder.com/150" },
    { picture: "https://via.placeholder.com/150" },
    { picture: "https://via.placeholder.com/150" },
  ],
  thumbnail: "https://via.placeholder.com/150",
};

const TestDetail = () => {
  return (
    <div className="bg-tertiary">
      <Navbar className="mb-0" />

      {/* Komponen ImageHeader */}
      <ImageHeader
        images={artProvince.art_province_details.map((detail) => ({
          src: detail.image,
        }))}
        title={artProvince.name}
        subtitle={artProvince.subtitle}
      />

      {/*  */}
      <div className="relative bg-tertiary ">
        <div className="relative z-30">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-center bg-contain opacity-20"
            style={{
              backgroundImage: `url(/assets/home/hero-texture2.png)`,
            }}
          ></div>
          <div className="container px-6 py-4 ">
            <div className="grid lg:grid-cols-3 gap-6 container">
              {/* Bubble Chat */}
              <div className="">
                <div className="flex items-start relative mt-16 lg:ml-5 mx-5">
                  <Plx className="z-[80]" parallaxData={parallaxAvatar}>
                    <div className="bg-white text-white p-2 px-3 rounded-2xl ml-auto shadow-lg chat-bubble">
                      <p className="text-secondary 2lg:text-sm text-xs">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam ex neque officia, at animi commodi. Rem
                        repellat voluptates repellendus tenetur, est voluptatum
                        fugiat ipsam distinctio, obcaecati consequatur
                        perspiciatis iure animi!
                      </p>
                    </div>
                  </Plx>
                </div>

                <div className="flex">
                  <div className="relative w-3/4">
                    <OptionChat
                      className="lg:hidden block w-full ml-3 my-16 pt-10"
                      parallaxAvatar={parallaxAvatar}
                    />
                  </div>
                  <div className="relative w-full">
                    <Avatar
                      parallaxAvatar={parallaxAvatar}
                      className="lg:hidden flex mt-10"
                    />
                  </div>
                </div>

                {/* Inputan */}
                <div className="flex items-baseline relative lg:mt-48 lg:ml-5 lg:mx-0 mx-5 z-[999] ">
                  <Plx className="w-full" parallaxData={parallaxAvatar}>
                    <div className="relative flex items-center bg-white shadow-lg rounded-full px-2 py-2">
                      <input
                        type="text"
                        placeholder="Tanyakan tentang kebudayaan Jawa Tengah"
                        className="flex-1 bg-transparent border-none focus:outline-none focus:ring-transparent text-gray-700 text-xs"
                      />
                      <button
                        type="button"
                        className="bg-primary text-white  p-2 rounded-full  shadow-md hover:bg-primary-dark"
                      >
                        <VscSend />
                      </button>
                    </div>
                  </Plx>
                </div>

                <OptionChat
                  className="lg:block hidden"
                  parallaxAvatar={parallaxAvatar}
                />
              </div>

              <Avatar
                parallaxAvatar={parallaxAvatar}
                className="lg:flex hidden"
              />

              <ImageAccordion images={artProvince.art_province_details} />
            </div>
          </div>

          {/* footer */}
          <img
            src="/assets/home/batik-footer2.png"
            className="absolute h-fit w-full z-40 bottom-0 opacity-70"
            alt="Batik Footer"
          />
        </div>
      </div>

      <div className="bg-white">
        <div className="container">
          <MainFooter />
        </div>
      </div>
    </div>
  );
};

export default TestDetail;
