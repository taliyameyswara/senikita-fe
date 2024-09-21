import React, { useState } from "react";
import { Link } from "react-router-dom";
import TotalCounter from "../../components/TotalCounter";
import ShippingOptions from "../../components/orders/ShippingOptions";
import OrderSummary from "../../components/orders/OrderSummary";
import CustomerAddress from "../../components/orders/CustomerAddress";
// import AddressModal from "../../components/orders/AddressModal";
import Navbar from "../../components/navbar/Navbar";
import FooterLogo from "../../components/footer/FooterLogo";
import { formatNumber } from "../../utils/formatNumber";

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
    name: "Mimoi",
    phone: "08123456789",
    street: "Jl. Kebon Jeruk No 7 Blok F",
    zipCode: "61314",
    city: "Bandung",
    district: "Cibaduyut",
    province: "Jawa Barat",
    note: "Rumah warna hijau pager oren", //optional
  });

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.productPrice);
  const [showModal, setShowModal] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    setTotalPrice(newQuantity * product.productPrice);
  };

  const [shippingCost, setShippingCost] = useState(0);
  const serviceFee = 5000;

  return (
    <div className="">
      <Navbar />
      <div className="container mx-auto p-6">
        {/* Detail Produk */}
        <div className="grid lg:grid-cols-5 grid-cols-1  gap-10 mb-6 ">
          {/* Info Produk */}
          <div className="col-span-3 space-y-5">
            <div className="border rounded-xl p-4">
              {/* Toko */}
              <div className="flex gap-2 items-center">
                <img
                  src={product.storeAvatar}
                  alt={product.storeName}
                  className="w-8 h-8 rounded-full"
                />
                <div className="">
                  <h2 className="text-sm ">{product.storeName}</h2>
                  <h2 className="text-xs text-gray-500">
                    {product.storeLocation}
                  </h2>
                </div>
              </div>
              {/* Produk */}
              <div className="flex items-center space-x-4 mt-1 ">
                <img
                  src={product.productThumbnail}
                  alt={product.productName}
                  className="w-36 h-24 object-cover rounded-lg"
                />
                <div className="flex flex-col gap-3">
                  <div className="">
                    <h3 className="text-lg">{product.productName}</h3>
                    <p className="font-nunito text-light font-semibold">
                      {formatNumber(product.productPrice)}
                    </p>
                  </div>
                  <TotalCounter
                    productPrice={product.productPrice}
                    quantity={quantity}
                    onQuantityChange={handleQuantityChange}
                  />
                </div>
              </div>
            </div>
            {/* alamat */}
            <div className="mb-6 border rounded-xl p-4">
              <h3 className="text-lg font-semibold">Alamat</h3>
              {address ? (
                <CustomerAddress address={address} />
              ) : (
                <>
                  <p className="text-gray-500">Belum ada alamat</p>
                  <div className="mt-3">
                    <Link
                      to="/user/dashboard/profile"
                      className="border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition duration-100 p-3 py-2 rounded-xl text-sm"
                    >
                      Tambah Alamat
                    </Link>
                  </div>
                </>
              )}
              <hr className="my-4" />

              <div className="">
                <ShippingOptions onShippingCostChange={setShippingCost} />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-span-2">
            <OrderSummary
              productTotal={totalPrice}
              shippingCost={shippingCost}
              serviceFee={serviceFee}
            />
            {/* Button Checkout */}
            <button className="w-full mt-6 bg-primary text-white py-3 rounded-xl font-semibold">
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
