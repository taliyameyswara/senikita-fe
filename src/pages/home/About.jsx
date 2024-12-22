import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import MainFooter from "../../components/footer/Footer";
import RegisterSenimanSection from "./landing/RegisterSenimanSection";
import { FiLinkedin } from "react-icons/fi";
import { IoLogoInstagram } from "react-icons/io5";

const founder = [
  {
    name: "Ricky Primayuda Putra",
    role: "CTO",
    image: "/assets/home/founders/ricky_primayuda_putra.webp",
    instagram: "https://www.instagram.com/rickyprimay/",
    linkedin: "https://www.linkedin.com/in/rickyprimay/",
  },

  {
    name: "Mario Aprilnino Prasetyo",
    role: "CEO",
    image: "/assets/home/founders/mario_aprilnino.webp",
    instagram: "https://instagram.com/mario.apn",
    linkedin: "https://www.linkedin.com/in/mario-aprilnino/",
  },
  {
    name: "Taliya Meyswara",
    role: "CCO",
    image: "/assets/home/founders/taliya_meyswara.webp",
    instagram: "https://instagram.com/taliyams",
    linkedin: "https://linkedin.com/in/taliyams",
  },
];

const About = () => {
  useEffect(() => {
    document.title = "Tentang SeniKita";
  }, []);

  return (
    <>
      <Navbar />
      <header className="bg-gradient-to-r from-primary to-tertiary p-16">
        <div className="space-y-2 container text-center text-white">
          <h1 className="text-3xl font-bold">Tentang SeniKita</h1>
          <p className="text-lg">
            Marketplace Seni dan Jasa Kesenian Indonesia
          </p>
        </div>
      </header>

      <div className="container px-6 py-4 mt-5">
        <article>
          <p className="text-gray-700 leading-relaxed text-center">
            SeniKita didirikan pada tahun 2024 dengan tujuan untuk memberdayakan
            seniman lokal di Indonesia. Berawal dari komunitas kecil seniman
            yang ingin memperluas jangkauan karya mereka, SeniKita tumbuh
            menjadi marketplace seni yang menghubungkan seniman dengan pembeli
            dari seluruh penjuru negeri. Hingga saat ini, SeniKita terus
            berkomitmen untuk mendukung perkembangan seni dan budaya melalui
            teknologi dan inovasi.
          </p>
        </article>

        <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden">
          {/* Visi */}
          <div className="border p-8 rounded-2xl relative grid lg:grid-cols-3 bg-gradient-to-tr from-brick/10 via-white to-white border-brick/10">
            <div className="relative z-10 lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Visi</h2>
              <p className="text-gray-700">
                Menjadi platform seni terkemuka di Indonesia yang memberikan
                akses luas kepada seniman lokal untuk berkembang dan menjangkau
                pasar global.
              </p>
            </div>
            <img
              src="/assets/home/client1.png"
              alt="Visi SeniKita"
              className="absolute top-0 -right-36 xl:-right-20 h-full rounded-lg hidden lg:block"
              style={{ userSelect: "none", pointerEvents: "none" }}
            />
          </div>

          {/* Misi */}
          <div className="border p-8 rounded-2xl relative grid lg:grid-cols-3 bg-gradient-to-tr from-brick/10 via-white to-white border-brick/10">
            <div className="relative z-10 col-span-2">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Misi</h2>
              <p className="text-gray-700">
                Membangun ekosistem seni yang inklusif, mendukung seniman lokal
                dengan sarana inovatif, dan menciptakan akses mudah bagi pembeli
                untuk mendapatkan karya seni berkualitas tinggi.
              </p>
            </div>
            <img
              src="/assets/home/client2.png"
              alt="Visi SeniKita"
              className="absolute top-0 -right-36 xl:-right-20 h-full rounded-lg hidden lg:block"
              style={{ userSelect: "none", pointerEvents: "none" }}
            />
          </div>
        </div>

        <section className="my-20 text-center">
          <h1 className="text-2xl font-bold mb-10">Founder Kami</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {founder.map((person) => (
              <div
                className={`text-center rounded-3xl border p-6 bg-gradient-to-tr from-customGreen/10 via-white to-white border-customGreen/10`}
              >
                <img
                  src={person.image}
                  alt="Founder 1"
                  className="w-32 h-32 mx-auto rounded-full"
                />
                <h3 className="mt-4 text-lg font-semibold text-gray-800">
                  {person.name}
                </h3>
                <p className="text-gray-600">{person.role}</p>
                <div className="flex justify-center space-x-4 mt-4">
                  <a
                    href={person.instagram}
                    className="w-8 h-8 bg-customGreen/10 rounded-full flex items-center justify-center hover:bg-customGreen/20 text-customGreen"
                    aria-label="Instagram"
                  >
                    <IoLogoInstagram />
                  </a>
                  <a
                    href={person.linkedin}
                    className="w-8 h-8 bg-customGreen/10 rounded-full flex items-center justify-center hover:bg-customGreen/20 text-customGreen"
                    aria-label="LinkedIn"
                  >
                    <FiLinkedin />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-32 mb-10">
          <RegisterSenimanSection />
        </section>
        <MainFooter />
      </div>
    </>
  );
};

export default About;
