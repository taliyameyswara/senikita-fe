import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import Modal from "../../components/Modal";
import TextareaInput from "../form-input/TextareaInput";
import TextInput from "../form-input/TextInput";
import SearchInput from "../form-input/SearchInput";

const CustomerAddress = ({ address }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onAddressChange((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  return (
    <div className="border border-gray-200 p-4 rounded-xl mt-3">
      <div className="flex justify-between">
        <div className="">
          <p className="font-semibold text-lg">{address.name} </p>
          <p className="font-nunito font-light">{address.phone}</p>
          <div className="text-sm text-gray-500 font-light">
            <p>
              {address.street}, <span>{address.zipCode}</span>
            </p>
            <p>
              {" "}
              {address.district}, {address.city}, {address.province}
            </p>
            <p> ({address.note})</p>
          </div>
        </div>
        <div className="">
          <button onClick={openModal}>
            <div className="p-2 bg-tertiary/10 rounded-lg">
              <FiEdit className="text-primary" />
            </div>
          </button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} title="Edit Alamat">
        <div className="space-y-5">
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
