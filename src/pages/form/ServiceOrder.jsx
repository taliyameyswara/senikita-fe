import React, { useState } from "react";
import Stepper from "../../components/Stepper";
import TextInput from "../../components/form-input/TextInput";
import TextareaInput from "../../components/form-input/TextareaInput";
import Navbar from "../../components/navbar/Navbar";
import SearchInput from "../../components/form-input/SearchInput";
import FileUpload from "../../components/FileUpload";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ProductTransactionCard from "../user/transaction/product/ProductTransactionCard";
import { useAxiosInstance } from "../../config/axiosConfig";
import { toast } from "react-toastify";
import moment from "moment";
const ServiceOrder = () => {
  const axiosInstance = useAxiosInstance();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    activity_name: "",
    name: "",
    phone: "",
    activity_date: "",
    activity_time: "",
    address: "",
    city_id: "",
    province_id: "",
    attendee: "",
    description: "",
    optional_document: null,
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
    if (isStepValid()) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Buat objek FormData untuk pengiriman data
    const data = new FormData();
    data.append("service_id", service.id);
    data.append("qty", service.qty);
    data.append("activity_name", formData.activity_name);
    data.append("name", formData.name);
    data.append("phone", formData.phone);

    const formattedDate = moment(formData.activity_date).format("DD/MM/YYYY");
    data.append("activity_date", formattedDate);

    data.append("activity_time", formData.activity_time);
    data.append("address", formData.address);
    data.append("city_id", formData.city_id);
    data.append("province_id", formData.province_id);
    data.append("note", formData.note || ""); // Default empty string if no note
    data.append("attendee", formData.attendee || ""); // Default empty string if no attendee
    data.append("description", formData.description || ""); // Default empty string if no description
    data.append("termsAccepted", formData.termsAccepted ? "1" : "0"); // For checkbox

    // Menambahkan setiap file dari optional_document ke FormData
    if (formData.optional_document && formData.optional_document.length > 0) {
      formData.optional_document.forEach((file, index) => {
        data.append(`optional_document[${index}]`, file);
      });
    }

    try {
      const response = await axiosInstance.post("/user/order-service", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        maxBodyLength: Infinity,
      });

      if (response.status === 201) {
        toast.success("Pesanan berhasil dibuat!");
        navigate("/user/dashboard/transaction"); // Redirect to transaction dashboard
      } else {
        toast.error("Gagal mengirim data!");
        console.log("Gagal mengirim data: ", response.status);
      }
    } catch (error) {
      if (error.response) {
        const serverErrors = error.response.data.errors;
        for (const key in serverErrors) {
          if (serverErrors.hasOwnProperty(key)) {
            serverErrors[key].forEach((errorMessage) => {
              toast.error(errorMessage);
            });
          }
        }
      } else if (error.request) {
        toast.error("Tidak ada respon dari server");
      } else {
        toast.error("Terjadi kesalahan dalam menambahkan alamat");
      }
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return (
          formData.activity_name.trim() !== "" &&
          formData.name.trim() !== "" &&
          formData.phone.trim() !== "" &&
          formData.activity_date.trim() !== "" &&
          formData.activity_time.trim() !== "" &&
          formData.address.trim() !== "" &&
          formData.city_id !== "" &&
          formData.province_id !== ""
        );
      case 1:
        return (
          formData.description.trim() !== "" ||
          formData.optional_document !== null // Supporting file is optional
        );
      case 2:
        return formData.termsAccepted;
      default:
        return false;
    }
  };

  const [service, setService] = useState(null);
  useEffect(() => {
    setService(null);
    const selectedItems = location.state?.selectedService || [];
    setService(selectedItems);
    if (selectedItems === null) {
      navigate("/");
    }
    console.log(service);
  }, [location.state, navigate]);

  return (
    <div className="">
      <Navbar />
      <div className="container mx-auto p-8 lg:w-[60%] w-full">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          stepperTitle="Pesan Layanan Kesenian"
          stepperSubtitle="Isi detail pesanan Anda sesuai langkah-langkah berikut."
        />

        <form onSubmit={handleSubmit}>
          {currentStep === 0 && (
            <div className="mt-8 space-y-6">
              {service && (
                <div className="gap-2">
                  <label className="text-sm font-semibold ">
                    Nama Layanan Kesenian
                  </label>
                  <ProductTransactionCard
                    product={service}
                    quantity={service.qty}
                  />
                </div>
              )}
              {/* nama penganggunjawab */}
              <TextInput
                label={
                  <>
                    Nama Penanggungjawab
                    <div className="font-normal text-gray-500">
                      Tip: Masukkan nama lengkap penanggung jawab
                      acara/kegiatan.
                    </div>
                  </>
                }
                placeholder="Masukkan nama acara/kegiatan"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {/* nomor telepon penanggung jawab */}
              <TextInput
                label={
                  <>
                    Nomor Telepon
                    <div className="font-normal text-gray-500">
                      Tip: Gunakan nomor telepon yang bisa dihubungi. Pastikan
                      nomor telepon yang Anda masukkan benar dan aktif.
                    </div>
                  </>
                }
                placeholder="Masukkan nomor telepon"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />

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
                name="activity_name"
                value={formData.activity_name}
                onChange={handleInputChange}
              />
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
                name="activity_date"
                value={formData.activity_date}
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
                name="activity_time"
                value={formData.activity_time}
                onChange={handleInputChange}
              />
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
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
              <div className="grid gap-4 md:grid-cols-2">
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
                  value={formData.province_id}
                  handleSelect={(selected) =>
                    handleSelectChange(selected, "province_id")
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
                  apiUrl={`/cities-by-province/${formData.province_id}`}
                  dataKey="cities"
                  mapData={(item) => item.name}
                  value={formData.city_id}
                  handleSelect={(selected) =>
                    handleSelectChange(selected, "city_id")
                  }
                  disabled={!formData.province_id} // Disable if province is not selected
                />
              </div>
              <TextInput
                label="Jumlah Peserta (Opsional)"
                placeholder="Estimasi jumlah peserta acara"
                name="attendee"
                value={formData.attendee}
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
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
              <div>
                <FileUpload
                  title="File Pendukung (Opsional)"
                  onFilesSelect={(files) =>
                    setFormData({ ...formData, optional_document: files })
                  }
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="mt-5">
              <div className="p-10 border rounded-xl">
                <h3 className="mb-6 text-2xl font-bold text-center text-gray-800">
                  Syarat & Ketentuan
                </h3>
                <div className="text-base leading-relaxed text-gray-700 terms-content">
                  <p className="mb-2">
                    Dengan menggunakan platform Senikita, Anda menyetujui untuk
                    mematuhi seluruh Syarat dan Ketentuan berikut:
                  </p>
                  <ul className="space-y-2 list-disc ">
                    <li>
                      Platform Senikita menyediakan layanan untuk memesan
                      pertunjukan seni dan membeli produk kesenian lokal.
                      Senikita tidak bertanggung jawab atas kualitas, keamanan,
                      atau ketersediaan layanan yang disediakan oleh pihak
                      ketiga atau seniman yang terdaftar di platform.
                    </li>
                    <li>
                      Setiap pemesanan dianggap final setelah pembayaran
                      berhasil diproses. Senikita berhak membatalkan pemesanan
                      apabila terjadi ketidaksesuaian informasi atau pelanggaran
                      terhadap ketentuan yang berlaku.
                    </li>
                    <li>
                      Pembayaran dapat dilakukan melalui metode pembayaran yang
                      tersedia di platform. Kebijakan pengembalian dana berlaku
                      dalam kondisi tertentu, seperti pembatalan layanan oleh
                      penyedia atau ketidaksesuaian layanan yang diterima dengan
                      yang dipesan.
                    </li>
                    <li>
                      Pengguna setuju untuk tidak menggunakan platform ini untuk
                      kegiatan yang melanggar hukum atau merugikan pihak lain.
                      Konten yang melanggar hak kekayaan intelektual atau
                      bersifat diskriminatif dilarang.
                    </li>
                    <li>
                      Senikita berhak untuk mengubah, menambahkan, atau
                      menghapus bagian dari Syarat dan Ketentuan ini kapan saja.
                      Setiap perubahan akan diinformasikan melalui platform.
                    </li>
                  </ul>
                  <p className="mt-2">
                    Jika Anda memiliki pertanyaan mengenai Syarat dan Ketentuan
                    ini, silakan hubungi tim dukungan pelanggan kami melalui
                    email:{" "}
                    <a
                      href="mailto:support@senikita.com"
                      className="text-blue-600 hover:underline"
                    >
                      officialsenikita@gmail.com
                    </a>
                    .
                  </p>
                </div>
                <div className="flex items-start mt-4">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleCheckboxChange}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-3 text-gray-800">
                    Saya menyetujui syarat dan ketentuan yang berlaku.
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {currentStep > 0 && (
              <button
                onClick={handlePreviousStep}
                className="px-4 py-2 font-semibold border border-secondary text-secondary rounded-xl"
              >
                Sebelumnya
              </button>
            )}

            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNextStep}
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
        </form>
      </div>
    </div>
  );
};

export default ServiceOrder;
