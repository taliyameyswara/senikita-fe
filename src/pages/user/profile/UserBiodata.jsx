import React, { useState } from "react";
import Avatar from "../../../assets/avatar.png";
import Modal from "../../../components/Modal";
import TextInput from "../../../components/form-input/TextInput";
import DateInput from "../../../components/form-input/DateInput";
import PasswordInput from "../../../components/form-input/PasswordInput";

const UserBiodata = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalSubtitle, setModalSubtitle] = useState("");
  const [fieldToUpdate, setFieldToUpdate] = useState("");
  const [formData, setFormData] = useState({
    profilePicture: "",
    fullName: "Taliya Meyswara",
    username: "ttsfsan",
    email: "taliyameyswara@gmail.com",
    phoneNumber: "",
    birthDate: "",
    gender: "",
    password: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const openModal = (field, title, subtitle) => {
    setFieldToUpdate(field);
    setModalTitle(title);
    setModalSubtitle(subtitle);
    setIsModalOpen(true);

    if (field === "password") {
      setNewPassword("");
      setConfirmPassword("");
      setPasswordError("");
    }
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
        {/* Profile Picture */}
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
          {/* Password Button */}
          <button
            onClick={() =>
              openModal(
                "password",
                formData.password ? "Ubah Password" : "Buat Password",
                "Silakan masukkan password baru."
              )
            }
            className="border px-5 py-3 rounded-xl text-sm font-semibold mt-3 flex w-full justify-center"
          >
            {formData.password ? "Ubah Password" : "Buat Password"}
          </button>
        </div>

        {/* Biodata Section */}
        <div className="xl:col-span-7 lg:col-span-6 col-span-10 border px-5 py-4 rounded-xl">
          {/* Personal Info */}
          <div className="font-semibold text-black text-lg mb-4">Biodata</div>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-y-4 mt-2">
              <div className=" text-gray-600">Nama Lengkap</div>
              <div className="col-span-2 flex items-center">
                {formData.fullName}
                <button
                  onClick={() =>
                    openModal(
                      "fullName",
                      "Ubah Nama Lengkap",
                      "Pastikan nama lengkap benar."
                    )
                  }
                  className="ml-3 text-tertiary"
                >
                  Ubah
                </button>
              </div>

              <div className="text-gray-600">Username</div>
              <div className="col-span-2">
                {formData.username ? (
                  <>
                    {formData.username}
                    <button
                      onClick={() =>
                        openModal(
                          "username",
                          "Ubah Username",
                          "Pastikan username Anda valid."
                        )
                      }
                      className="ml-3 text-tertiary"
                    >
                      Ubah
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() =>
                      openModal(
                        "username",
                        "Tambah Username",
                        "Pastikan username Anda valid."
                      )
                    }
                    className="text-tertiary"
                  >
                    Tambah Username
                  </button>
                )}
              </div>

              <div className="text-gray-600">Tanggal Lahir</div>
              <div className="col-span-2">
                {formData.birthDate ? (
                  <>
                    {formData.birthDate}
                    <button
                      onClick={() =>
                        openModal(
                          "birthDate",
                          "Ubah Tanggal Lahir",
                          "Pastikan tanggal lahir sudah benar."
                        )
                      }
                      className="ml-3 text-tertiary"
                    >
                      Ubah
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() =>
                      openModal(
                        "birthDate",
                        "Tambah Tanggal Lahir",
                        "Pastikan tanggal lahir sudah benar."
                      )
                    }
                    className="text-tertiary"
                  >
                    Tambah Tanggal Lahir
                  </button>
                )}
              </div>

              <div className="text-gray-600">Jenis Kelamin</div>
              <div className="col-span-2">
                {formData.gender ? (
                  <>
                    {formData.gender}
                    <button
                      onClick={() =>
                        openModal(
                          "gender",
                          "Ubah Jenis Kelamin",
                          "Silakan pilih jenis kelamin Anda."
                        )
                      }
                      className="ml-3 text-tertiary"
                    >
                      Ubah
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() =>
                      openModal(
                        "gender",
                        "Tambah Jenis Kelamin",
                        "Silakan pilih jenis kelamin Anda."
                      )
                    }
                    className="text-tertiary"
                  >
                    Tambah Jenis Kelamin
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-lg font-semibold my-4">Kontak</div>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-y-4 mt-2">
              <div className="text-gray-600">Email</div>
              <div className="col-span-2">{formData.email}</div>

              <div className="text-gray-600">Nomor Telepon</div>
              <div className="col-span-2">
                {formData.phoneNumber ? (
                  <>
                    {formData.phoneNumber}
                    <button
                      onClick={() =>
                        openModal(
                          "phoneNumber",
                          "Ubah Nomor Telepon",
                          "Pastikan nomor telepon Anda valid."
                        )
                      }
                      className="ml-3 text-tertiary"
                    >
                      Ubah
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() =>
                      openModal(
                        "phoneNumber",
                        "Tambah Nomor Telepon",
                        "Pastikan nomor telepon Anda valid."
                      )
                    }
                    className="text-tertiary"
                  >
                    Tambah Nomor Telepon
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
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
        {fieldToUpdate === "birthDate" ? (
          <DateInput
            label={modalTitle}
            value={formData.birthDate}
            onChange={(e) =>
              setFormData({ ...formData, birthDate: e.target.value })
            }
          />
        ) : fieldToUpdate === "gender" ? (
          <div className="flex gap-3">
            <label
              htmlFor="male"
              className="flex items-center flex-1 p-3 py-2 space-x-2 border border-gray-300 rounded-lg"
            >
              <input
                type="radio"
                id="male"
                name="gender"
                value="Laki-laki"
                checked={formData.gender === "Laki-laki"}
                onChange={() =>
                  setFormData({ ...formData, gender: "Laki-laki" })
                }
              />
              <span>Laki-laki</span>
            </label>
            <label
              htmlFor="female"
              className="flex items-center flex-1 p-3 py-2 space-x-2 border border-gray-300 rounded-lg"
            >
              <input
                type="radio"
                id="female"
                name="gender"
                value="Perempuan"
                checked={formData.gender === "Perempuan"}
                onChange={() =>
                  setFormData({ ...formData, gender: "Perempuan" })
                }
              />
              <span>Perempuan</span>
            </label>
          </div>
        ) : fieldToUpdate === "password" ? (
          <>
            <div className="mb-4">
              <PasswordInput
                label="Password Baru"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <PasswordInput
              label="Konfirmasi Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </>
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
