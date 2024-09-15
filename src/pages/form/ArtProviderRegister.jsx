import React, { useState } from "react";
import Stepper from "../../components/Stepper";
import AvatarUpload from "../../components/AvatarUpload";
import NavbarLogo from "../../components/navbar/NavbarLogo";
import FooterLogo from "../../components/footer/FooterLogo";
import TextInput from "../../components/form-input/TextInput";
import SelectInput from "../../components/form-input/SelectInput";
import DateInput from "../../components/form-input/DateInput";
import SucesssModal from "../../components/SuccessModal";
import Selection from "../../components/Selection";

const ArtProviderRegister = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    personalInfo: {
      photo: null,
      fullName: "",
      username: "",
      phone: "",
      birthDate: "",
      birthPlace: "",
      gender: "",
    },
    providerInfo: {
      providerPhoto: null,
      providerName: "",
      providerDescription: "",
      address: "",
      city: "",
      province: "",
      artCategory: [],
    },
    termsAccepted: false,
  });

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
      const { fullName, username, phone, birthDate, birthPlace, gender } =
        formData.personalInfo;
      return fullName && username && phone && birthDate && birthPlace && gender;
    }
    if (currentStep === 1) {
      const {
        providerName,
        providerDescription,
        address,
        city,
        province,
        artCategory,
      } = formData.providerInfo;
      return (
        providerName &&
        providerDescription &&
        address &&
        city &&
        province &&
        artCategory
      );
    }
    if (currentStep === 2) {
      return formData.termsAccepted;
    }
    return false;
  };

  const handleSubmit = () => {
    setIsModalOpen(true);
  };

  const [selectedCategoryOptions, setSelectedCategoryOptions] = useState([]);
  const categoryOptions = [
    { value: "Seni Tari", label: "Seni Tari" },
    { value: "Seni Rupa", label: "Seni Rupa" },
    { value: "Seni Musik", label: "Seni Musik" },
  ];
  const handleCategorySelect = (selected) => {
    const selectedValues = selected.map((option) => option.value);
    const updatedFormData = {
      ...formData,
      providerInfo: {
        ...formData.providerInfo,
        artCategory: selectedValues,
      },
    };
    setFormData(updatedFormData);
    setSelectedCategoryOptions(selected);
    console.log("Updated Form Data:", updatedFormData); // Log the updated form data
  };

  return (
    <div className="container px-6 mb-8">
      <NavbarLogo />
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
                handleImageSelect(file, "personalInfo", "photo")
              }
            />

            <TextInput
              label="Nama Lengkap"
              placeholder="Masukkan nama lengkap"
              value={formData.personalInfo.fullName}
              onChange={(e) => handleInputChange(e, "personalInfo", "fullName")}
            />

            <TextInput
              label="Username"
              placeholder="Masukkan username"
              value={formData.personalInfo.username}
              onChange={(e) => handleInputChange(e, "personalInfo", "username")}
            />

            <TextInput
              label="Nomor Telepon"
              placeholder="Masukkan nomor telepon"
              value={formData.personalInfo.phone}
              onChange={(e) => handleInputChange(e, "personalInfo", "phone")}
            />

            <DateInput
              label="Tanggal Lahir"
              value={formData.personalInfo.birthDate}
              onChange={(e) =>
                handleInputChange(e, "personalInfo", "birthDate")
              }
            />

            <TextInput
              label="Tempat Lahir"
              placeholder="Masukkan tempat lahir"
              value={formData.personalInfo.birthPlace}
              onChange={(e) =>
                handleInputChange(e, "personalInfo", "birthPlace")
              }
            />

            <div className="mb-5">
              <label className="text-sm font-semibold">Jenis Kelamin</label>
              <div className="mt-1 flex space-x-3">
                <label
                  htmlFor="male"
                  className="flex-1 flex space-x-2 justify-between items-center p-3 py-2 border border-gray-300 rounded-xl"
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
                  className="flex-1 flex space-x-2 justify-between items-center p-3 py-2 border border-gray-300 rounded-xl"
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
            <AvatarUpload
              title={"Upload foto penyedia kesenian"}
              onImageSelect={(file) =>
                handleImageSelect(file, "providerInfo", "providerPhoto")
              }
            />

            <TextInput
              label="Nama Penyedia Kesenian"
              placeholder="Masukkan nama penyedia kesenian"
              value={formData.providerInfo.providerName}
              onChange={(e) =>
                handleInputChange(e, "providerInfo", "providerName")
              }
            />

            <TextInput
              label="Deskripsi Penyedia Kesenian"
              placeholder="Masukkan deskripsi penyedia kesenian"
              value={formData.providerInfo.providerDescription}
              onChange={(e) =>
                handleInputChange(e, "providerInfo", "providerDescription")
              }
              textarea
            />

            <TextInput
              label="Alamat"
              placeholder="Masukkan alamat"
              value={formData.providerInfo.address}
              onChange={(e) => handleInputChange(e, "providerInfo", "address")}
            />

            <SelectInput
              label="Kabupaten/kota"
              placeholder={"Pilih kabupaten/kota"}
              options={[
                { value: "Semarang", label: "Semarang" },
                { value: "Demak", label: "Demak" },
                { value: "Kudus", label: "Kudus" },
              ]}
              value={formData.providerInfo.city}
              onChange={(selected) =>
                handleInputChange(
                  { target: { value: selected.value } },
                  "providerInfo",
                  "city"
                )
              }
            />

            <SelectInput
              label="Provinsi"
              placeholder={"Pilih provinsi"}
              options={[
                { value: "Jawa Tengah", label: "Jawa Tengah" },
                { value: "Jawa Barat", label: "Jawa Barat" },
                { value: "Jawa Timur", label: "Jawa Timur" },
              ]}
              value={formData.providerInfo.province}
              onChange={(selected) =>
                handleInputChange(
                  { target: { value: selected.value } },
                  "providerInfo",
                  "province"
                )
              }
            />

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
                formData.providerInfo.artCategory.includes(option.value)
              )}
              onSelect={handleCategorySelect}
              placeholder="Pilih kategori kesenian"
              isMulti={true}
            />
          </div>
        )}

        {/* Step 3: Syarat & Ketentuan */}
        {currentStep === 2 && (
          <div className="mt-5">
            <div className="border rounded-xl p-6">
              <h3 className="font-semibold text-center text-lg mb-3">
                Syarat & Ketentuan
              </h3>
              <div className="terms-content md:text-base text-sm">
                <p>
                  Dengan mendaftar sebagai penyedia kesenian, Anda menyetujui
                  bahwa Anda akan menjual produk/jasa kesenian yang sesuai
                  dengan aturan dan ketentuan platform Senikita.
                  <br />
                  <br />
                  Aturan dan ketentuan ini termasuk, tetapi tidak terbatas pada,
                  kebijakan terkait kualitas produk, hak cipta, dan tanggung
                  jawab atas kerugian atau kerusakan yang mungkin timbul akibat
                  penggunaan platform.
                  <br />
                  <br />
                  Kami berhak untuk mengubah syarat dan ketentuan ini
                  sewaktu-waktu tanpa pemberitahuan sebelumnya. Anda diharapkan
                  untuk memeriksa syarat dan ketentuan ini secara berkala untuk
                  memastikan bahwa Anda memahami dan setuju dengan perubahan
                  tersebut.
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

        <div className="mt-8 flex justify-between">
          {currentStep > 0 && (
            <button
              onClick={handlePrev}
              className="px-4 py-2 border border-secondary text-secondary rounded-xl font-semibold "
            >
              Sebelumnya
            </button>
          )}

          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`px-4 py-2 rounded-xl ${
                isStepValid()
                  ? "bg-secondary text-white font-semibold hover:bg-opacity-90"
                  : "bg-gray-200 text-gray-400 font-semibold"
              }`}
            >
              Selanjutnya
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className={`px-4 py-2 rounded-xl ${
                isStepValid()
                  ? "bg-tertiary text-white font-semibold hover:bg-opacity-90"
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
  );
};

export default ArtProviderRegister;
