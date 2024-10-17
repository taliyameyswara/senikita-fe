import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import Modal from "../../components/Modal";
import TextareaInput from "../form-input/TextareaInput";
import TextInput from "../form-input/TextInput";
import SearchInput from "../form-input/SearchInput";
import { GrLocation } from "react-icons/gr";
import { FaTrashCan } from "react-icons/fa6";

const CustomerAddress = ({ address, isOrder, openDeleteModal }) => {
  // Terima openDeleteModal sebagai prop
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onAddressChange((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  return (
    <div className="md:p-5 p-4 mt-3 border border-gray-200 rounded-xl">
      <div className="flex justify-between">
        <div className="">
          <span className="p-1.5 rounded-lg md:text-sm text-xs bg-tertiary/10 text-primary font-semibold">
            {address.label_address}
          </span>
          <p className="mt-1 md:text-lg font-semibold">{address.name} </p>
          <p className="font-light font-nunito md:text-base text-sm">
            {address.phone}
          </p>
          <div className="md:text-sm text-xs font-light text-gray-500">
            <p>{address.street}</p>
            <p>
              {address.city?.name}, {address.province?.name}
            </p>
            <p> ({address.note})</p>
          </div>
          <button onClick={openModal} className="mt-3">
            <div className="flex items-center gap-2 p-2 px-4 border rounded-lg md:text-sm text-xs">
              <FiEdit />
              Ubah Alamat
            </div>
          </button>
          <button
            onClick={() => openDeleteModal(address)}
            className="mt-3 ml-2"
          >
            <div className="flex items-center gap-2 p-2 px-4 border rounded-lg text-customRed md:text-sm text-xs">
              <FaTrashCan className="text-customRed" />
              Hapus
            </div>
          </button>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Edit Alamat"
        subtitle="Masukkan alamat lengkap"
        width="lg:w-1/2 w-[90%]"
      >
        <div className="md:space-y-5 space-y-3">
          <TextInput
            label="Label Alamat"
            placeholder="Masukkan label alamat. Contoh: Rumah, Kantor, dll."
            value={address.label_address}
            name="label"
            onChange={handleChange}
          />
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            <TextInput
              label="Nama Penerima/Penanggung Jawab"
              placeholder="Masukkan nama"
              value={address.name}
              name="name"
              onChange={handleChange}
            />
            <TextInput
              type="tel"
              label="Telepon"
              placeholder="Masukkan nomor telepon"
              value={address.phone}
              name="phone"
              onChange={handleChange}
            />
          </div>
          <TextareaInput
            label="Alamat"
            placeholder="Masukkan alamat lengkap"
            value={address.address_detail}
            name="street"
            onChange={handleChange}
          />

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <SearchInput
              label={
                <div className="text-xs md:text-sm font-semibold text-black">
                  Provinsi
                </div>
              }
              placeholder="Pilih provinsi"
              dataKey="provinces"
              apiUrl="/provinces"
              mapData={(item) => item.name}
              value={address.province_id}
              handleSelect={(selected) =>
                handleChange({
                  target: { name: "province_id", value: selected },
                })
              }
            />
            <SearchInput
              label={
                <div className="text-sm font-semibold text-black">
                  Kabupaten/Kota
                </div>
              }
              placeholder="Pilih kabupaten/kota"
              apiUrl={`/cities-by-province/${address.province_id}`}
              dataKey="cities"
              mapData={(item) => item.name}
              value={address.city_id}
              handleSelect={(selected) =>
                handleChange({ target: { name: "city_id", value: selected } })
              }
              disabled={!address.province_id}
            />
          </div>
          <TextInput
            label="Kode Pos"
            placeholder="Masukkan kode pos"
            value={address.postal_code}
            name="phone"
            onChange={handleChange}
          />
          <TextareaInput
            label="Catatan Alamat (Opsional)"
            placeholder="Masukkan catatan Anda di sini..."
            value={address.note}
            name="note"
            onChange={handleChange}
          />
        </div>
      </Modal>
    </div>
  );
};

export default CustomerAddress;
