import React from "react";
import Navbar from "../../components/navbar/Navbar";
import ImageHeader from "../../components/ImageHeader";
import Plx from "react-plx";
import MainFooter from "../../components/footer/Footer";
import { IoSendOutline } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";
import ImageAccordion from "../../components/ImageAccordion";
import ProductCard from "../../components/card/ProductCard";

const artProvince = {
  name: "Bali",
  subtitle:
    "Dikenal sebagai pulau para dewa, Bali memikat wisatawan dengan pesona alam dan kekayaan budaya.",
  art_province_details: [
    {
      id: 1,
      image:
        "https://lokadewata.com/wp-content/uploads/2020/12/Harga-Tiket-Barong-Dance-Batubulan-Bali-Feature-Image.jpg",
    },
    {
      id: 2,
      image:
        "https://awsimages.detik.net.id/community/media/visual/2022/07/03/ilustrasi-jadwal-pesta-kesenian-bali-pkb-selasa-5-juli-2022_169.jpeg?w=1200",
    },
    {
      id: 3,
      image:
        "https://kemenparekraf.go.id/_next/image?url=https%3A%2F%2Fapi2.kemenparekraf.go.id%2Fstorage%2Fapp%2Fuploads%2Fpublic%2F648%2Ff0c%2F196%2F648f0c196e680823572901.jpeg&w=3840&q=75",
    },
  ],
};

const parallaxData = [
  {
    start: 0,
    end: 500,
    properties: [
      {
        easing: "ease-in",
        startValue: 1,
        endValue: 50,
        property: "translateY",
      },
    ],
  },
];

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
      <Navbar />
      <div className="image-header-container ">
        {/* Komponen ImageHeader */}
        <ImageHeader
          images={artProvince.art_province_details.map((detail) => ({
            src: detail.image,
          }))}
          title={artProvince.name}
          subtitle={artProvince.subtitle}
        />
        <div className="relative w-full">
          <Plx
            className="parallax-cloud 3xl:-bottom-64 -bottom-36 absolute z-30"
            parallaxData={parallaxData}
          >
            <img
              src="/assets/cloud.png"
              alt="Parallax"
              className="cloud-image w-screen object-fit"
              style={{ userSelect: "none", pointerEvents: "none" }}
            />
          </Plx>
          <div
            className="absolute bg-gradient-to-t from-tertiary to-transparent h-64 w-full z-30"
            style={{
              bottom: "-200px",
            }}
          ></div>
          <div
            className="absolute bg-gradient-to-t from-tertiary to-transparent h-24 w-full z-30"
            style={{
              bottom: "-200px",
            }}
          ></div>
        </div>
      </div>
      <div className="relative bg-tertiary ">
        <div className="relative z-30">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-center bg-cover opacity-20"
            style={{
              backgroundImage: `url(/assets/home/hero-texture2.png)`,
            }}
          ></div>
          <div className="container px-6 py-4 ">
            <div className="grid grid-cols-3 gap-6 container">
              {/* Bubble Chat */}
              <div className="">
                <div className="flex items-start relative mt-16 ml-5">
                  <Plx className="z-[999]" parallaxData={parallaxAvatar}>
                    <div className="bg-white text-white p-2 px-3 rounded-2xl ml-auto shadow-lg chat-bubble">
                      <p className="text-secondary 2xl:text-sm text-xs">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam ex neque officia, at animi commodi. Rem
                        repellat voluptates repellendus tenetur, est voluptatum
                        fugiat ipsam distinctio, obcaecati consequatur
                        perspiciatis iure animi!
                      </p>
                    </div>
                  </Plx>
                </div>

                {/* Inputan */}

                <div className="flex items-baseline relative mt-48 ml-5 z-50 ">
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

                <div className=" relative z-50 mt-10 ml-5">
                  <Plx
                    className="text-xs grid grid-cols-2 gap-3 space"
                    parallaxData={parallaxAvatar}
                  >
                    {[
                      "💃 Tarian tradisional",
                      "🪘 Alat musik tradisional",
                      "🎊 Festival Budaya",
                      "🥻 Pakaian Adat",
                    ].map((question, index) => (
                      <button
                        key={index}
                        className="bg-gradient-to-bl from-tertiary via-white/30 to-tertiary  border-[0.5px] border-white/50   px-4 py-2 rounded-full text-white"
                      >
                        {question}
                      </button>
                    ))}
                  </Plx>
                </div>
              </div>

              {/* Avatar */}
              <div className="relative flex justify-center items-center">
                <Plx className="z-90" parallaxData={parallaxAvatar}>
                  <img
                    src="/assets/home/avatar.png"
                    alt="Avatar"
                    className=" avatar-bounce"
                    style={{ userSelect: "none", pointerEvents: "none" }}
                  />
                </Plx>
              </div>

              {/* <ImageAccordion /> */}
            </div>
          </div>

          {/* footer */}
          {/* <img
            src="/assets/home/batik-footer.png"
            className="absolute h-fit w-full z-40 bottom-0 opacity-70"
            alt="Batik Footer"
          /> */}
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
