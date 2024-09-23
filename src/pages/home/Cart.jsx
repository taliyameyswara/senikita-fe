import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShippingOptions from "../../components/orders/ShippingOptions";
import OrderSummary from "../../components/orders/OrderSummary";
import CustomerAddress from "../../components/orders/CustomerAddress";
import { IoAddOutline } from "react-icons/io5";
import Navbar from "../../components/navbar/Navbar";
import FooterLogo from "../../components/footer/FooterLogo";
import TextareaInput from "../../components/form-input/TextareaInput";
import ProductOrderCard from "../../components/orders/ProductOrderCard";
import Heading from "../../components/Heading";
import { CgNotes } from "react-icons/cg";

const Cart = () => {
  const [products, setProducts] = useState([
    {
      storeName: "Toko Kesenian",
      storeAvatar: "https://via.placeholder.com/100",
      storeLocation: "Bandung",
      productName: "Lukisan Abstrak Khas Jawa Barat",
      productThumbnail:
        "https://cdngnfi2.sgp1.cdn.digitaloceanspaces.com/gnfi/uploads/images/2022/11/0715042022-Lukisan-Balinese-Procession-karya-Lee-Man-Fong-menjadi-salah-satu-lukisan-terkenal-dunia-asal-Indonesia-Good-News-From-Indonesia.jpg",
      productPrice: 1500000,
    },
    {
      storeName: "Toko Kesenian",
      storeAvatar: "https://via.placeholder.com/100",
      storeLocation: "Bandung",
      productName: "Patung Kayu Khas Jawa",
      productThumbnail:
        "https://cdngnfi2.sgp1.cdn.digitaloceanspaces.com/gnfi/uploads/images/2022/11/0715042022-Lukisan-Balinese-Procession-karya-Lee-Man-Fong-menjadi-salah-satu-lukisan-terkenal-dunia-asal-Indonesia-Good-News-From-Indonesia.jpg",
      productPrice: 500000,
    },
    {
      storeName: "Toko Seni Bali",
      storeAvatar: "https://via.placeholder.com/100",
      storeLocation: "Denpasar",
      productName: "Lukisan Pemandangan Bali",
      productThumbnail:
        "https://cdngnfi2.sgp1.cdn.digitaloceanspaces.com/gnfi/uploads/images/2022/11/0715042022-Lukisan-Balinese-Procession-karya-Lee-Man-Fong-menjadi-salah-satu-lukisan-terkenal-dunia-asal-Indonesia-Good-News-From-Indonesia.jpg",
      productPrice: 2000000,
    },
  ]);

  const [address, setAddress] = useState({
    name: "Mimoi",
    phone: "08123456789",
    street: "Jl. Kebon Jeruk No 7 Blok F",
    zipCode: "61314",
    city: "Bandung",
    district: "Cibaduyut",
    province: "Jawa Barat",
    note: "Rumah warna hijau pager oren", //optional
  });

  const [totalPrice, setTotalPrice] = useState(
    products.reduce((total, product) => total + product.productPrice, 0)
  );
  const [isNotesVisible, setNotesVisible] = useState(false);
  const [notesValue, setNotesValue] = useState("");
  const handleNotesButton = () => setNotesVisible(!isNotesVisible);

  const handleNotesChange = (e) => setNotesValue(e.target.value);
  const [shippingCost, setShippingCost] = useState(0);
  const serviceFee = 5000;

  const groupedProducts = products.reduce((groups, product) => {
    if (!groups[product.storeName]) {
      groups[product.storeName] = [];
    }
    groups[product.storeName].push(product);
    return groups;
  }, {});

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <Heading title="3 item di keranjang Anda" />
        <div className="grid lg:grid-cols-5 grid-cols-1 gap-10 mb-6">
          {/* Info Produk */}
          <div className="col-span-3 space-y-5">
            {/* Toko Produk */}
            {Object.keys(groupedProducts).map((storeName, index) => (
              <div key={index} className="border rounded-xl p-4">
                {/* Info Toko */}
                <div className="flex gap-2 items-center">
                  <img
                    src={groupedProducts[storeName][0].storeAvatar}
                    alt={storeName}
                    className="w-8 h-8 rounded-lg"
                  />
                  <div>
                    <h2 className="text-sm">{storeName}</h2>
                    <h2 className="text-xs text-gray-500">
                      {groupedProducts[storeName][0].storeLocation}
                    </h2>
                  </div>
                </div>

                {/* Produk */}
                {groupedProducts[storeName].map((product, idx) => (
                  <ProductOrderCard
                    key={idx}
                    product={product}
                    setTotalPrice={setTotalPrice}
                  />
                ))}

                <div className="flex flex-wrap gap-2">
                  <div>
                    <button
                      className="flex gap-1 items-center text-primary font-semibold text-sm hover:bg-tertiary/10 px-4 py-2 rounded-xl transition-transform duration-150 hover:scale-100 transform scale-[.98] border-[0.5px] border-primary"
                      onClick={handleNotesButton}
                    >
                      <CgNotes />
                      <div>Tambah catatan untuk {storeName}</div>
                    </button>

                    {isNotesVisible && (
                      <div className="mt-1">
                        <TextareaInput
                          label="Catatan"
                          placeholder="Masukkan catatan Anda di sini..."
                          value={notesValue}
                          name="catatan"
                          onChange={handleNotesChange}
                          rows={3}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <ShippingOptions onShippingCostChange={setShippingCost} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          {/* make it fixed */}
          <div className="col-span-2 sticky top-20 ">
            <OrderSummary
              productTotal={totalPrice}
              shippingCost={shippingCost}
              serviceFee={serviceFee}
            />
            <button className="w-full mt-6 bg-primary text-white py-3 rounded-xl font-semibold">
              Beli <span className="font-nunito">({products.length})</span>
            </button>
          </div>
        </div>

        <FooterLogo />
      </div>
    </div>
  );
};

export default Cart;
