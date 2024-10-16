import { IoAddOutline, IoCartOutline, IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PriceInput from "../../../../components/form-input/PriceInput";
import TextInput from "../../../../components/form-input/TextInput";
import { IoMdHeart } from "react-icons/io";
import { BsPencil } from "react-icons/bs";
import { useAxiosInstance } from "../../../../config/axiosConfig";
import DeleteModal from "../../../../components/modal/DeleteModal";
import { toast } from "react-toastify";
import EmptyState from "../../../../components/EmptyState";
import { useManagementServiceApi } from "../../../../api/shop/ManagementServiceApi";
import Spinner from "../../../../components/loading/Spinner";

const KesenianService = ({ setProgress }) => {
  const axiosInstance = useAxiosInstance();
  const { deleteService, getAllServices } = useManagementServiceApi();

  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceIdToDelete, setServiceIdToDelete] = useState(null);

  const handleDelete = async (id) => {
    setLoading(true);
    setProgress(30);
    try {
      const response = await deleteService(id);
      if (response.status === "success") {
        setServices((prevServices) =>
          prevServices.filter((service) => service.id !== id)
        );
        setProgress(30);
        toast.success("Produk berhasil dihapus");
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus produk");
    } finally {
      setIsModalOpen(false);
      setLoading(false);
      setProgress(100);
    }

  };

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

  const fetchServices = async () => {
    try {
      const response = await getAllServices();
      const fetchedServices = response.map((service) => ({
        id: service.id,
        thumbnail: service.thumbnail,
        name: service.name,
        category: service.category.name,
        likes: service.sold,
        cartCount: 0,
        price: service.price,
        stock: service.stock,
        isActive: service.status == 0,
      }));
      setServices(fetchedServices);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setProgress(30);
      await fetchServices();
      setLoading(false);
      setProgress(100);
    }
    fetchData();
  }, []);

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
            <div className="flex items-center gap-2 px-4 py-2 text-white bg-primary rounded-xl">
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

      <div className="mt-5 overflow-x-auto bg-white border rounded-xl">
        {loading ? (

          <Spinner />

        ) : services.length > 0 ? (
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
                        className="object-cover w-16 h-16 rounded-lg"
                      />
                      <div>
                        <div className="font-semibold">{service.name}</div>
                        <div className="text-gray-500">{service.category}</div>
                        <div className="text-gray-500">
                          {service.description}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Statistik */}
                  <td className="p-4 border-b">
                    <div className="flex flex-col font-light font-nunito">
                      <div className="flex items-center gap-1">
                        <IoMdHeart className="text-xl text-customRed" />
                        <span className="mr-2">{service.likes}</span>
                      </div>
                    </div>
                  </td>

                  {/* Harga */}
                  <td className="p-4 border-b">
                    <PriceInput
                      value={service.price}
                      onChange={(e) =>
                        handleInputChange(e, service.id, "price")
                      }
                    />
                  </td>

                  {/* Status */}
                  <td className="p-4 border-b">
                    <button
                      onClick={() => handleToggle(service.id)}
                      className="w-[9.8rem] h-9 border rounded-xl flex items-center p-1 cursor-pointer relative"
                    >
                      <div
                        className={`absolute top-0 border left-0 h-full w-1/2 rounded-xl transition-transform duration-300 ${service.isActive
                          ? "translate-x-full bg-tertiary/10"
                          : "bg-tertiary/10"
                          }`}
                      ></div>
                      <span
                        className={`w-1/2 text-center z-10 text-sm font-semibold mr-1 ${service.isActive ? "text-gray-400" : "text-primary"
                          }`}
                      >
                        Nonaktif
                      </span>
                      <span
                        className={`w-1/2 text-center z-10 text-sm font-semibold ${service.isActive ? "text-primary" : "text-gray-400"
                          }`}
                      >
                        Aktif
                      </span>
                    </button>
                  </td>

                  {/* Aksi */}
                  <td className="p-4 border-b">
                    <div className="flex space-x-2">
                      <Link
                        to={`/seniman/dashboard/kesenian/updateservice/${service.id}`}
                      >
                        <button className="p-2 text-primary hover:text-primary/90 bg-tertiary/10 rounded-xl">
                          <BsPencil size={20} />
                        </button>
                      </Link>
                      <button
                        onClick={() => {
                          setServiceIdToDelete(service.id);
                          setIsModalOpen(true);
                        }}
                        className="p-2 text-customRed hover:text-customRed/90 bg-customRed/10 rounded-xl"
                      >
                        <IoTrashOutline size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <EmptyState message={"Jasa kesenian tidak tersedia"} />
        )}
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => handleDelete(serviceIdToDelete)}
      />
    </div>
  );
};

export default KesenianService;
