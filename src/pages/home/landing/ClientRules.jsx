import React, { useEffect } from "react";
import Navbar from "../../../components/navbar/Navbar";
import MainFooter from "../../../components/footer/Footer";

const ClientRules = () => {
  useEffect(() => {
    document.title = "Peraturan untuk Pembeli - SeniKita";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const rules = [
    {
      title: "Akun dan Keamanan",
      description:
        "Pastikan Anda menggunakan informasi yang valid saat mendaftar. Keamanan akun adalah tanggung jawab Anda, termasuk menjaga kerahasiaan kata sandi.",
    },
    {
      title: "Pemesanan Produk dan Jasa",
      description:
        "Pastikan untuk membaca deskripsi produk atau jasa dengan teliti sebelum memesan. Harga, waktu pengerjaan, dan detail lain akan dijelaskan oleh seniman.",
    },
    {
      title: "Pembayaran",
      description:
        "Gunakan metode pembayaran yang tersedia di platform. SeniKita tidak bertanggung jawab atas transaksi di luar sistem pembayaran resmi.",
    },
    {
      title: "Kebijakan Pembatalan",
      description:
        "Pembatalan pesanan hanya diperbolehkan sebelum pesanan dikonfirmasi oleh seniman. Setelah dikonfirmasi, pembatalan tidak dapat dilakukan.",
    },
    {
      title: "Penerimaan Pesanan",
      description:
        "Pastikan untuk memeriksa pesanan Anda saat diterima. Jika terdapat masalah, segera hubungi seniman melalui fitur pesan pada platform.",
    },
    {
      title: "Ulasan dan Penilaian",
      description:
        "Berikan ulasan yang jujur dan konstruktif setelah menerima pesanan. Ulasan membantu meningkatkan kualitas layanan di platform.",
    },
    {
      title: "Larangan",
      description:
        "Dilarang melakukan tindakan yang melanggar hukum, seperti penipuan, penggunaan bahasa kasar, atau pelanggaran hak cipta. Pelanggaran dapat menyebabkan akun Anda diblokir.",
    },
  ];

  return (
    <div>
      <Navbar />
      <header className="bg-gradient-to-r from-primary to-tertiary p-16">
        <div className="container text-center text-white space-y-2">
          <h1 className="lg:text-4xl text-3xl font-crimson">
            Peraturan untuk Pembeli
          </h1>
          <p className="lg:text-lg text-sm">
            Harap baca dan pahami peraturan berikut untuk pengalaman transaksi
            yang aman dan nyaman.
          </p>
        </div>
      </header>
      <div className="py-10 px-6">
        <div className="container space-y-6">
          {rules.map((rule, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-10 h-10 border border-primary rounded-full text-primary font-semibold">
                {index + 1}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-primary mb-2">
                  {rule.title}
                </h2>
                <p className="text-gray-700">{rule.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default ClientRules;
