import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { BsEnvelope } from "react-icons/bs";
import FooterLogo from "./FooterLogo";
import { Link } from "react-router-dom";

const MainFooter = () => {
  return (
    <>
      <hr />
      <div className=" container border-gray-200">
        <footer className="bg-white pt-10 w-full">
          <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* col 1 */}
            <div>
              <h3 className="lg:text-lg text-base font-semibold mb-4">
                Kategori
              </h3>
              <ul className="space-y-2 text-gray-500 text-sm lg:text-base">
                <li>Seni Tari</li>
                <li>Seni Musik</li>
                <li>Seni Kriya</li>
              </ul>
            </div>

            {/* col 2 */}
            <div>
              <h3 className="lg:text-lg text-base font-semibold mb-4">
                Info SeniKita
              </h3>
              <ul className="space-y-2 text-gray-500 text-sm lg:text-base">
                <Link to="/">
                  <li>Tentang SeniKita</li>
                </Link>
                <Link to="/">
                  <li>Tentang Developer</li>
                </Link>
              </ul>
            </div>

            {/* col 3 */}
            <div>
              <h3 className="lg:text-lg text-base font-semibold mb-4">
                Penggunaan
              </h3>
              <ul className="space-y-2 text-gray-500 text-sm lg:text-base">
                <Link to="/">
                  <li>Cara Kerja Pembeli</li>
                </Link>
                <Link to="/">
                  <li>Cara Menjadi Seniman</li>
                </Link>
                <Link to="/">
                  <li>Peraturan Pembeli</li>
                </Link>
                <Link to="/">
                  <li>Peraturan Penyedia Kesenian</li>
                </Link>
                <Link to="/">
                  <li>Kebijakan Privasi</li>
                </Link>
              </ul>
            </div>

            {/* col 4 */}
            <div>
              <h3 className="lg:text-lg text-base font-semibold mb-4">
                Customer Care
              </h3>
              <ul className="space-y-2 text-gray-500 text-sm lg:text-base">
                <li className="font-nunito font-light">
                  <a href="https://wa.link/6zdmdl">
                    <FaWhatsapp className="inline mr-2" /> 087827776565
                  </a>
                </li>
                <li>
                  <BsEnvelope className="inline mr-2" />
                  officialsenikita@gmail.com
                </li>
                <li>
                  <a href="https://www.instagram.com/officialsenikita/">
                    <FaInstagram className="inline mr-2" /> @senikita
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <FooterLogo />
        </footer>
      </div>
    </>
  );
};

export default MainFooter;
