import React, { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import TextInput from "../../../components/form-input/TextInput";
import TextareaInput from "../../../components/form-input/TextareaInput";
import Selection from "../../../components/Selection";
import ReadMore from "../../../components/ReadMore";
import Spinner from "../../../components/loading/Spinner";
import { toast } from "react-toastify";
// import { useProfileShopApi } from "../../../api/shop/ProfileShopApi";
import { useProfileShopApi } from "../../../api/shop/ProfileShopApi";


const SenimanBiodata = ({ setProgress }) => {
  const { fetchProfileShop, updateProfileShop } = useProfileShopApi();
  const [loading, setLoading] = useState(false);
  const [senimanData, setSenimanData] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalSubtitle, setModalSubtitle] = useState("");
  const [fieldToUpdate, setFieldToUpdate] = useState("");
  const [formData, setFormData] = useState({
    profile_picture: "",
    name: "",
    desc: "",
    address: "",
    city_id: 0,
    province_id: 0,

    // category: ["Seni Tari", "Seni Musik"],
  });

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await fetchProfileShop();
      setSenimanData(response);
      setFormData({
        profile_picture: response.profile_picture,
        name: response.name,
        desc: response.desc,
        address: response.address,
        city_id: response.city_id,
        province_id: response.province_id,
      });
    } catch (error) {
      console.error("Failed to fetch profile shop:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setProgress(30);
      await fetchUserData();
      setProgress(100);
    };
    fetchData();
  }, []);



  const openModal = (field, title, subtitle) => {
    setFieldToUpdate(field);
    setModalTitle(title);
    setModalSubtitle(subtitle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profile_picture: file });

        const formEditData = new FormData();
        formEditData.append("profile_picture", file);
        formEditData.append("_method", "PUT");

        setLoading(true);
        updateProfileShop(formEditData, senimanData.id)
          .then((response) => {
            toast.success("Foto profil berhasil diperbarui.");
            fetchUserData();
          })
          .catch((error) => {
            console.error("Error updating profile picture:", error);
            toast.error("Gagal memperbarui foto profil.");
            fetchUserData();
          }).finally(() => {
            setLoading(false);
          });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (fieldToUpdate === "password") {
      if (newPassword !== confirmPassword) {
        setPasswordError("Password tidak cocok!");
        return;
      }
      setFormData({ ...formData, password: newPassword });
    } else {
      const formEditData = new FormData();
      formEditData.append("name", formData.name);
      formEditData.append("desc", formData.desc);
      formEditData.append('address', formData.address);

      if (formData.profile_picture instanceof File) {
        formEditData.append('profile_picture', formData.profile_picture);
      }

      formEditData.append("_method", "PUT");

      // Submit the profile data change
      updateProfileShop(formEditData, senimanData.id)
        .then(() => {
          toast.success("Profil berhasil diperbarui.");
          fetchUserData();
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
          toast.error("Gagal memperbarui profil.");
          fetchUserData();
        });

    }
    closeModal();
  };

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="">
      {/* Profile Section */}
      <div className="grid grid-cols-10 gap-2 xl:gap-5 lg:gap-4">
        <div className="col-span-10 px-5 py-4 border xl:col-span-3 lg:col-span-4 rounded-xl">
          <div className="mb-2 font-semibold">Foto Profil</div>
          <img
            loading="lazy"
            src={
              formData.profile_picture ||
              "https://cdngnfi2.sgp1.cdn.digitaloceanspaces.com/gnfi/uploads/images/2022/11/0715042022-Lukisan-Balinese-Procession-karya-Lee-Man-Fong-menjadi-salah-satu-lukisan-terkenal-dunia-asal-Indonesia-Good-News-From-Indonesia.jpg"
            }
            alt="Profile"
            className="object-cover w-full h-48 rounded-xl"
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
            className="flex justify-center w-full px-5 py-2 mt-3 text-sm font-semibold border rounded-xl"
          >
            Ubah Foto Profil
          </button>
          <p className="mt-3 text-sm text-gray-400">
            Ukuran foto maksimal 500KB. Format file yang diperbolehkan: .JPG
            .JPEG .PNG .GIF
          </p>
        </div>

        {/* Biodata Section */}
        <div className="col-span-10 xl:col-span-7 lg:col-span-6">
          {/* Personal Info Table */}
          <div className="px-5 py-4 border rounded-xl">
            <div className="mb-4 text-lg font-semibold text-black">
              Informasi Seniman
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-3 mt-2 gap-y-4">
                <div className="text-gray-600 ">Nama Lengkap</div>
                <div className="flex items-center col-span-2">
                  {formData.name}
                  <button
                    onClick={() =>
                      openModal(
                        "name",
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
                <div className="flex items-center col-span-2">
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

                <div className="text-gray-600">Alamat Seniman</div>
                <div className="flex items-center col-span-2">
                  <ReadMore description={formData.address} maxLength={200} />
                  <button
                    onClick={() =>
                      openModal(
                        "address",
                        "Aalamat Seniman",
                        "Berikan deskripsi mengenai alamat kesenian."
                      )
                    }
                    className="ml-3 text-tertiary"
                  >
                    Ubah
                  </button>
                </div>
                {/* <div className="flex items-center col-span-2">
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
                </div> */}
              </div>
            </div>
          </div>

          {/* <div className="">
            <CustomerAddress address={address} isOrder={true} />
          </div> */}
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

export default SenimanBiodata;
