
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

const ProductOrder = () => {
  const [product, setProduct] = useState({
    storeName: "Toko Kesenian",
    storeAvatar: "https://via.placeholder.com/100",
    storeLocation: "Bandung",
    productName: "Lukisan Abstrak Khas Jawa Barat",
    productThumbnail:
      "https://cdngnfi2.sgp1.cdn.digitaloceanspaces.com/gnfi/uploads/images/2022/11/0715042022-Lukisan-Balinese-Procession-karya-Lee-Man-Fong-menjadi-salah-satu-lukisan-terkenal-dunia-asal-Indonesia-Good-News-From-Indonesia.jpg",
    productPrice: 1500000,
  });

  const [address, setAddress] = useState({
    label: "Rumah",
    name: "Mimoi",
    phone: "08123456789",
    street: "Jl. Kebon Jeruk No 7 Blok F",
    zipCode: "61314",
    city: "Bandung",
    district: "Cibaduyut",
    province: "Jawa Barat",
    note: "Rumah warna hijau pager oren", //optional
  });

  const [totalPrice, setTotalPrice] = useState(product.productPrice);
  const [isNotesVisible, setNotesVisible] = useState(false);
  const [notesValue, setNotesValue] = useState("");
  const handleNotesButton = () => setNotesVisible(!isNotesVisible);
  const handleNotesChange = (e) => setNotesValue(e.target.value);
  const [shippingCost, setShippingCost] = useState(0);
  const serviceFee = 5000;

  return (
    <div>
      <Navbar />
      <div className="container p-6 mx-auto">
        <div className="grid grid-cols-1 gap-10 mb-6 lg:grid-cols-5 ">
          {/* Info Produk */}
          <div className="col-span-3 space-y-5">
            <div className="p-4 border rounded-xl">
              {/* Toko */}
              <div className="flex items-center gap-2">
                <img
                  src={product.storeAvatar}
                  alt={product.storeName}
                  className="w-8 h-8 rounded-lg"
                />
                <div>
                  <h2 className="text-sm">{product.storeName}</h2>
                  <h2 className="text-xs text-gray-500">
                    {product.storeLocation}
                  </h2>
                </div>
              </div>

              {/* Produk */}
              <ProductOrderCard
                product={product}
                setTotalPrice={setTotalPrice}
              />
              <div className="flex flex-wrap w-full gap-2">
                <div>
                  <button
                    className="flex gap-1 items-center text-primary font-semibold text-sm hover:bg-tertiary/10 px-4 py-2 rounded-xl transition-transform duration-150 hover:scale-100 transform scale-[.98] border-[0.5px] border-primary "
                    onClick={handleNotesButton}
                  >
                    <IoAddOutline />
                    <div>Tambah catatan untuk Toko Kesenian</div>
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

            <div className="mb-6">
              <h3 className="text-base font-semibold">Alamat Anda</h3>
              {address ? (
                <CustomerAddress address={address} isOrder={true} />
              ) : (
                <>
                  <p className="text-gray-500">Belum ada alamat</p>
                  <div className="mt-2">
                    <button className="p-3 py-2 text-sm font-semibold transition duration-100 border border-primary text-primary hover:bg-primary hover:text-white rounded-xl">
                      Tambah Alamat
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-span-2">
            <OrderSummary
              productTotal={totalPrice}
              shippingCost={shippingCost}
              serviceFee={serviceFee}
            />
            <button className="w-full py-3 mt-6 font-semibold text-white bg-primary rounded-xl">
              Checkout
            </button>
          </div>
        </div>

        <FooterLogo />
      </div>
    </div>
  );
};

export default ProductOrder;
