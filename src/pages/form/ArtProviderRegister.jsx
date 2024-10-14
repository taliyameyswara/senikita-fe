import React, { useState, useContext, useEffect } from "react";
import Stepper from "../../components/Stepper";
import AvatarUpload from "../../components/AvatarUpload";
import NavbarLogo from "../../components/navbar/NavbarLogo";
import FooterLogo from "../../components/footer/FooterLogo";
import TextInput from "../../components/form-input/TextInput";
import TextareaInput from "../../components/form-input/TextareaInput";
import SearchInput from "../../components/form-input/SearchInput";
import DateInput from "../../components/form-input/DateInput";
import SucesssModal from "../../components/SuccessModal";
import Selection from "../../components/Selection";
import { UserContext } from "../../context/UserContext";
import { useAxiosInstance } from "../../config/axiosConfig";
import FullPageLoader from "../../components/loading/FullPageLoader";

const ArtProviderRegister = () => {
  const { user } = useContext(UserContext);
  const axiosInstance = useAxiosInstance();
  const [loading, setLoading] = useState(true);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const [currentStep, setCurrentStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    personalInfo: {
      profile_picture: null,
      name: "",
      username: "",
      call_number: "",
      birth_date: "",
      birth_location: "",
      gender: "",
    },
    providerInfo: {
      name: "",
      desc: "",
      address: "",
      city_id: "",
      province: "",
      categories: [],
    },
    termsAccepted: false,
  });

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        personalInfo: {
          ...prevData.personalInfo,
          name: user.name, // Assuming 'name' is the desired field from user
        },
      }));
    }

    axiosInstance
      .get("/category")
      .then((response) => {
        console.log(response.data.data.data);
        const categories = response.data.data.data.map((category) => ({
          value: category.id.toString(),
          label: category.name,
        }));
        setCategoryOptions(categories);
        console.log(categories);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      })
      .finally(() => {
        // Mengatur status loading
        setLoading(false);
      });
  }, [user]);

  const steps = [
    "Data Pribadi",
    "Data Penyedia Kesenian",
    "Syarat & Ketentuan",
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (e, section, field) => {
    const updatedFormData = {
      ...formData,
      [section]: {
        ...formData[section],
        [field]: e.target.value,
      },
    };
    setFormData(updatedFormData);
    console.log("Updated Form Data:", updatedFormData);
  };

  const handleImageSelect = (file, section, field) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: file,
      },
    });
  };

  const handleTermsChange = (e) => {
    setFormData({ ...formData, termsAccepted: e.target.checked });
  };

  const isStepValid = () => {
    if (currentStep === 0) {
      const {
        name,
        username,
        call_number,
        birth_date,
        birth_location,
        gender,
      } = formData.personalInfo;
      return (
        name &&
        username &&
        call_number &&
        birth_date &&
        birth_location &&
        gender
      );
    }
    if (currentStep === 1) {
      const { name, desc, address, city_id, province, categories } =
        formData.providerInfo;
      return name && desc && address && city_id && province && categories;
    }
    if (currentStep === 2) {
      return formData.termsAccepted;
    }
    return false;
  };

  const [selectedCategoryOptions, setSelectedCategoryOptions] = useState([]);

  const handleCategorySelect = (selected) => {
    const selectedValues = selected.map((option) => option.value);
    const updatedFormData = {
      ...formData,
      providerInfo: {
        ...formData.providerInfo,
        categories: selectedValues,
      },
    };
    setFormData(updatedFormData);
    setSelectedCategoryOptions(selected);
    console.log("Updated Form Data:", updatedFormData); // Log the updated form data
  };

  const handleSubmit = async () => {
    const providerJson = {
      ...formData.providerInfo,
    };

    // Create FormData for personalInfo
    const personalFormData = new FormData();
    for (const key in formData.personalInfo) {
      if (formData.personalInfo[key]) {
        personalFormData.append(key, formData.personalInfo[key]);
      }
    }

    personalFormData.append("_method", "PUT");

    try {
      // Post to /user/shop
      await axiosInstance.post("/user/shop", providerJson, {
        headers: {
          "Content-Type": "application/json", // Set header for JSON
        },
      });

      // Post to /user/edit-profile
      await axiosInstance.post("/user/edit-profile", personalFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Open success modal
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  if (!user) {
    return "";
  }
  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <>
      <NavbarLogo />
      <div className="container px-6">
        <div className="max-w-xl mx-auto mt-3">
          <Stepper
            steps={steps}
            currentStep={currentStep}
            stepperTitle={"Daftar Sebagai Penyedia Kesenian"}
            stepperSubtitle={
              "Daftarkan diri Anda sebagai penyedia kesenian dan mulai tawarkan produk serta jasa kesenian daerah Anda"
            }
          />

          {/* Step 1: Data Pribadi */}
          {currentStep === 0 && (
            <div className="mt-5">
              <AvatarUpload
                title={"Upload foto profil"}
                onImageSelect={(file) =>
                  handleImageSelect(file, "personalInfo", "profile_picture")
                }
              />

              <div className="flex flex-col gap-5">
                <TextInput
                  label="Nama Lengkap"
                  placeholder="Masukkan nama lengkap"
                  value={formData.personalInfo.name}
                  onChange={(e) => handleInputChange(e, "personalInfo", "name")}
                />

                <TextInput
                  label="Username"
                  placeholder="Masukkan username"
                  value={formData.personalInfo.username}
                  onChange={(e) =>
                    handleInputChange(e, "personalInfo", "username")
                  }
                />

                <TextInput
                  label="Nomor Telepon"
                  placeholder="Masukkan nomor telepon"
                  value={formData.personalInfo.call_number}
                  onChange={(e) =>
                    handleInputChange(e, "personalInfo", "call_number")
                  }
                />

                <DateInput
                  label="Tanggal Lahir"
                  value={formData.personalInfo.birth_date}
                  onChange={(e) =>
                    handleInputChange(e, "personalInfo", "birth_date")
                  }
                />

                <TextInput
                  label="Tempat Lahir"
                  placeholder="Masukkan tempat lahir"
                  value={formData.personalInfo.birth_location}
                  onChange={(e) =>
                    handleInputChange(e, "personalInfo", "birth_location")
                  }
                />
              </div>
              <div className="mt-5">
                <label className="text-sm font-semibold">Jenis Kelamin</label>
                <div className="flex mt-1 space-x-3">
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
                      checked={formData.personalInfo.gender === "male"}
                      onChange={(e) =>
                        handleInputChange(e, "personalInfo", "gender")
                      }
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
                      checked={formData.personalInfo.gender === "female"}
                      onChange={(e) =>
                        handleInputChange(e, "personalInfo", "gender")
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Data Penyedia Kesenian */}
          {currentStep === 1 && (
            <div className="mt-5">
              {/* <AvatarUpload
              title={"Upload foto penyedia kesenian"}
              onImageSelect={(file) =>
                handleImageSelect(file, "providerInfo", "providerprofile_picture")
              }
            /> */}

              <div className="flex flex-col gap-5">
                <TextInput
                  label="Nama Penyedia Kesenian"
                  placeholder="Masukkan nama penyedia kesenian"
                  value={formData.providerInfo.name}
                  onChange={(e) => handleInputChange(e, "providerInfo", "name")}
                />

                <TextareaInput
                  label="Deskripsi Penyedia Kesenian"
                  placeholder="Masukkan deskripsi penyedia kesenian"
                  value={formData.providerInfo.des}
                  onChange={(e) => handleInputChange(e, "providerInfo", "desc")}
                  textarea
                />

                <TextareaInput
                  label="Alamat"
                  placeholder="Masukkan alamat"
                  value={formData.providerInfo.address}
                  onChange={(e) =>
                    handleInputChange(e, "providerInfo", "address")
                  }
                />

                <SearchInput
                  label={
                    <>
                      <div className="text-sm font-semibold text-black ">
                        Provinsi
                      </div>
                    </>
                  }
                  placeholder="Pilih provinsi"
                  dataKey="provinces"
                  apiUrl="/provinces"
                  mapData={(item) => item.name}
                  value={formData.providerInfo.province}
                  handleSelect={(selected) =>
                    handleInputChange(
                      { target: { value: selected } },
                      "providerInfo",
                      "province"
                    )
                  }
                />
              </div>
              <SearchInput
                label={
                  <>
                    <div className="mt-5 text-sm font-semibold text-black">
                      Kabupaten/kota
                    </div>
                  </>
                }
                placeholder="Pilih kabupaten/kota"
                apiUrl={`/cities-by-province/${formData.providerInfo.province}`}
                dataKey="cities"
                mapData={(item) => item.name}
                value={formData.providerInfo.city_id}
                handleSelect={(selected) =>
                  handleInputChange(
                    { target: { value: selected } },
                    "providerInfo",
                    "city_id"
                  )
                }
                disabled={!formData.providerInfo.province} // Disable if province is not selected
              />

              <Selection
                name={
                  <>
                    <div className="mt-5 text-sm font-semibold text-black">
                      Kategori Kesenian
                    </div>
                  </>
                }
                options={categoryOptions}
                selectedOptions={categoryOptions.filter((option) =>
                  formData.providerInfo.categories.includes(option.value)
                )}
                onSelect={handleCategorySelect}
                placeholder="Kategori kesenian"
                isMulti={true}
              />
            </div>
          )}

          {/* Step 3: Syarat & Ketentuan */}
          {currentStep === 2 && (
            <div className="mt-5">
              <div className="p-10 border rounded-xl">
                <h3 className="mb-3 text-lg font-semibold text-center">
                  Syarat & Ketentuan
                </h3>
                <div className="text-sm terms-content md:text-base">
                  <p>
                    Dengan mendaftar sebagai penyedia kesenian, Anda menyetujui
                    bahwa Anda akan menjual produk/jasa kesenian yang sesuai
                    dengan aturan dan ketentuan platform Senikita.
                    <br />
                    <br />
                    Aturan dan ketentuan ini termasuk, tetapi tidak terbatas
                    pada, kebijakan terkait kualitas produk, hak cipta, dan
                    tanggung jawab atas kerugian atau kerusakan yang mungkin
                    timbul akibat penggunaan platform.
                    <br />
                    <br />
                    Kami berhak untuk mengubah syarat dan ketentuan ini
                    sewaktu-waktu tanpa pemberitahuan sebelumnya. Anda
                    diharapkan untuk memeriksa syarat dan ketentuan ini secara
                    berkala untuk memastikan bahwa Anda memahami dan setuju
                    dengan perubahan tersebut.
                    <br />
                    <br />
                    Jika Anda memiliki pertanyaan atau membutuhkan klarifikasi
                    lebih lanjut mengenai syarat dan ketentuan ini, silakan
                    hubungi tim dukungan pelanggan kami.
                  </p>
                </div>
                <div className="mt-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.termsAccepted}
                      onChange={handleTermsChange}
                    />
                    <span className="ml-2 font-semibold">
                      Saya menyetujui syarat & ketentuan
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="px-4 py-2 font-semibold border border-secondary text-secondary rounded-xl "
              >
                Sebelumnya
              </button>
            )}

            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`px-4 py-2 rounded-xl ${isStepValid()
                  ? "bg-secondary text-white font-semibold hover:bg-opacity_id -90"
                  : "bg-gray-200 text-gray-400 font-semibold"
                  }`}
              >
                Selanjutnya
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isStepValid()}
                className={`px-4 py-2 rounded-xl ${isStepValid()
                  ? "bg-tertiary text-white font-semibold hover:bg-opacity_id-90"
                  : "bg-gray-200 text-gray-400 font-semibold"
                  }`}
              >
                Selesai
              </button>
            )}
          </div>
        </div>
        <FooterLogo />

        <SucesssModal
          title="Pendaftaran Berhasil"
          message="Kami sedang meninjau informasi yang Anda berikan dan akan melakukan verifikasi. Tunggu konfirmasi dari kami dalam waktu 1x24 jam. "
          buttonText="Kembali ke Beranda"
          buttonLink="/"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
};

export default ArtProviderRegister;
