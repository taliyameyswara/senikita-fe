import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FullPageLoader from "../../components/loading/FullPageLoader";
import { useProvinceApi } from "../../api/landing/ProvinceApi";
import Navbar from "../../components/navbar/Navbar";
import ImageHeader from "../../components/peta-detail/ImageHeader";
import Plx from "react-plx";
import MainFooter from "../../components/footer/Footer";
import { VscSend } from "react-icons/vsc";
import ImageAccordion from "../../components/peta-detail/ImageAccordion";
import OptionChat from "../../components/peta-detail/OptionChat";
import Avatar from "../../components/peta-detail/Avatar";

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
        startValue: 1,
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
      <Navbar className="mb-0" />
      <ImageHeader
        images={artProvince.art_province_details.map((detail) => ({
          src: detail.image,
        }))}
        title={artProvince.name}
        subtitle={artProvince.subtitle}
      />

      <div className="relative bg-tertiary">
        <div className="relative z-30">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-center bg-contain opacity-20"
            style={{
              backgroundImage: `url(/assets/home/hero-texture2.png)`,
            }}
          ></div>
          <div className="container px-6 py-4">
            <div className="grid lg:grid-cols-3 gap-6 container">
              {/* Bubble Chat */}
              <div className="">
                <div className="flex items-start relative mt-16 lg:ml-5 mx-5">
                  <Plx className="z-[80]" parallaxData={parallaxAvatar}>
                    <div className="bg-white text-white p-2 px-3 rounded-2xl ml-auto shadow-lg chat-bubble">
                      <p className="text-secondary 2lg:text-sm text-xs">
                        {content}
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
                <div className="flex items-baseline relative lg:mt-48 lg:ml-5 lg:mx-0 mx-5 z-[999]">
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

                <OptionChat
                  className="lg:block hidden"
                  parallaxAvatar={parallaxAvatar}
                />
              </div>

              {/* Avatar */}
              <Avatar
                parallaxAvatar={parallaxAvatar}
                className="lg:flex hidden"
              />

              {/* Gambar dan Deskripsi */}
              <ImageAccordion images={artProvince.art_province_details} />
            </div>
          </div>

          {/* Footer */}
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

export default PetaKesenianDetail;
