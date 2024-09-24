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
    password: "", // State for password
  });
  const [newPassword, setNewPassword] = useState(""); // New password state
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password state
  const [passwordError, setPasswordError] = useState(""); // State for password error message

  // Function to open modal
  const openModal = (field, title, subtitle) => {
    setFieldToUpdate(field);
    setModalTitle(title);
    setModalSubtitle(subtitle);
    setIsModalOpen(true);

    // Reset new password fields when opening modal
    if (field === "password") {
      setNewPassword("");
      setConfirmPassword("");
      setPasswordError("");
    }
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle profile picture upload
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

  // Function to save data from modal
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
    <div>
      <div className="grid grid-cols-10 xl:gap-5 lg:gap-4 gap-2">
        {/* Profile Picture */}
        <div className="xl:col-span-3 lg:col-span-4 col-span-10 mb-5">
          <div className="border px-5 py-4 rounded-xl">
            <div className="font-semibold">Foto Profil</div>
            <div className="rounded-xl overflow-hidden mt-2">
              <img
                src={
                  formData.profilePicture ||
                  "https://cdngnfi2.sgp1.cdn.digitaloceanspaces.com/gnfi/uploads/images/2022/11/0715042022-Lukisan-Balinese-Procession-karya-Lee-Man-Fong-menjadi-salah-satu-lukisan-terkenal-dunia-asal-Indonesia-Good-News-From-Indonesia.jpg"
                }
                alt="Profile"
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="">
              <button className="border px-5 py-2 rounded-xl text-sm font-semibold mt-3 flex w-full justify-center">
                Ubah Foto Profil
              </button>
              <p className="text-sm text-gray-400 mt-3 flex">
                Ukuran foto maksimal 500KB. Format file yang diperbolehkan: .JPG
                .JPEG .PNG .GIF
              </p>
            </div>
          </div>
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

        {/*  Biodata */}
        <div className="xl:col-span-7 lg:col-span-6 col-span-10">
          {/* Personal Data Content */}
          <div className="border px-5 py-4 rounded-xl">
            <div className="font-semibold text-black text-lg mb-4">Biodata</div>
            <div className="grid grid-cols-12 gap-y-6 text-sm xl:text-base">
              {/* Biodata Labels */}
              <div className="xl:col-span-3 col-span-4">
                <div className="flex flex-col gap-4 text-gray-600">
                  <div>Nama Lengkap</div>
                  <div>Username</div>
                  <div>Tanggal Lahir</div>
                  <div>Jenis Kelamin</div>
                </div>
              </div>

              {/* Biodata Values */}
              <div className="col-span-7">
                <div className="flex flex-col gap-4">
                  <div>{formData.fullName}</div>
                  <div>
                    {formData.username ? (
                      <div className="flex gap-2">
                        {formData.username}
                        <button
                          onClick={() =>
                            openModal(
                              "username",
                              "Ubah Username",
                              "Pastikan username Anda valid."
                            )
                          }
                          className="text-tertiary"
                        >
                          Ubah
                        </button>
                      </div>
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
                  <div>
                    {formData.birthDate ? (
                      <div className="flex gap-2">
                        {formData.birthDate}
                        <button
                          onClick={() =>
                            openModal(
                              "birthDate",
                              "Ubah Tanggal Lahir",
                              "Pastikan tanggal lahir sudah benar."
                            )
                          }
                          className="text-tertiary"
                        >
                          Ubah
                        </button>
                      </div>
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
                  <div>
                    {formData.gender ? (
                      <div className="flex gap-2">
                        {formData.gender}
                        <button
                          onClick={() =>
                            openModal(
                              "gender",
                              "Ubah Jenis Kelamin",
                              "Silakan pilih jenis kelamin Anda."
                            )
                          }
                          className="text-tertiary"
                        >
                          Ubah
                        </button>
                      </div>
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
            </div>

            <div className="font-semibold text-black text-lg my-4 mt-5">
              Kontak
            </div>
            <div className="grid grid-cols-12 gap-y-6">
              <div className="xl:col-span-3 col-span-4">
                <div className="flex flex-col gap-4 text-gray-600 text-sm xl:text-base">
                  <div>Email</div>
                  <div>Nomor Telepon</div>
                </div>
              </div>

              <div className="col-span-7">
                <div className="flex flex-col gap-4 text-sm xl:text-base">
                  {/* Contact */}
                  <div>{formData.email}</div>
                  <div>
                    {formData.phoneNumber ? (
                      <div className="flex gap-2">
                        {formData.phoneNumber}
                        <button
                          onClick={() =>
                            openModal(
                              "phoneNumber",
                              "Ubah Nomor Telepon",
                              "Pastikan nomor telepon Anda valid."
                            )
                          }
                          className="text-tertiary"
                        >
                          Ubah
                        </button>
                      </div>
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
              className="flex items-center justify-between flex-1 p-3 py-2 space-x-2 border border-gray-300 rounded-xl"
            >
              <span>Laki-laki</span>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={(e) => setFormData({ ...formData, gender: "male" })}
              />
            </label>
            <label
              htmlFor="female"
              className="flex items-center justify-between flex-1 p-3 py-2 space-x-2 border border-gray-300 rounded-xl"
            >
              <span>Perempuan</span>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={(e) => setFormData({ ...formData, gender: "female" })}
              />
            </label>
          </div>
        ) : fieldToUpdate === "password" ? (
          <div>
            <div>
              <div className="mb-5">
                <PasswordInput
                  label="Masukkan Password Baru"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <PasswordInput
                label="Konfirmasi Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {passwordError && <p className="text-red-500">{passwordError}</p>}
            </div>
          </div>
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
