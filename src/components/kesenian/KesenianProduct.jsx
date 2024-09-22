import { IoAddOutline, IoCartOutline, IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";
import PriceInput from "../form-input/PriceInput";
import TextInput from "../form-input/TextInput";
import { IoMdHeart } from "react-icons/io";
import { BsPencil } from "react-icons/bs";

const KesenianProduct = () => {
  // Dummy product data
  const [products, setProducts] = useState([
    {
      id: 1,
      thumbnail: "https://via.placeholder.com/100",
      name: "Lukisan Pemandangan",
      category: "Seni Rupa",
      likes: 120,
      cartCount: 50,
      price: 500000,
      stock: 10,
      isActive: true,
    },
  ]);

  const handleToggle = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, isActive: !product.isActive }
          : product
      )
    );
  };

  const handleInputChange = (e, id, field) => {
    const value = e.target.value;
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="">
          <h2 className="text-lg font-semibold">Produk Kesenian</h2>
          <p>Daftar produk kesenian yang tersedia</p>
        </div>

        <Link to="/seniman/dashboard/kesenian/addproduct">
          <div className="flex gap-2">
            <div className="flex gap-2 items-center bg-primary text-white px-4 py-2 rounded-xl">
              <div className="">
                <IoAddOutline />
              </div>
              <div className="">
                <div className="">Tambah Produk</div>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="overflow-x-auto mt-5 bg-white border rounded-xl">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="p-4 text-left border-b">Info Produk</th>
              <th className="p-4 text-left border-b">Statistik</th>
              <th className="p-4 text-left border-b">Harga</th>
              <th className="p-4 text-left border-b">Stok</th>
              <th className="p-4 text-left border-b">Status</th>
              <th className="p-4 text-left border-b">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="text-sm">
                {/* Info Produk */}
                <td className="p-4 border-b">
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-gray-500">{product.category}</div>
                    </div>
                  </div>
                </td>

                {/* Statistik */}
                <td className="p-4 border-b">
                  <div className="flex flex-col font-nunito font-light">
                    <div className="flex items-center gap-1">
                      <IoMdHeart className="text-customRed text-xl" />
                      <span className="mr-2">{product.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IoCartOutline className="text-xl text-gray-500" />
                      <span className="mr-2">{product.cartCount}</span>
                    </div>
                  </div>
                </td>

                {/* Harga */}
                <td className="p-4 border-b">
                  <PriceInput
                    value={product.price}
                    onChange={(e) => handleInputChange(e, product.id, "price")}
                  />
                </td>

                {/* Stok */}
                <td className="p-4 border-b">
                  <TextInput
                    type="number"
                    value={product.stock}
                    onChange={(e) => handleInputChange(e, product.id, "stock")}
                  />
                </td>

                {/* Status */}
                <td className="p-4 border-b">
                  <button
                    onClick={() => handleToggle(product.id)}
                    className="w-[9.8rem] h-9 border rounded-xl flex items-center p-1 cursor-pointer relative"
                  >
                    <div
                      className={`absolute top-0 border-[0.5px] left-0 h-full w-1/2 rounded-xl transition-transform duration-300 ${
                        product.isActive
                          ? "translate-x-full bg-tertiary/10"
                          : "bg-tertiary/10"
                      }`}
                    ></div>
                    <span
                      className={`w-1/2 text-center z-10 text-sm font-semibold mr-1 ${
                        product.isActive ? "text-gray-400" : "text-primary"
                      }`}
                    >
                      Nonaktif
                    </span>
                    <span
                      className={`w-1/2 text-center z-10 text-sm font-semibold ${
                        product.isActive ? "text-primary" : "text-gray-400"
                      }`}
                    >
                      Aktif
                    </span>
                  </button>
                </td>

                {/* Aksi */}
                <td className="p-4 border-b">
                  <div className="flex space-x-2">
                    <Link to={`/seniman/dashboard/kesenian/updateproduct`}>
                      <button className="text-primary hover:text-primary/90 p-2 bg-tertiary/10 rounded-xl">
                        <BsPencil size={20} />
                      </button>
                    </Link>
                    <button className="text-customRed hover:text-customRed/90 p-2 bg-customRed/10 rounded-xl">
                      <IoTrashOutline size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KesenianProduct;
