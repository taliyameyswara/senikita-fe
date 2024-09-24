import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import Modal from "../../components/Modal";
import TextareaInput from "../form-input/TextareaInput";
import TextInput from "../form-input/TextInput";
import SearchInput from "../form-input/SearchInput";
import { GrLocation } from "react-icons/gr";

const CustomerAddress = ({ address, isOrder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onAddressChange((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  return (
    <div className="border border-gray-200 p-5 rounded-xl mt-3">
      <div className="flex justify-between">
        <div className="">
          <span className="p-1.5 rounded-lg text-sm bg-tertiary/10 text-primary font-semibold">
            {address.label}
          </span>
          <p className="mt-1 font-semibold text-lg">{address.name} </p>
          <p className="font-nunito font-light">{address.phone}</p>
          <div className="text-sm text-gray-500 font-light">
            <p>{address.street}</p>
            <p>
              {address.city}, {address.province}
            </p>
            <p> ({address.note})</p>
          </div>
          <button onClick={openModal} className="mt-3">
            <div className="p-2 px-4 border text-sm  rounded-lg flex gap-2 items-center ">
              <FiEdit />
              Ubah Alamat
            </div>
          </button>
        </div>
        {!isOrder && (
          <div className="flex items-start">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked
                className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
              />
            </label>
          </div>
        )}
      </div>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Edit Alamat"
        subtitle="Masukkan alamat lengkap"
        width="w-1/2"
      >
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-2">
            <TextInput
              label="Nama Penerima"
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
            value={address.street}
            name="street"
            onChange={handleChange}
          />

          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            <SearchInput
              label={
                <div className="text-sm font-semibold text-black">Provinsi</div>
              }
              placeholder="Pilih provinsi"
              dataKey="provinces"
              apiUrl="/provinces"
              mapData={(item) => item.name}
              value={address.province}
              handleSelect={(selected) =>
                handleChange({ target: { name: "province", value: selected } })
              }
            />
            <SearchInput
              label={
                <div className="text-sm font-semibold text-black">
                  Kabupaten/Kota
                </div>
              }
              placeholder="Pilih kabupaten/kota"
              apiUrl={`/cities-by-province/${address.province}`}
              dataKey="cities"
              mapData={(item) => item.name}
              value={address.city}
              handleSelect={(selected) =>
                handleChange({ target: { name: "city", value: selected } })
              }
              disabled={!address.province}
            />
          </div>
          <TextareaInput
            label="Catatan Pengiriman (Opsional)"
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
