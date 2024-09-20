import { IoAddOutline, IoCartOutline, IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";
import PriceInput from "../form-input/PriceInput";
import TextInput from "../form-input/TextInput";
import { IoMdHeart } from "react-icons/io";
import { BsPencil } from "react-icons/bs";

const KesenianService = () => {
  // Dummy service data
  const [services, setServices] = useState([
    {
      id: 1,
      thumbnail: "https://via.placeholder.com/100", // Example image
      name: "Lukis Mural Jogja",
      category: "Jasa Seni Rupa",
      likes: 80,
      // cartCount: 30,
      price: 2000000,
      isActive: true,
    },
  ]);

  const handleToggle = (id) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id
          ? { ...service, isActive: !service.isActive }
          : service
      )
    );
  };

  const handleInputChange = (e, id, field) => {
    const value = e.target.value;
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id ? { ...service, [field]: value } : service
      )
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="">
          <h2 className="text-lg font-semibold">Jasa Kesenian</h2>
          <p>Daftar layanan jasa kesenian yang tersedia</p>
        </div>

        <Link to="/seniman/dashboard/kesenian/addservice">
          <div className="flex gap-2">
            <div className="flex gap-2 items-center bg-primary text-white px-4 py-2 rounded-xl">
              <div className="">
                <IoAddOutline />
              </div>
              <div className="">
                <div className="">Tambah Jasa</div>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="overflow-x-auto mt-5 bg-white border rounded-xl">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="p-4 text-left border-b">Info Jasa</th>
              <th className="p-4 text-left border-b">Statistik</th>
              <th className="p-4 text-left border-b">Harga</th>
              <th className="p-4 text-left border-b">Status</th>
              <th className="p-4 text-left border-b">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="text-sm">
                {/* Info Layanan */}
                <td className="p-4 border-b">
                  <div className="flex items-center space-x-4">
                    <img
                      src={service.thumbnail}
                      alt={service.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <div className="font-semibold">{service.name}</div>
                      <div className="text-gray-500">{service.category}</div>
                      <div className="text-gray-500">{service.description}</div>
                    </div>
                  </div>
                </td>

                {/* Statistik */}
                <td className="p-4 border-b">
                  <div className="flex flex-col font-nunito font-light">
                    <div className="flex items-center gap-1">
                      <IoMdHeart className="text-customRed text-xl" />
                      <span className="mr-2">{service.likes}</span>
                    </div>
                  </div>
                </td>

                {/* Harga */}
                <td className="p-4 border-b">
                  <PriceInput
                    value={service.price}
                    onChange={(e) => handleInputChange(e, service.id, "price")}
                  />
                </td>

                {/* Status */}
                <td className="p-4 border-b">
                  <button
                    onClick={() => handleToggle(service.id)}
                    className="w-[9.8rem] h-9 border rounded-xl flex items-center p-1 cursor-pointer relative"
                  >
                    <div
                      className={`absolute top-0 border left-0 h-full w-1/2 rounded-xl transition-transform duration-300 ${
                        service.isActive
                          ? "translate-x-full bg-tertiary/10"
                          : "bg-tertiary/10"
                      }`}
                    ></div>
                    <span
                      className={`w-1/2 text-center z-10 text-sm font-semibold mr-1 ${
                        service.isActive ? "text-gray-400" : "text-primary"
                      }`}
                    >
                      Nonaktif
                    </span>
                    <span
                      className={`w-1/2 text-center z-10 text-sm font-semibold ${
                        service.isActive ? "text-primary" : "text-gray-400"
                      }`}
                    >
                      Aktif
                    </span>
                  </button>
                </td>

                {/* Aksi */}
                <td className="p-4 border-b">
                  <div className="flex space-x-2">
                    <Link to={`/seniman/dashboard/kesenian/updateservice`}>
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

export default KesenianService;
