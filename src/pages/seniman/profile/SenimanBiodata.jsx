import React, { useEffect, useState } from "react";
import Avatar from "../../../assets/avatar.png";
import Modal from "../../../components/Modal";
import TextInput from "../../../components/form-input/TextInput";
import TextareaInput from "../../../components/form-input/TextareaInput";
import Selection from "../../../components/Selection";
import ReadMore from "../../../components/ReadMore";
import CustomerAddress from "../../../components/orders/CustomerAddress";
import { useAxiosInstance } from "../../../config/axiosConfig";
import FullPageLoader from "../../../components/loading/FullPageLoader";
import { toast } from "react-toastify";
const SenimanBiodata = () => {
  const axiosInstance = useAxiosInstance();
  const [loading, setLoading] = useState(true);
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

  const fetchUserData = () => {
    axiosInstance.get('user/shop/view-login')
      .then((res) => {
        const senimanData = res.data.data;
        console.log(senimanData)
        setSenimanData(senimanData);
        setFormData({
          profile_picture: senimanData.profile_picture,
          name: senimanData.name,
          desc: senimanData.desc,
          address: senimanData.address,
          city_id: senimanData.city_id,
          province_id: senimanData.province_id,
        })
      }).catch((res) => {
        console.log(res)
      }).finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchUserData();
  }, [])

  useEffect(() => {
    console.log(formData)
  }, [formData])

  // const [categoryOptions] = useState([
  //   { label: "Seni Tari", value: "Seni Tari" },
  //   { label: "Seni Rupa", value: "Seni Rupa" },
  //   { label: "Seni Musik", value: "Seni Musik" },
  // ]);

  // const [address, setAddress] = useState({
  //   label: "Kantor",
  //   name: "Seni Apa Gt",
  //   phone: "08123456789",
  //   street: "Jl. Kebon Jeruk No 7 Blok F",
  //   zipCode: "61314",
  //   city: "Bandung",
  //   district: "Cibaduyut",
  //   province: "Jawa Barat",
  //   note: "Rumah warna hijau pager oren", //optional
  // });

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
        setFormData({ ...formData, profile_picture: file });

        const formEditData = new FormData();
        formEditData.append("profile_picture", file);
        formEditData.append("_method", "PUT");

        // Submit the profile picture change
        axiosInstance({
          method: "post",
          url: `/user/shop/${senimanData.id}`,
          data: formEditData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then((response) => {
            toast.success("Foto profil berhasil diperbarui.");
            fetchUserData();
          })
          .catch((error) => {
            console.error("Error updating profile picture:", error);
          });
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleCategorySelect = (selectedOptions) => {
  //   const selectedCategories = selectedOptions.map((option) => option.value);
  //   setFormData({ ...formData, category: selectedCategories });
  // };

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
      axiosInstance({
        method: "post",
        url: `/user/shop/${senimanData.id}`, // Endpoint untuk memperbarui profil
        data: formEditData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          console.log("Profile updated successfully:", response.data);
          toast.success("Profil berhasil diperbarui.");
          closeModal();
          fetchUserData(); // Optionally refresh profile data
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
          toast.error("Gagal memperbarui profil.");
        });

      // profile_picture: "",
      //   name: "",
      //     desc: "",
      //       address: "",
      //         city_id: 0,
      //           province_id: 0,

    }
    closeModal();
  };

  if (loading) {
    return <FullPageLoader />
  }

  return (
    <div className="">
      {/* Profile Section */}
      <div className="grid grid-cols-10 gap-2 xl:gap-5 lg:gap-4">
        <div className="col-span-10 px-5 py-4 border xl:col-span-3 lg:col-span-4 rounded-xl">
          <div className="mb-2 font-semibold">Foto Profil</div>
          <img
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
