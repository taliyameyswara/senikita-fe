import Modal from "../Modal";
import TextInput from "../form-input/TextInput";
import TextareaInput from "../form-input/TextareaInput";
import SearchInput from "../form-input/SearchInput";

const AddAddressModal = ({ isOpen, onClose, onSubmit, newAddress, handleChange }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Tambah Alamat Baru"
            subtitle="Masukkan alamat lengkap baru"
            width="w-1/2"
            handleSubmit={onSubmit}
        >
            <div className="space-y-5">
                <TextInput
                    label="Label Alamat"
                    placeholder="Masukkan label alamat. Contoh: Rumah, Kantor, dll."
                    value={newAddress.label_address}
                    name="label_address"
                    onChange={handleChange}
                />
                <div className="grid grid-cols-2 gap-2">
                    <TextInput
                        label="Nama Penerima/Penanggung Jawab"
                        placeholder="Masukkan nama"
                        value={newAddress.name}
                        name="name"
                        onChange={handleChange}
                    />
                    <TextInput
                        type="tel"
                        label="Telepon"
                        placeholder="Masukkan nomor telepon"
                        value={newAddress.phone}
                        name="phone"
                        onChange={handleChange}
                    />
                </div>

                <TextareaInput
                    label="Alamat"
                    placeholder="Masukkan alamat lengkap"
                    value={newAddress.address_detail}
                    name="address_detail"
                    onChange={handleChange}
                />
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <SearchInput
                        label="Provinsi"
                        placeholder="Pilih provinsi"
                        dataKey="provinces"
                        apiUrl="/provinces"
                        mapData={(item) => item.name}
                        value={newAddress.province_id}
                        handleSelect={(selected) =>
                            handleChange({ target: { name: "province_id", value: selected } })
                        }
                    />
                    <SearchInput
                        label="Kabupaten/Kota"
                        placeholder="Pilih kabupaten/kota"
                        apiUrl={`/cities-by-province/${newAddress.province_id}`}
                        dataKey="cities"
                        mapData={(item) => item.name}
                        value={newAddress.city_id}
                        handleSelect={(selected) =>
                            handleChange({ target: { name: "city_id", value: selected } })
                        }
                        disabled={!newAddress.province_id}
                    />
                </div>
                <TextInput
                    label="Kode Pos"
                    placeholder="Masukkan kode pos"
                    value={newAddress.postal_code}
                    name="postal_code"
                    onChange={handleChange}
                />
                <TextareaInput
                    label="Catatan Alamat (Opsional)"
                    placeholder="Masukkan catatan Anda di sini..."
                    value={newAddress.note}
                    name="note"
                    onChange={handleChange}
                />
            </div>
        </Modal>
    );
};

export default AddAddressModal;
