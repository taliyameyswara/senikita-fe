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

const RecentReviewSection = () => {
  return (
    <div>
      <div className="relative -mt-20 bg-white rounded-t-3xl pt-10">
        <div className="container">
          <Heading title={"???"} />
        </div>
      </div>
    </div>
  );
};

export default RecentReviewSection;
