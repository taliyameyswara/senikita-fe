import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { BsEnvelope } from "react-icons/bs";
import FooterLogo from "./FooterLogo";

const MainFooter = () => {
  return (
    <>
      <hr />
      <div className=" container border-gray-200">
        <footer className="bg-white py-10 w-full">
          <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* col 1 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Kategori</h3>
              <ul className="space-y-2 text-gray-500 ">
                <li>Seni Tari</li>
                <li>Seni Dll</li>
              </ul>
            </div>

            {/* col 2 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Info SeniKita</h3>
              <ul className="space-y-2 text-gray-500">
                <li>Tentang SeniKita</li>
                <li>Blog</li>
              </ul>
            </div>

            {/* col 3 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Penggunaan</h3>
              <ul className="space-y-2 text-gray-500">
                <li>Cara Kerja Pembeli</li>
                <li>Cara Penyedia Kesenian</li>
                <li>Peraturan Pembeli</li>
                <li>Peraturan Penyedia Kesenian</li>
                <li>Kebijakan Privasi</li>
              </ul>
            </div>

            {/* col 4 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Care</h3>
              <ul className="space-y-2 text-gray-500">
                <li>
                  <FaWhatsapp className="inline mr-2" /> 09834912
                </li>
                <li>
                  <BsEnvelope className="inline mr-2" />
                  senikita@gmail.com
                </li>
                <li>
                  <FaInstagram className="inline mr-2" /> @senikita
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
