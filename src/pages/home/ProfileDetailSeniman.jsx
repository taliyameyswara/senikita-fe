import React from "react";
import Navbar from "../../components/navbar/Navbar";
import MainFooter from "../../components/footer/Footer";
// import ScrollTab from "../../components/ScrollTab";
import ProductList from "../../components/card/ProductList";
import Review from "../../components/review/Review";
import { FaStar } from "react-icons/fa";
import Tabs from "../../components/Tabs";

const ProfileDetailSeniman = () => {
  const tabs = [
    // nama, deskripsi, address, avatar, kota, provinsi,
    // rating, jumlah produk, jumlah jasa, jumlah ulasan
    {
      name: "product",
      label: "Produk Kesenian",
      content: (
        <>
          {/* <ProductList
            title={"Produk dari Seniman"}
            products={products}
            type={"Product"}
          /> */}
        </>
      ),
    },

    {
      name: "service",
      label: "Jasa Kesenian",
      content: (
        <>
          {/* <ProductList
            title={"Jasa dari Seniman"}
            products={products}
            type={"Product"}
          /> */}
        </>
      ),
    },

    {
      name: "review",
      label: "Ulasan",
      content: (
        // <Review review={review} />
        <></>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="pt-5">
          <div className="">
            <div className="p-6 mb-3 bg-white border rounded-xl">
              <div className="flex items-center gap-4 text-sm">
                <img
                  src={`https://via.placeholder.com/100`}
                  alt={`Avatar`}
                  className="object-cover w-16 h-16 rounded-full"
                />
                <div className="flex flex-wrap justify-between w-full">
                  <div>
                    <div className="text-lg font-semibold">Nama Seniman</div>
                    <div className="text-gray-600">Kota Semarang</div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <div className="">
                      <div className="">
                        <div className="flex items-center justify-center gap-2 ">
                          <FaStar className="text-yellow-500 text-lg" />
                          <div className="text-lg font-nunito font-bold text-center">
                            5.0
                          </div>
                        </div>
                        <div className="text-gray-400 text-xs text-center">
                          Rating & Ulasan
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <div className="text-lg font-nunito font-bold text-center">
                          10
                        </div>
                        <div className="text-gray-400 text-xs text-center">
                          Jumlah Produk
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <div className="text-lg font-nunito font-bold text-center">
                          10
                        </div>
                        <div className="text-gray-400 text-xs text-center">
                          Jumlah Jasa
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Ducimus doloribus, eius aperiam aspernatur numquam aut similique
                debitis accusamus, architecto rem quidem? Fuga cum dignissimos
                beatae odio voluptas molestiae ullam architecto?
              </div>
            </div>
          </div>
        </div>
        <div className="pt-[0.5px]">
          <Tabs tabs={tabs} />
        </div>
        <MainFooter />
      </div>
    </>
  );
};

export default ProfileDetailSeniman;
