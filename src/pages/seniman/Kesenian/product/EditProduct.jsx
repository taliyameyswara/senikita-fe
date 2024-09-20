import { useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import SenimanDashboardLayout from "../../../../layouts/SenimanDashboardLayout";
import Stepper from "../../../../components/Stepper";
import TextInput from "../../../../components/form-input/TextInput";
import Selection from "../../../../components/Selection";
import MultipleImageUploader from "../../../../components/MultipleImageUploader";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import PriceInput from "../../../../components/form-input/PriceInput";

const EditProduct = () => {
  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/seniman/dashboard" },
    { label: "Daftar Kesenian", to: "/seniman/dashboard/kesenian" },
    { label: "Tambah Produk", to: "/seniman/dashboard/kesenian/addproduct" },
  ];

  const steps = ["Informasi Produk", "Foto Produk", "Publish"];
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    categories: [],
    productName: "",
    description: "",
    price: 0,
    stock: 1,
    images: [],
    agreeTerms: false,
  });

  const handleNextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const handlePreviousStep = () => setCurrentStep((prevStep) => prevStep - 1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: value };
      console.log(updatedFormData); // Log the updated form data
      return updatedFormData;
    });
  };

  const handleDescriptionChange = (value) => {
    setFormData((prevFormData) => ({ ...prevFormData, description: value }));
  };

  const handleCheckboxChange = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      agreeTerms: !prevFormData.agreeTerms,
    }));
  };

  const handleSubmit = () => {
    if (isStepValid()) {
      console.log("Product submitted:", formData);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return (
          formData.productName.trim().length > 0 &&
          formData.description.trim().length > 0 &&
          formData.price > 0 &&
          formData.stock > 0 &&
          formData.categories.length > 0
        );
      case 1:
        return formData.images.length > 0;
      case 2:
        return formData.agreeTerms;
      default:
        return false;
    }
  };

  return (
    <SenimanDashboardLayout pageTitle="Dashboard Seniman | Daftar Kesenian">
      <div className="flex flex-col gap-2 border p-3 rounded-xl">
        <div className="border p-3 py-5 rounded-xl bg-gray-50">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col gap-2">
          <div className="">
            <Stepper
              steps={steps}
              currentStep={currentStep}
              stepperTitle="Edit Produk"
              stepperSubtitle="Perbarui informasi produk yang akan dijual"
            />
            {currentStep === 0 && (
              <div>
                {/* Step 1: Informasi Produk */}
                <div className="mb-5">
                  <Selection
                    name={
                      <>
                        <div className="mt-5 text-sm font-semibold text-black">
                          Kategori Kesenian
                        </div>
                      </>
                    }
                    options={[
                      { label: "Seni Musik", value: "musik" },
                      { label: "Seni Tari", value: "tari" },
                      { label: "Seni Rupa", value: "rupa" },
                    ]}
                    selectedOptions={formData.categories}
                    onSelect={(options) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        categories: options,
                      }))
                    }
                    placeholder="Pilih Kategori"
                  />
                </div>

                <div className="mb-5">
                  <TextInput
                    label="Nama Produk"
                    placeholder="Masukkan nama produk"
                    value={formData.productName}
                    name="productName"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-5">
                  <label className="text-sm font-semibold">
                    Deskripsi Produk
                  </label>
                  <ReactQuill
                    theme="snow"
                    value={formData.description}
                    onChange={handleDescriptionChange}
                    modules={{
                      toolbar: [
                        ["bold", "italic", "underline", "strike"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link"],
                      ],
                    }}
                    formats={[
                      "bold",
                      "italic",
                      "underline",
                      "strike",
                      "list",
                      "bullet",
                      "link",
                    ]}
                  />
                </div>

                <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                  <PriceInput
                    label="Harga Produk"
                    placeholder="Masukkan harga produk"
                    value={formData.price}
                    name="price"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    type="number"
                    label="Stok Produk"
                    placeholder="Masukkan jumlah stok produk"
                    value={formData.stock}
                    name="stock"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}
            {currentStep === 1 && (
              <div>
                {/* Step 2: Foto Produk */}
                <MultipleImageUploader
                  images={formData.images}
                  setImages={(images) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      images,
                    }))
                  }
                  maxImages={9}
                  acceptedFormats={[".jpg", ".jpeg", ".png"]}
                  minSize={300}
                  optimalSize={1200}
                />
              </div>
            )}
            {currentStep === 2 && (
              <div className="mt-5">
                <div className="p-6 border rounded-xl">
                  <h3 className="mb-3 text-lg font-semibold text-center">
                    Syarat & Ketentuan Upload Produk di Platform SeniKita
                  </h3>
                  <div className="text-sm terms-content md:text-base">
                    <p>
                      Dengan mengunggah produk atau jasa di platform Seni Kita,
                      Anda (seniman) setuju untuk mematuhi syarat dan ketentuan
                      berikut:
                    </p>
                    <p>
                      <strong>Kepemilikan Produk/Jasa</strong>
                      <br />
                      a. Anda menjamin bahwa produk atau jasa yang diunggah
                      adalah milik Anda atau Anda memiliki izin resmi untuk
                      menjual dan/atau menyewakan produk/jasa tersebut di
                      platform kami.
                      <br />
                      b. Produk/jasa yang diunggah tidak melanggar hak cipta,
                      merek dagang, atau hak kekayaan intelektual lainnya dari
                      pihak ketiga.
                    </p>
                    <p>
                      <strong>Deskripsi dan Informasi Produk/Jasa</strong>
                      <br />
                      a. Anda setuju untuk memberikan informasi yang akurat,
                      lengkap, dan jujur tentang produk/jasa yang diunggah.
                      <br />
                      b. Setiap deskripsi, gambar, video, atau media lainnya
                      yang diunggah harus sesuai dengan produk/jasa yang
                      ditawarkan.
                    </p>
                    <p>
                      <strong>Kualitas Produk/Jasa</strong>
                      <br />
                      a. Anda bertanggung jawab untuk memastikan bahwa
                      produk/jasa yang ditawarkan memenuhi standar kualitas yang
                      wajar dan tidak menyesatkan konsumen.
                      <br />
                      b. Produk/jasa yang tidak sesuai dengan deskripsi atau
                      standar kualitas yang dijanjikan dapat mengakibatkan
                      penghapusan listing oleh platform kami.
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.agreeTerms}
                        onChange={handleCheckboxChange}
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
                  onClick={handlePreviousStep}
                  className="px-4 py-2 font-semibold border border-secondary text-secondary rounded-xl "
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
          </div>
        </div>
      </div>
    </SenimanDashboardLayout>
  );
};

export default EditProduct;
