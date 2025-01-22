import React, { useState, useContext, useEffect } from "react";
import Modal from "../../../components/Modal";
import TextInput from "../../../components/form-input/TextInput";
import DateInput from "../../../components/form-input/DateInput";
import PasswordInput from "../../../components/form-input/PasswordInput";
import { useAxiosInstance } from '../../../config/axiosConfig';
import { toast } from "react-toastify";
import { useProfileUserApi } from "../../../api/user/ProfileUserApi";
import Spinner from "../../../components/loading/Spinner";
import { UserContext } from "../../../context/UserContext";


const UserBiodata = ({ setProgress }) => {
  const { fetchProfileUser, updateProfileUser, updatePassword } = useProfileUserApi();
  const axiosInstance = useAxiosInstance();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { refresh } = useContext(UserContext);

  const [formData, setFormData] = useState({
    profile_picture: "",
    name: "",
    username: "",
    email: "",
    call_number: "",
    birth_date: "",
    gender: "",
    password: "",
  });

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await fetchProfileUser();
      setUserData(response);
      setFormData({
        profile_picture: response.profile_picture || "",
        name: response.name || "",
        username: response.username || "",
        email: response.email || "",
        call_number: response.call_number || "",
        birth_date: response.birth_date || "",
        gender: response.gender === "male" ? "Laki-laki" : "Perempuan",
        password: "",
      })
    }
    catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setProgress(30);
      await fetchUserData();
      setProgress(100);
      setLoading(false);
    };
    fetchData();
  }, []);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalSubtitle, setModalSubtitle] = useState("");
  const [fieldToUpdate, setFieldToUpdate] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const openModal = (field, title, subtitle) => {
    setFieldToUpdate(field);
    setModalTitle(title);
    setModalSubtitle(subtitle);
    setIsModalOpen(true);

    if (field === "password") {
      setOldPassword("");
      setPassword("");
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
        setFormData({ ...formData, profile_picture: file });

        const formDataToSend = new FormData();
        formDataToSend.append("profile_picture", file);
        formDataToSend.append("_method", "PUT");

        setLoading(true);
        updateProfileUser(formDataToSend)
          .then((response) => {
            refresh(response)
            toast.success("Foto profil berhasil diperbarui.");
            fetchUserData();
          })
          .catch((error) => {
            console.error("Error updating profile picture:", error);
          }).finally(() => {
            setLoading(false);
          });
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit data
  const handleSubmit = () => {
    if (fieldToUpdate === "password") {
      const passwordData = {
        old_password: oldPassword,
        password: password,
      };
      setLoading(true);
      updatePassword(passwordData)
        .then((response) => {
          toast.success("Password berhasil diperbarui.");
          closeModal();
        })
        .catch((error) => {
          toast.error("Gagal memperbarui password.");
        }).finally(() => {
          setLoading(false);
        });

    } else {
      const formDataToSend = new FormData();

      formDataToSend.append("name", formData.name);
      formDataToSend.append("username", formData.username);
      formDataToSend.append("call_number", formData.call_number);
      formDataToSend.append("birth_date", formData.birth_date);
      formDataToSend.append("birth_location", "Semarang"); // Sesuaikan dengan input pengguna
      formDataToSend.append("gender", formData.gender === "Laki-laki" ? "male" : "female");

      if (formData.profile_picture instanceof File) {
        formDataToSend.append("profile_picture", formData.profile_picture);
      }

      formDataToSend.append("_method", "PUT");
      setLoading(true);

      updateProfileUser(formDataToSend)
        .then((response) => {
          toast.success("Profil berhasil diperbarui.");
          refresh(response)
          closeModal();
          fetchUserData();
        })
        .catch((error) => {
          toast.error("Gagal memperbarui profil.");
        }).finally(() => {
          setLoading(false);
        });;
    }
  };

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="">
      {/* Profile Section */}
      <div className="grid grid-cols-10 gap-2 xl:gap-5 lg:gap-4">
        {/* Profile Picture */}
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
            id="profile_pictureInput"
            className="hidden"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
          <button
            onClick={() =>
              document.getElementById("profile_pictureInput").click()
            }
            className="flex justify-center w-full px-5 py-2 mt-3 text-sm font-semibold border rounded-xl"
          >
            Ubah Foto Profil
          </button>
          <p className="mt-3 text-sm text-gray-400">
            Ukuran foto maksimal 500KB. Format file yang diperbolehkan: .JPG
            .JPEG .PNG .GIF
          </p>
          {/* Password Button */}
          <button
            onClick={() =>
              openModal(
                "password",
                "Ubah Password",
                "Silakan masukkan password baru."
              )
            }
            className="flex justify-center w-full px-5 py-3 mt-3 text-sm font-semibold border rounded-xl"
          >
            {"Ubah Password"}
          </button>
        </div>

        {/* Biodata Section */}
        <div className="col-span-10 px-5 py-4 border xl:col-span-7 lg:col-span-6 rounded-xl">
          {/* Personal Info */}
          <div className="mb-4 text-lg font-semibold text-black">Biodata</div>
          <div className="space-y-4">
            <div className="grid grid-cols-3 mt-2 gap-y-4">
              <div className="text-gray-600 ">Nama Lengkap</div>
              <div className="flex items-center col-span-2">
                {formData.name}
                <button
                  onClick={() =>
                    openModal(
                      "name",
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
                {formData.birth_date ? (
                  <>
                    {formData.birth_date}
                    <button
                      onClick={() =>
                        openModal(
                          "birth_date",
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
                        "birth_date",
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
          <div className="my-4 text-lg font-semibold">Kontak</div>
          <div className="space-y-4">
            <div className="grid grid-cols-3 mt-2 gap-y-4">
              <div className="text-gray-600">Email</div>
              <div className="col-span-2">{formData.email}</div>

              <div className="text-gray-600">Nomor Telepon</div>
              <div className="col-span-2">
                {formData.call_number ? (
                  <>
                    {formData.call_number}
                    <button
                      onClick={() =>
                        openModal(
                          "call_number",
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
                        "call_number",
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
        {fieldToUpdate === "birth_date" ? (
          <DateInput
            label={modalTitle}
            value={formData.birth_date}
            onChange={(e) =>
              setFormData({ ...formData, birth_date: e.target.value })
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
                label="Password Lama"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <PasswordInput
              label="Password Baru"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

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
