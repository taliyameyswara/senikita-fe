import { useState, useEffect } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import SenimanDashboardLayout from "../../../../layouts/SenimanDashboardLayout";
import Stepper from "../../../../components/Stepper";
import TextInput from "../../../../components/form-input/TextInput";
import Selection from "../../../../components/Selection";
import MultipleImageUploader from "../../../../components/MultipleImageUploader";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import PriceInput from "../../../../components/form-input/PriceInput";
import { useAxiosInstance } from "../../../../config/axiosConfig";
import FullPageLoader from "../../../../components/loading/FullPageLoader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SelectionOne from "../../../../components/SelectionOne";
import * as tf from "@tensorflow/tfjs";

const AddService = () => {
  const [model, setModel] = useState(null);
  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadLayersModel('/model/CNNImage/model.json');
        setModel(loadedModel);
        console.log("Model loaded successfully!");
      } catch (error) {
        console.error("Error loading model:", error);
        toast.error("Gagal memuat model untuk klasifikasi gambar.");
      }
    };

    loadModel();
  }, []);

  const predictImage = async (imageElement) => {
    if (!model) return null;

    const imgTensor = tf.browser.fromPixels(imageElement)
      .resizeNearestNeighbor([150, 150])
      .toFloat()
      .div(tf.scalar(255))
      .expandDims();

    const prediction = model.predict(imgTensor);
    const result = (await prediction.data())[0]; // Konversi hasil ke dalam array untuk mendapatkan nilai

    return result;
  };



  const axiosInstance = useAxiosInstance();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [loading, setLoading] = useState(false); // State untuk loading
  const navigate = useNavigate();
  const [typeOptions, settypeOptions] = useState(null);

  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/seniman/dashboard" },
    { label: "Daftar Kesenian", to: "/seniman/dashboard/kesenian" },
    { label: "Tambah Jasa", to: "/seniman/dashboard/kesenian/addservice" },
  ];

  const steps = ["Informasi Jasa", "Foto Jasa", "Publish"];
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    category_id: null, // Simpan sebagai satu objek
    name: "",
    desc: "",
    price: 0,
    images: [],
    agreeTerms: false,
    person_amount: 0,
    type: null, // Simpan sebagai satu objek
  });

  const options = [
    { value: "hari", label: "Pembayaran per hari" },
    { value: "tampil", label: "Pembayaran per tampil" },
    { value: "jam", label: "Pembayaran per jam" },
  ];

  const handleNextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const handlePreviousStep = () => setCurrentStep((prevStep) => prevStep - 1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handledescChange = (value) => {
    setFormData((prevFormData) => ({ ...prevFormData, desc: value }));
  };

  const handleCheckboxChange = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      agreeTerms: !prevFormData.agreeTerms,
    }));
  };

  const handleSubmit = async () => {
    if (isStepValid()) {
      console.log("Service submitted:", formData);

      const postFormData = new FormData();

      postFormData.append("category_id", formData.category_id.value);
      postFormData.append("name", formData.name);
      postFormData.append("desc", formData.desc);
      postFormData.append("price", formData.price);
      postFormData.append("stock", formData.stock);
      postFormData.append("person_amount", formData.person_amount);
      postFormData.append("type", formData.type.value);

      if (formData.images[0]) {
        postFormData.append("thumbnail", formData.images[0].file);
      }
      formData.images.slice(1).forEach((image, index) => {
        postFormData.append(`service_image[]`, image.file);
      });
      setLoading(true);
      for (const image of formData.images) {
        const img = new Image();
        img.src = URL.createObjectURL(image.file);

        await new Promise((resolve) => {
          img.onload = async () => {
            const result = await predictImage(img);
            console.log(result)
            if (result >= 0.65) {
              toast.error("Gambar diklasifikasikan sebagai berbahaya.");
              setLoading(false);
              return;
            }
            resolve();
          };
        });
      }

      axiosInstance
        .post("/user/shop/service", postFormData, {
          headers: {
            "Content-Type": "multipart/form-data", // Mengatur header untuk multipart/form-data
          },
        })
        .then((response) => {
          toast.success("Jasa Kesenian berhasil ditambahkan");
          navigate("/seniman/dashboard/kesenian");
        })
        .catch((error) => {
          toast.error("Gagal menambahkan produk");
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return (
          formData.name.trim().length > 0 &&
          formData.desc.trim().length > 0 &&
          formData.price > 0 &&
          formData.category_id !== null &&
          formData.person_amount > 0,
          formData.type !== null
        );
      case 1:
        return formData.images.length > 0;
      case 2:
        return formData.agreeTerms;
      default:
        return false;
    }
  };

  useEffect(() => {
    axiosInstance
      .get("/category")
      .then((response) => {
        console.log(response.data.data.data);
        const category_id = response.data.data.data.map((category) => ({
          value: category.id.toString(),
          label: category.name,
        }));
        setCategoryOptions(category_id);
      })
      .catch((err) => { })
      .finally(() => { });
  }, []);

  return (
    <SenimanDashboardLayout pageTitle="Dashboard Seniman | Daftar Kesenian">
      <div className="flex flex-col gap-2 p-3 border rounded-xl">
        <div className="p-3 py-5 border rounded-xl bg-gray-50">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 p-8">
          <div>
            <Stepper
              steps={steps}
              currentStep={currentStep}
              stepperTitle="Tambah Jasa"
              stepperSubtitle="Lengkapi informasi jasa yang akan dijual"
            />
            {currentStep === 0 && (
              <div>
                {/* Step 1: Informasi jasa */}
                <div className="mb-5">
                  <SelectionOne
                    name={
                      <>
                        <div className="mt-5 text-sm font-semibold text-black">
                          Kategori Kesenian
                        </div>
                      </>
                    }
                    options={categoryOptions}
                    selectedOption={formData.category_id}
                    onSelect={(option) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        category_id: option,
                      }))
                    }
                    placeholder="Pilih Kategori"
                  />
                </div>

                <div className="mb-5">
                  <TextInput
                    label="Nama Jasa"
                    placeholder="Masukkan nama jasa"
                    value={formData.name}
                    name="name"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-5">
                  <label className="text-sm font-semibold">
                    Deskripsi Jasa
                  </label>
                  <ReactQuill
                    theme="snow"
                    value={formData.desc}
                    onChange={handledescChange}
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
                <div className="mb-5">
                  <SelectionOne
                    name={
                      <>
                        <div className="mt-5 text-sm font-semibold text-black">
                          Tipe Waktu Kesenian
                        </div>
                      </>
                    }
                    options={options}
                    selectedOption={formData.type}
                    onSelect={(option) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        type: option,
                      }))
                    }
                    placeholder="Pilih Tipe Waktu Kesenian"
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="col-span-2 sm:col-span-1">
                    <PriceInput
                      label="Harga Jasa"
                      placeholder="Masukkan harga jasa"
                      value={formData.price}
                      name="price"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <TextInput
                      label="Jumlah Orang"
                      placeholder="Masukkan Jumlah Orang"
                      value={formData.person_amount}
                      name="person_amount"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}
            {currentStep === 1 && (
              <div>
                {/* Step 2: Foto jasa */}
                <MultipleImageUploader
                  title={
                    <>
                      <div className="text-lg font-semibold">
                        Upload Gambar Jasa
                      </div>
                      <div className="text-sm text-gray-400 ">
                        Pilih foto jasa atau tarik dan letakkan hingga 5 foto
                        sekaligus di sini dengan minimal 1 foto utama
                        (thumbnail).
                      </div>
                      <div className="mb-4 text-sm text-gray-400">
                        Upload min 3 foto jasa yang menarik dan berbeda satu
                        sama lain untuk menarik perhatian pembeli.
                      </div>
                    </>
                  }
                  images={formData.images}
                  setImages={(images) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      images,
                    }))
                  }
                  maxImages={5}
                  acceptedFormats={[".jpg", ".jpeg", ".png"]}
                  minSize={100}
                  optimalSize={1200}
                />
              </div>
            )}
            {currentStep === 2 && (
              <div className="mt-5">
                <div className="p-6 border rounded-xl">
                  <h3 className="mb-3 text-lg font-semibold text-center">
                    Syarat & Ketentuan Upload Jasa di Platform SeniKita
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
                  className="px-4 py-2 font-semibold border border-secondary text-secondary rounded-xl"
                >
                  Sebelumnya
                </button>
              )}

              {currentStep < steps.length - 1 ? (
                <button
                  onClick={handleNextStep}
                  disabled={!isStepValid()}
                  className={`px-4 py-2 rounded-xl ${isStepValid()
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
                  className={`px-4 py-2 rounded-xl ${isStepValid()
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

export default AddService;
