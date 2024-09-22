import React, { useState } from "react";
import Stepper from "../../components/Stepper";
import TextInput from "../../components/form-input/TextInput";
import TextareaInput from "../../components/form-input/TextareaInput";
import { AiOutlineCheck } from "react-icons/ai";
import Navbar from "../../components/navbar/Navbar";
import SearchInput from "../../components/form-input/SearchInput";
import FileUpload from "../../components/FileUpload";

const ServiceOrder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    eventTime: "",
    location: "",
    city_id: "",
    province: "",
    note: "",
    participants: "",
    specialRequest: "",
    supportingFiles: null,
    termsAccepted: false,
  });

  const steps = [
    "Informasi Kegiatan/Acara",
    "Permintaan Khusus",
    "Persetujuan dan Konfirmasi",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSelectChange = (value, fieldName) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Proses formData ke backend atau API disini.
    console.log(formData);
  };

  return (
    <div className="">
      <Navbar />
      <div className="container mx-auto p-8">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          stepperTitle="Pesan Layanan Kesenian"
          stepperSubtitle="Isi detail pesanan Anda sesuai langkah-langkah berikut."
        />

        <form onSubmit={handleSubmit}>
          {currentStep === 0 && (
            <div className="mt-8 space-y-6">
              <TextInput
                label={
                  <>
                    Nama Acara/Kegiatan
                    <div className="font-normal text-gray-500">
                      Tip: Gunakan nama acara yang jelas dan singkat. Misalnya,
                      'Pernikahan Budi & Ani' atau 'Festival Budaya
                      Kertanegara'.
                    </div>
                  </>
                }
                placeholder="Masukkan nama acara/kegiatan"
                name="eventName"
                value={formData.eventName}
                onChange={handleInputChange}
              />
              {/* <div className="grid md:grid-cols-2 gap-4"> */}
              <TextInput
                type="date"
                label={
                  <>
                    Tanggal
                    <div className="font-normal text-gray-500">
                      Tip: Pilih tanggal yang sesuai dengan hari penyelenggaraan
                      acara Anda. Pastikan tidak ada kesalahan pada tanggal,
                      terutama jika acara melibatkan banyak orang.
                    </div>
                  </>
                }
                name="eventDate"
                value={formData.eventDate}
                onChange={handleInputChange}
              />
              <TextInput
                type="time"
                label={
                  <>
                    Waktu
                    <div className="font-normal text-gray-500">
                      Tip: Masukkan waktu dimulainya acara dengan format 24 jam
                      (misalnya, 18:00 untuk jam 6 sore).
                    </div>
                  </>
                }
                name="eventTime"
                value={formData.eventTime}
                onChange={handleInputChange}
              />
              {/* </div> */}
              <TextareaInput
                label={
                  <>
                    Lokasi Acara
                    <div className="font-normal text-gray-500">
                      Masukkan alamat lengkap acara, termasuk nama jalan, nomor,
                      kelurahan, dan kecamatan. Tambahkan patokan atau arah
                      tambahan jika diperlukan.
                    </div>
                  </>
                }
                placeholder="Alamat lengkap acara"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
              <div className="grid md:grid-cols-2 gap-4">
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
                  value={formData.province}
                  handleSelect={(selected) =>
                    handleSelectChange(selected, "province")
                  }
                />
                <SearchInput
                  label={
                    <>
                      <div className="text-sm font-semibold text-black ">
                        Kabupaten/Kota
                      </div>
                    </>
                  }
                  placeholder="Pilih kabupaten/kota"
                  apiUrl={`/cities-by-province/${formData.province}`}
                  dataKey="cities"
                  mapData={(item) => item.name}
                  value={formData.city_id}
                  handleSelect={(selected) =>
                    handleSelectChange(selected, "city_id")
                  }
                  disabled={!formData.province} // Disable if province is not selected
                />
              </div>
              <TextInput
                label="Jumlah Peserta (Opsional)"
                placeholder="Estimasi jumlah peserta acara"
                name="participants"
                value={formData.participants}
                onChange={handleInputChange}
              />
            </div>
          )}

          {currentStep === 1 && (
            <div className="mt-8 space-y-6">
              <TextareaInput
                label={
                  <>
                    <div className="text-sm font-semibold text-black ">
                      Catatan/Instruksi Tambahan
                    </div>
                    <div className="font-normal text-gray-500">
                      Jelaskan instruksi khusus yang Anda harapkan dari tim
                      kami. Misalnya, preferensi pakaian, atau penyesuaian tema
                      acara.
                    </div>
                  </>
                }
                placeholder="Masukkan permintaan khusus atau instruksi tambahan"
                name="specialRequest"
                value={formData.specialRequest}
                onChange={handleInputChange}
              />
              <div>
                <FileUpload
                  title="File Pendukung (Opsional)"
                  onFileSelect={(file) =>
                    setFormData({ ...formData, supportingFiles: file })
                  }
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="mt-8 space-y-6">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <span>
                    Saya menyetujui syarat dan ketentuan yang berlaku.
                  </span>
                </label>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handlePreviousStep}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Sebelumnya
              </button>
            )}
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-4 py-2 bg-primary text-white rounded-md"
              >
                Selanjutnya
              </button>
            ) : (
              <button
                type="submit"
                className={`px-4 py-2 ${
                  formData.termsAccepted
                    ? "bg-green-500"
                    : "bg-green-300 cursor-not-allowed"
                } text-white rounded-md`}
                disabled={!formData.termsAccepted}
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceOrder;
