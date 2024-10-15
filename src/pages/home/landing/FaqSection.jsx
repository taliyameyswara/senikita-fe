import { useState, useRef } from "react";
import Heading from "../../../components/Heading";
import { IoChevronDownOutline } from "react-icons/io5";
import FaqImage from "/assets/home/faq.png";

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
        "Anda bisa membuat akun dengan mendaftarkan email di halaman pendaftaran Senikita, lalu mengikuti langkah-langkah yang diberikan.",
    },
    {
      question: "Apa jenis produk dan jasa yang tersedia di Senikita?",
      answer:
        "Di Senikita, Anda bisa menemukan berbagai karya seni rupa, musik, tari, seni pertunjukan, serta layanan seperti pelatihan, konsultasi seni, dan lainnya.",
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
    <section className="container pb-20">
      {/* Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* FAQ Section */}
        <div className="">
          <div className="pb-1 ml-4">
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
                  <span className="flex text-base font-semibold text-start md:text-lg">
                    {faq.question}
                  </span>
                  <IoChevronDownOutline
                    className={`md:text-lg text-base text-gray-400 transition-transform duration-300 ${openQuestion === index ? "rotate-180" : ""
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
                  <div className="px-4 pb-5 text-sm sm:px-6 sm:pb-6 md:text-base">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="px-4 text-base text-gray-600 mt-9">
            Tidak menemukan jawaban yang Anda cari?{" "}
            <a
              href="#"
              title=""
              className="font-medium transition-all duration-200 text-primary hover:text-tertiary focus:text-tertiary hover:underline"
            >
              Hubungi tim dukungan kami
            </a>
          </p>
        </div>

        <div className="mt-10 lg:mt-0">
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
