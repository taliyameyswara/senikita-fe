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
import { playAudioFromStream, geminiChat, getAudioFromText } from "../../helpers/audioHelper";
import LoadingImage from "/assets/home/loading.png";
import Typewriter from "../../components/peta-detail/TypeWritter";

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

  const [input, setInput] = useState("");
  const [isGeminiLoading, setIsGeminiLoading] = useState(false);


  const handleGemini = async (e) => {
    e.preventDefault();
    setIsGeminiLoading(true);
    setInput("");

    const response = await geminiChat(input, artProvince.name)
    console.log("Response:", response);
    setContent(response);

    const audioStream = await getAudioFromText(response);
    playAudioFromStream(audioStream);


    setIsGeminiLoading(false);
  };


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchArtProvinceDetails(slug);
        console.log("Fetch response:", response);
        setArtProvince(response.art_province);
        setContent(response.content);
        // const audioStream = await getAudioFromText(response.content);
        // playAudioFromStream(audioStream);
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
            <div className="container grid gap-6 lg:grid-cols-3">
              {/* Bubble Chat */}
              <div className="">
                <div className="relative flex items-start mx-5 mt-16 lg:ml-5">
                  <Plx className="z-[80]" parallaxData={parallaxAvatar}>
                    <div className="p-2 px-3 ml-auto text-white bg-white shadow-lg rounded-2xl chat-bubble">
                      <p className="text-xs text-secondary 2lg:text-sm">
                        {isGeminiLoading
                          ? (
                            <div className="flex flex-row items-center justify-center w-full h-10 gap-2">
                              <div className="animate-spin-slow">
                                <img
                                  src={LoadingImage}
                                  className="w-4 h-4 rotate-45 animate-pulse-slow"
                                  alt="Loading"
                                />
                              </div>
                              <h1 className="text-xs text-primary/50 2lg:text-sm">
                                Tunggu Sebentar...
                              </h1>

                            </div>
                          )
                          : (
                            <p className="text-xs text-secondary 2lg:text-sm">{
                              <Typewriter text={content} />

                            }</p>
                          )
                        }

                      </p>
                    </div>
                  </Plx>
                </div>

                <div className="flex">
                  <div className="relative w-3/4">
                    <OptionChat
                      className="block w-full pt-10 my-16 ml-3 lg:hidden"
                      parallaxAvatar={parallaxAvatar}
                    />
                  </div>
                  <div className="relative w-full">
                    <Avatar
                      parallaxAvatar={parallaxAvatar}
                      className="flex mt-10 lg:hidden"
                    />
                  </div>
                </div>

                {/* Inputan */}
                <div className="flex items-baseline relative lg:mt-48 lg:ml-5 lg:mx-0 mx-5 z-[999]">

                  <Plx className="w-full" parallaxData={parallaxAvatar}>
                    <form onSubmit={handleGemini} className="relative flex items-center px-2 py-2 bg-white rounded-full shadow-lg">
                      <input
                        type="text"
                        placeholder={`Tanyakan tentang kebudayaan ${artProvince.name}`}
                        className="flex-1 text-xs text-gray-700 bg-transparent border-none focus:outline-none focus:ring-transparent"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}

                      />
                      <button
                        disabled={isGeminiLoading}
                        type="submit"
                        // className="p-2 text-white rounded-full shadow-md bg-primary hover:bg-primary-dark"
                        className={"p-2 text-white rounded-full shadow-md bg-primary hover:bg-primary-dark " + (isGeminiLoading ? "bg-primary/50" : "")}
                      >

                        <VscSend />
                      </button>
                    </form>
                  </Plx>
                </div>

                {/* <OptionChat
                  className="hidden lg:block"
                  parallaxAvatar={parallaxAvatar}
                /> */}
                <OptionChat
                  className="hidden lg:block"
                  parallaxAvatar={parallaxAvatar}
                  setInput={setInput}
                  setIsGeminiLoading={setIsGeminiLoading}
                />
              </div>

              {/* Avatar */}
              <Avatar
                parallaxAvatar={parallaxAvatar}
                className="hidden lg:flex"
              />

              {/* Gambar dan Deskripsi */}
              <ImageAccordion images={artProvince.art_province_details} />
            </div>
          </div>

          {/* Footer */}
          <img
            src="/assets/home/batik-footer2.png"
            className="absolute bottom-0 z-40 w-full h-fit opacity-70"
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
