import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FullPageLoader from "../../components/loading/FullPageLoader";
import { useProvinceApi } from "../../api/landing/ProvinceApi";
import Navbar from "../../components/navbar/Navbar";
import ImageHeader from "../../components/ImageHeader";
import Plx from "react-plx";
import MainFooter from "../../components/footer/Footer";
import { VscSend } from "react-icons/vsc";
import ImageAccordion from "../../components/ImageAccordion";

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

const PetaKesenianDetail = () => {
  const { slug } = useParams();
  const { fetchArtProvinceDetails } = useProvinceApi();
  const [artProvince, setArtProvince] = useState(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchArtProvinceDetails(slug);
        console.log("Fetch response:", response);
        setArtProvince(response.art_province);
        setContent(response.content);
      } catch (error) {
        console.error("Error fetching art province details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <FullPageLoader />;
  }

  return (
    <div className="bg-tertiary">
      <Navbar />
      <div className="image-header-container">
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
      <div className="relative bg-tertiary">
        <div className="relative z-30">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-center bg-cover opacity-20"
            style={{
              backgroundImage: `url(/assets/home/hero-texture2.png)`,
            }}
          ></div>
          <div className="container px-6 py-4">
            <div className="grid grid-cols-3 gap-6 container">
              {/* Bubble Chat */}
              <div className="">
                <div className="flex items-start relative mt-16 ml-5">
                  <Plx className="z-[999]" parallaxData={parallaxAvatar}>
                    <div className="bg-white text-white p-2 px-3 rounded-2xl ml-auto shadow-lg chat-bubble">
                      <p className="text-secondary 2xl:text-sm text-xs">
                        {content}
                      </p>
                    </div>
                  </Plx>
                </div>

                {/* Inputan */}

                <div className="flex items-baseline relative mt-48 ml-5 z-50">
                  <Plx className="w-full" parallaxData={parallaxAvatar}>
                    <div className="relative flex items-center bg-white shadow-lg rounded-full px-2 py-2">
                      <input
                        type="text"
                        placeholder={`Tanyakan tentang kebudayaan ${artProvince.name}`}
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
              </div>

              {/* Avatar */}
              <div className="relative flex justify-center items-center">
                <Plx className="z-90" parallaxData={parallaxAvatar}>
                  <img
                    src="/assets/home/avatar.png"
                    alt="Avatar"
                    className="avatar-bounce"
                    style={{ userSelect: "none", pointerEvents: "none" }}
                  />
                </Plx>
              </div>

              {/* Gambar dan Deskripsi */}
              <ImageAccordion images={artProvince.art_province_details} />
            </div>
          </div>
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

export default PetaKesenianDetail;
