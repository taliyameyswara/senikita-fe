import React, { useEffect } from "react";
import Navbar from "../../../components/navbar/Navbar";
import MainFooter from "../../../components/footer/Footer";

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Kebijakan Privasi - SeniKita";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Data kebijakan privasi
  const policies = [
    {
      title: "Kebijakan Privasi",
      description:
        "Kami menghargai privasi pengguna kami. Informasi pribadi yang Anda berikan akan kami jaga kerahasiaannya. Kami hanya akan menggunakan informasi tersebut untuk kepentingan transaksi jual-beli di platform kami.",
    },
    {
      title: "Keamanan Data",
      description:
        "Kami menggunakan sistem keamanan terbaik untuk melindungi data pengguna kami. Namun, kami tidak bertanggung jawab atas kerugian yang disebabkan oleh pihak ketiga.",
    },
    {
      title: "Penggunaan Data",
      description:
        "Kami hanya akan menggunakan data pengguna untuk kepentingan transaksi jual-beli di platform kami. Data pengguna tidak akan disalahgunakan atau disebarkan ke pihak ketiga.",
    },
  ];

  return (
    <div>
      <Navbar />
      <header className="bg-gradient-to-r from-primary to-tertiary p-16">
        <div className="container text-center text-white space-y-2">
          <h1 className="lg:text-4xl text-3xl font-crimson">
            Kebijakan Privasi
          </h1>
          <p className="lg:text-lg text-sm">
            Harap baca dan pahami peraturan berikut untuk pengalaman jual beli
            yang aman dan nyaman.
          </p>
        </div>
      </header>
      <div className="py-10 px-6">
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.map((policy, index) => (
            <div key={index} className="bg-white shadow-md rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-primary mb-2">
                {policy.title}
              </h2>
              <p className="text-gray-700">{policy.description}</p>
            </div>
          ))}
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default PrivacyPolicy;
