import React from "react";
import {
  IoPersonAdd,
  IoCart,
  IoHourglass,
  IoStar,
  IoBrush,
} from "react-icons/io5";
import { FaHandHoldingHeart } from "react-icons/fa";
import Heading from "../../../components/Heading";

const steps = [
  {
    title: "Daftar sebagai Pengguna",
    description:
      "Buat akun dengan mengisi formulir pendaftaran. Setelah mendaftar, Anda dapat menjelajahi dan membeli berbagai produk dan jasa seni yang tersedia.",
    icon: <IoPersonAdd />,
  },
  {
    title: "Pesan dan Pembayaran",
    description:
      "Setelah menemukan produk atau jasa yang diinginkan, klik tombol 'Beli Sekarang' atau 'Masukkan Keranjang' terlebih dahulu dan ikuti proses checkout. Senikita menyediakan berbagai metode pembayaran yang aman dan mudah.",
    icon: <IoCart />,
  },
  {
    title: "Tunggu Konfirmasi",
    description:
      "Setelah melakukan pembayaran, tunggu konfirmasi dari seniman. Kamu akan mendapatkan informasi lebih lanjut mengenai estimasi waktu pengerjaan (untuk jasa) atau pengiriman (untuk produk).",
    icon: <IoHourglass />,
  },
  {
    title: "Terima Karya Seni",
    description:
      "Nikmati karya seni yang kamu pesan! Jika ada masalah atau pertanyaan, kamu bisa menghubungi seniman langsung melalui platform.",
    icon: <FaHandHoldingHeart />,
  },
  {
    title: "Beri Ulasan",
    description:
      "Berikan ulasan dan penilaian tentang pengalamanmu setelah menerima produk atau jasa. Ulasan kamu akan membantu seniman lain dan meningkatkan kredibilitas di platform.",
    icon: <IoStar />,
  },
  {
    title: "Menjadi Seniman",
    description:
      "Bergabunglah sebagai seniman dengan mendaftar di platform kami. Isi informasi mengenai karya seni dan layanan yang kamu tawarkan untuk mulai menjual.",
    icon: <IoBrush />,
  },
];

const GuideSection = () => {
  return (
    <div>
      <div className="relative -mt-20 bg-white rounded-t-3xl pt-10">
        <div className="container">
          <div className="text-center">
            <Heading title={"Cara Senikita Bekerja"} />
          </div>
          <div className="flex flex-wrap w-full">
            <div className="lg:w-3/4 md:w-1/2 md:pr-10 md:py-6 mx-auto">
              {steps.map((step, index) => (
                <div className="flex relative pb-12" key={index}>
                  <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-[0.5px] bg-gray-200 pointer-events-none"></div>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-tertiary/20 inline-flex items-center justify-center text-primary relative z-10">
                    {step.icon}
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="font-semibold text-lg text-primary mb-1 tracking-wider">
                      {step.title}
                    </h2>
                    <p className="leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 right-0 h-10 bg-white rounded-t-3xl z-10" />
      </div>
    </div>
  );
};

export default GuideSection;
