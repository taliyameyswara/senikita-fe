import { useEffect } from "react";
import { FaHandHoldingHeart } from "react-icons/fa";
import {
  IoBrush,
  IoCart,
  IoCashOutline,
  IoCheckmarkDoneOutline,
  IoHourglass,
  IoPersonAdd,
  IoStar,
} from "react-icons/io5";
import Navbar from "../../../components/navbar/Navbar";
import MainFooter from "../../../components/footer/Footer";

const stepsForArtists = [
  {
    title: "Daftar sebagai Seniman",
    description:
      "Buat akun sebagai seniman dengan mengisi informasi pribadi dan karya seni yang ingin ditawarkan. Profilmu akan menjadi portofolio yang menarik untuk calon pelanggan.",
    icon: <IoPersonAdd />,
  },
  {
    title: "Unggah Karya Seni",
    description:
      "Tambahkan produk seni atau layanan yang Anda tawarkan. Jelaskan detail, harga, dan estimasi waktu pengerjaan agar pelanggan lebih mudah memilih.",
    icon: <IoBrush />,
  },
  {
    title: "Terima Pesanan",
    description:
      "Ketika pelanggan memesan produk atau jasamu, Anda akan mendapatkan notifikasi. Konfirmasikan pesanan untuk memulai pengerjaan.",
    icon: <IoCart />,
  },
  {
    title: "Selesaikan Pesanan",
    description:
      "Kerjakan pesanan sesuai kesepakatan. Untuk produk fisik, pastikan pengemasan aman. Untuk jasa, komunikasikan progres dengan pelanggan melalui platform.",
    icon: <IoCheckmarkDoneOutline />,
  },
  {
    title: "Dapatkan Pembayaran",
    description:
      "Setelah pesanan selesai dan diterima pelanggan, pembayaran akan ditransfer ke akunmu. Nikmati hasil kerja kerasmu!",
    icon: <IoCashOutline />,
  },
];

const SenimanGuideSection = () => {
  useEffect(() => {
    document.title = "Cara Senikita Bekerja untuk Seniman";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="">
      <Navbar />
      <header className="bg-gradient-to-r from-primary to-tertiary p-16">
        <div className="space-y-2 container text-center text-white">
          <h1 className="text-3xl font-bold">
            Cara SeniKita Bekerja untuk Seniman
          </h1>
          <p className="text-lg">
            Langkah mudah untuk seniman memulai karier dan menjual karya seni di
            platform kami.
          </p>
        </div>
      </header>
      <div className="py-10 px-6">
        <div className="container">
          <div className="flex flex-wrap w-full">
            <div className="lg:w-3/4 md:w-1/2 md:pr-10 md:py-6 mx-auto">
              {stepsForArtists.map((step, index) => (
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
      <MainFooter />
    </div>
  );
};

export default SenimanGuideSection;
