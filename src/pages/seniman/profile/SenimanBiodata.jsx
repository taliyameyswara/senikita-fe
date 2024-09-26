import React, { useState } from "react";
import Avatar from "../../../assets/avatar.png";
import Modal from "../../../components/Modal";
import TextInput from "../../../components/form-input/TextInput";
import TextareaInput from "../../../components/form-input/TextareaInput";
import Selection from "../../../components/Selection";
import ReadMore from "../../../components/ReadMore";
import CustomerAddress from "../../../components/orders/CustomerAddress";

const UserBiodata = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalSubtitle, setModalSubtitle] = useState("");
  const [fieldToUpdate, setFieldToUpdate] = useState("");
  const [formData, setFormData] = useState({
    profilePicture: "",
    fullName: "Sanggar Seni Apa Gt",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore sequi itaque repellat! Consequatur aliquid sint suscipit voluptatem consequuntur dolorem animi natus! Consequuntur obcaecati unde tempore soluta iste accusamus dolor pariatur! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore sequi itaque repellat! Consequatur aliquid sint suscipit voluptatem consequuntur dolorem animi natus! Consequuntur obcaecati unde tempore soluta iste accusamus dolor pariatur!",
    category: ["Seni Tari", "Seni Musik"],
  });

  const [categoryOptions] = useState([
    { label: "Seni Tari", value: "Seni Tari" },
    { label: "Seni Rupa", value: "Seni Rupa" },
    { label: "Seni Musik", value: "Seni Musik" },
  ]);

  const [address, setAddress] = useState({
    label: "Kantor",
    name: "Seni Apa Gt",
    phone: "08123456789",
    street: "Jl. Kebon Jeruk No 7 Blok F",
    zipCode: "61314",
    city: "Bandung",
    district: "Cibaduyut",
    province: "Jawa Barat",
    note: "Rumah warna hijau pager oren", //optional
  });

  const openModal = (field, title, subtitle) => {
    setFieldToUpdate(field);
    setModalTitle(title);
    setModalSubtitle(subtitle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategorySelect = (selectedOptions) => {
    const selectedCategories = selectedOptions.map((option) => option.value);
    setFormData({ ...formData, category: selectedCategories });
  };

  const handleSubmit = () => {
    if (fieldToUpdate === "password") {
      if (newPassword !== confirmPassword) {
        setPasswordError("Password tidak cocok!");
        return;
      }
      setFormData({ ...formData, password: newPassword });
    }
    closeModal();
  };

  return (
    <div className="">
      {/* Profile Section */}
      <div className="grid grid-cols-10 xl:gap-5 lg:gap-4 gap-2">
        <div className="xl:col-span-3 lg:col-span-4 col-span-10 border px-5 py-4 rounded-xl">
          <div className="font-semibold mb-2">Foto Profil</div>
          <img
            src={
              formData.profilePicture ||
              "https://cdngnfi2.sgp1.cdn.digitaloceanspaces.com/gnfi/uploads/images/2022/11/0715042022-Lukisan-Balinese-Procession-karya-Lee-Man-Fong-menjadi-salah-satu-lukisan-terkenal-dunia-asal-Indonesia-Good-News-From-Indonesia.jpg"
            }
            alt="Profile"
            className="w-full h-48 object-cover rounded-xl"
          />
          <input
            type="file"
            id="profilePictureInput"
            className="hidden"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
          <button
            onClick={() =>
              document.getElementById("profilePictureInput").click()
            }
            className="border px-5 py-2 rounded-xl text-sm font-semibold mt-3 flex w-full justify-center"
          >
            Ubah Foto Profil
          </button>
          <p className="text-sm text-gray-400 mt-3">
            Ukuran foto maksimal 500KB. Format file yang diperbolehkan: .JPG
            .JPEG .PNG .GIF
          </p>
        </div>

        {/* Biodata Section */}
        <div className="xl:col-span-7 lg:col-span-6 col-span-10">
          {/* Personal Info Table */}
          <div className=" border px-5 py-4 rounded-xl">
            <div className="font-semibold text-black text-lg mb-4">
              Informasi Seniman
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-y-4 mt-2">
                <div className=" text-gray-600">Nama Lengkap</div>
                <div className="col-span-2 flex items-center">
                  {formData.fullName}
                  <button
                    onClick={() =>
                      openModal(
                        "fullName",
                        "Nama Seniman",
                        "Pastikan nama lengkap Anda benar."
                      )
                    }
                    className="ml-3 text-tertiary"
                  >
                    Ubah
                  </button>
                </div>

                <div className="text-gray-600">Deskripsi Seniman</div>
                <div className="col-span-2 flex items-center">
                  <ReadMore description={formData.desc} maxLength={200} />
                  <button
                    onClick={() =>
                      openModal(
                        "desc",
                        "Deskripsi Seniman",
                        "Berikan deskripsi mengenai layanan kesenian Anda."
                      )
                    }
                    className="ml-3 text-tertiary"
                  >
                    Ubah
                  </button>
                </div>

                <div className="text-gray-600">Kategori Kesenian</div>
                <div className="col-span-2 flex items-center">
                  {formData.category.join(", ") || "Belum ada kategori"}
                  <button
                    onClick={() =>
                      openModal(
                        "category",
                        "Kategori Kesenian",
                        "Pilih kategori kesenian Anda."
                      )
                    }
                    className="ml-3 text-tertiary"
                  >
                    Ubah
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <CustomerAddress address={address} isOrder={true} />
          </div>
        </div>

        {/* Address Section */}
      </div>

      {/* Modal for data input */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        subtitle={modalSubtitle}
        handleSubmit={handleSubmit}
        width="w-1/3"
      >
        {fieldToUpdate === "category" ? (
          <Selection
            name={
              <>
                <div className="text-sm font-semibold text-black">
                  Kategori Kesenian
                </div>
              </>
            }
            options={categoryOptions}
            selectedOptions={categoryOptions.filter((option) =>
              formData.category.includes(option.value)
            )}
            onSelect={handleCategorySelect}
            placeholder="Pilih kategori kesenian"
            isMulti={true}
          />
        ) : fieldToUpdate === "desc" ? (
          <TextareaInput
            label={modalTitle}
            value={formData.desc}
            rows={10}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          />
        ) : (
          <TextInput
            label={modalTitle}
            value={formData[fieldToUpdate]}
            onChange={(e) =>
              setFormData({ ...formData, [fieldToUpdate]: e.target.value })
            }
          />
        )}
      </Modal>
    </div>
  );
};

export default UserBiodata;
