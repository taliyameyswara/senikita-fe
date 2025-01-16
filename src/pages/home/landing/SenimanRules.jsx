import React, { useEffect } from "react";
import Navbar from "../../../components/navbar/Navbar";
import MainFooter from "../../../components/footer/Footer";

const SenimanRules = () => {
  useEffect(() => {
    document.title = "Peraturan untuk Seniman - SeniKita";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const rules = [
    {
      title: "Akun dan Keamanan",
      description:
        "Pastikan informasi akun Anda valid dan lengkap. Jaga kerahasiaan akun serta data pribadi untuk keamanan transaksi.",
    },
    {
      title: "Deskripsi Produk dan Jasa",
      description:
        "Pastikan untuk memberikan deskripsi produk atau jasa yang jelas, akurat, dan tidak menyesatkan. Detail yang lengkap membantu pembeli memahami penawaran Anda.",
    },
    {
      title: "Komunikasi dengan Pembeli",
      description:
        "Tanggapi pesan dan pertanyaan pembeli dengan sopan dan profesional. Komunikasi yang baik meningkatkan kepercayaan dan kepuasan pembeli.",
    },
    {
      title: "Proses Pemesanan",
      description:
        "Selesaikan pesanan sesuai dengan deskripsi dan waktu yang telah disepakati. Pastikan hasil akhir sesuai dengan permintaan pembeli.",
    },
    {
      title: "Pembayaran",
      description:
        "Gunakan sistem pembayaran resmi yang disediakan oleh platform. Hindari transaksi di luar platform untuk keamanan bersama.",
    },
    {
      title: "Kebijakan Pembatalan",
      description:
        "Jika pembeli membatalkan pesanan sebelum konfirmasi, hormati kebijakan tersebut. Jika pesanan sudah dikonfirmasi, berikan alasan jelas untuk pembatalan jika diperlukan.",
    },
    {
      title: "Kepuasan dan Ulasan",
      description:
        "Berikan layanan terbaik untuk mendapatkan ulasan positif. Ulasan memengaruhi reputasi Anda di platform.",
    },
    {
      title: "Larangan",
      description:
        "Dilarang menjual produk atau jasa yang melanggar hukum, hak cipta, atau ketentuan platform. Pelanggaran dapat menyebabkan akun Anda diblokir.",
    },
  ];

  return (
    <div>
      <Navbar />
      <header className="bg-gradient-to-r from-primary to-tertiary p-16">
        <div className="container text-center text-white space-y-2">
          <h1 className="lg:text-4xl text-3xl font-crimson">
            Peraturan untuk Seniman
          </h1>
          <p className="lg:text-lg text-sm">
            Harap baca dan pahami peraturan berikut untuk pengalaman jual beli
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

export default SenimanRules;
