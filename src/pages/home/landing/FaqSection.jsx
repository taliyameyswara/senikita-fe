import { useState, useRef } from "react";
import Heading from "../../../components/Heading";
import { IoChevronDownOutline } from "react-icons/io5";
import FaqImage from "../../../assets/home/faq.png";

const FaqSection = () => {
  const [openQuestion, setOpenQuestion] = useState(null);
  const answerRefs = useRef([]);

  const faqs = [
    {
      question: "Apa itu Senikita?",
      answer:
        "Senikita merupakan marketplace pertama yang mempertemukan produk dan jasa kesenian di Indonesia. Platform ini menjadi tempat untuk menemukan berbagai karya seni dan layanan dari seniman lokal di Indonesia.",
    },
    {
      question: "Bagaimana cara membuat akun di Senikita?",
      answer:
        "Anda bisa membuat akun dengan mendaftarkan email atau nomor telepon di halaman pendaftaran Senikita, lalu mengikuti langkah-langkah yang diberikan.",
    },
    {
      question: "Apa jenis produk dan jasa yang tersedia di Senikita?",
      answer:
        "Di Senikita, Anda bisa menemukan berbagai karya seni rrupa, musik, tari, seni pertunjukan, serta layanan seperti pelatihan, konsultasi seni, dan lainnya.",
    },
    {
      question: "Bagaimana cara melakukan pembayaran di Senikita?",
      answer:
        "Senikita mendukung berbagai metode pembayaran termasuk transfer bank, e-wallet, dan kartu kredit untuk memudahkan transaksi Anda.",
    },
  ];

  const handleToggle = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <section className="py-10 pb-20 container">
      {/* Grid layout */}
      <div className="grid md:grid-cols-2 grid-cols-1">
        {/* FAQ Section */}
        <div className="">
          <div className="ml-5 pb-1">
            <Heading title={"Pertanyaan Yang Sering Ditanyakan"} />
          </div>
          <div className="space-y-4 ">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`transition-all duration-300 border-b border-gray-200 cursor-pointer rounded-xl`}
              >
                <button
                  type="button"
                  className="flex items-center justify-between w-full px-4 py-3 sm:p-4"
                  onClick={() => handleToggle(index)}
                >
                  <span className="flex text-start text-lg font-semibold">
                    {faq.question}
                  </span>
                  <IoChevronDownOutline
                    className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
                      openQuestion === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  ref={(el) => (answerRefs.current[index] = el)}
                  style={{
                    maxHeight:
                      openQuestion === index
                        ? `${answerRefs.current[index]?.scrollHeight}px`
                        : "0px",
                  }}
                  className={`overflow-hidden transition-max-height duration-500 ease-in-out`}
                >
                  <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 text-base mt-9">
            Tidak menemukan jawaban yang Anda cari?{" "}
            <a
              href="#"
              title=""
              className="font-medium text-primary transition-all duration-200 hover:text-tertiary focus:text-tertiary hover:underline"
            >
              Hubungi tim dukungan kami
            </a>
          </p>
        </div>

        <div className="hidden md:block">
          <img
            src={FaqImage}
            className="object-cover w-full h-full"
            alt="FAQ"
            style={{ userSelect: "none", pointerEvents: "none" }}
          />
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
