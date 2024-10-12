import { useState, useEffect } from "react";
import CustomerAddress from "../../../components/orders/CustomerAddress";
import { IoAddOutline } from "react-icons/io5";
import Modal from "../../../components/Modal";
import TextInput from "../../../components/form-input/TextInput";
import TextareaInput from "../../../components/form-input/TextareaInput";
import SearchInput from "../../../components/form-input/SearchInput";
import { useAxiosInstance } from "../../../config/axiosConfig";
import DeleteModal from "../../../components/modal/DeleteModal";
import { toast } from "react-toastify";
import AddAddressModal from "../../../components/address/AddAdressModal";
import EmptyState from "../../../components/EmptyState";

const UserAddress = ({ setProgress }) => {
  const axiosInstance = useAxiosInstance();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label_address: "",
    name: "",
    phone: "",
    address_detail: "",
    city_id: "",
    province_id: "",
    note: "",
    postal_code: "",
  });

  const fetchAddresses = async () => {
    try {
      const response = await axiosInstance.get("user/address");
      if (response.data.status === "success") {
        setAddresses(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };
  useEffect(() => {
    // Mengambil data alamat dari API
    fetchAddresses();
    setProgress(100);
  }, []);

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const handleAddAddress = async () => {
    try {
      const response = await axiosInstance.post("user/address", newAddress);
      if (response.data.status === "success") {
        fetchAddresses();
        setProgress(100);
        closeAddModal();
      } else {
        // console.error("Failed to add address:", response.data.message);
        toast.error("Gagal menambahkan alamat");
      }
      toast.success("Alamat berhasil ditambahkan");
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const [addressToDelete, setAddressToDelete] = useState(null);

  const openDeleteModal = (address) => {
    setAddressToDelete(address);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteAddress = async () => {
    try {
      const response = await axiosInstance.delete(
        `user/address/${addressToDelete.id}`
      );
      if (response.data.status === "success") {
        setAddresses(
          addresses.filter((address) => address.id !== addressToDelete.id)
        );
        closeDeleteModal();
      } else {
        // console.error("Failed to delete address:", response.data.message);
        toast.error("Gagal menghapus alamat");
      }
      toast.success("Alamat berhasil dihapus");
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setAddressToDelete(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Daftar Alamat</h1>
        <div className="flex gap-2">
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 text-white bg-primary rounded-xl"
          >
            <IoAddOutline />
            <div className="">Tambah Alamat</div>
          </button>
        </div>
      </div>

      {addresses.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {addresses.map((address) => (
            <CustomerAddress
              key={address.id}
              address={address}
              isOrder={false}
              openDeleteModal={openDeleteModal}
            />
          ))}
        </div>
      ) : (
        <EmptyState message="Tidak ada alamat yang tersedia" />
      )}

      {/* Modal Tambah Alamat */}

      <AddAddressModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddAddress}
        newAddress={newAddress}
        handleChange={handleAddChange}
      />

      {/* Modal Hapus Alamat */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteAddress} // Pastikan onConfirm memanggil handleDeleteAddress
        title="Konfirmasi Hapus"
        subtitle={`Apakah Anda yakin ingin menghapus alamat ${
          addressToDelete ? addressToDelete.label_address : ""
        }?`} // Menampilkan label alamat yang akan dihapus
      />
    </div>
  );
};

export default UserAddress;
