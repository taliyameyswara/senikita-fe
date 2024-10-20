import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import SenimanDashboardLayout from "../../../../layouts/SenimanDashboardLayout";
import Stepper from "../../../../components/Stepper";
import TextInput from "../../../../components/form-input/TextInput";
import Selection from "../../../../components/Selection";
import MultipleImageUploader from "../../../../components/MultipleImageUploader";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useAxiosInstance } from "../../../../config/axiosConfig";
import DropdownFilter from "../../../../components/DropdownFilter";
import FullPageLoader from "../../../../components/loading/FullPageLoader";
import PriceInput from "../../../../components/form-input/PriceInput";
import SelectionOne from "../../../../components/SelectionOne";
import { toast } from "react-toastify";
import * as tf from "@tensorflow/tfjs";
// import { useManagemetnp } from "../../../../api/shop/ManagementServiceApi";
import { useManagementProductApi } from "../../../../api/shop/ManagementProductApi";
import { useCategoryApi } from "../../../../api/landing/CategoryApi";
const AddProduct = () => {
  // api
  const { createProduct } = useManagementProductApi();
  const { fetchAllCategories } = useCategoryApi();


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
  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/seniman/dashboard" },
    { label: "Daftar Kesenian", to: "/seniman/dashboard/kesenian" },
    { label: "Tambah Produk", to: "/seniman/dashboard/kesenian/addproduct" },
  ];

  const steps = ["Informasi Produk", "Foto Produk", "Publish"];
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    category_id: null,
    name: "",
    desc: "",
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
      const postFormData = new FormData();

      postFormData.append("category_id", formData.category_id.value); // Kirim value saja
      postFormData.append("name", formData.name);
      postFormData.append("desc", formData.desc);
      postFormData.append("price", formData.price);
      postFormData.append("stock", formData.stock);

      console.log(formData.images);

      if (formData.images[0]) {
        postFormData.append("thumbnail", formData.images[0].file);
      }

      formData.images.slice(1).forEach((image, index) => {
        postFormData.append(`product_images[]`, image.file);
      });
      setLoading(true);

      // Cek setiap gambar sebelum diunggah
      for (const image of formData.images) {
        const img = new Image();
        img.src = URL.createObjectURL(image.file);

        await new Promise((resolve) => {
          img.onload = async () => {
            const result = await predictImage(img);
            console.log(result)
            if (result >= 0.55) {
              toast.error("Gambar terdeksi berbahaya, silahkan ganti gambar anda. ");
              setLoading(false);
              return;
            }
            resolve();
          };
        });
      }


      createProduct(postFormData)
        .then((response) => {
          toast.success("Produk berhasil ditambahkan");
          navigate("/seniman/dashboard/kesenian");
        })
        .catch((error) => {
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
          formData.stock > 0 &&
          formData.category_id != null
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
    const response = fetchAllCategories();
    response.then((data) => {
      const category_id = data.map((category) => ({
        value: category.id.toString(),
        label: category.name,
      }));
      setCategoryOptions(category_id);
    });
  }, []);

  if (loading) {
    return <FullPageLoader />;
  }
  return (
    <SenimanDashboardLayout pageTitle="Dashboard Seniman | Daftar Kesenian">
      <div className="flex flex-col gap-2 p-3 border rounded-xl">
        <div className="p-3 py-5 border rounded-xl bg-gray-50">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 p-8">
          <div className="">
            <Stepper
              steps={steps}
              currentStep={currentStep}
              stepperTitle="Tambah Produk"
              stepperSubtitle="Lengkapi informasi produk yang akan dijual"
            />
            {currentStep === 0 && (
              <div>
                {/* Step 1: Informasi Produk */}
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
                        category_id: option, // Simpan opsi yang dipilih
                      }))
                    }
                    placeholder="Pilih Kategori"
                  />
                </div>

                <div className="mb-5">
                  <TextInput
                    label="Nama Produk"
                    placeholder="Masukkan nama produk"
                    value={formData.name}
                    name="name"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-5">
                  <label className="text-sm font-semibold">
                    Deskripsi Produk
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

                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
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
                  title={
                    <>
                      <div className="text-lg font-semibold">
                        Upload Gambar Produk
                      </div>
                      <div className="text-sm text-gray-400 ">
                        Pilih foto produk atau tarik dan letakkan hingga 5 foto
                        sekaligus di sini dengan minimal 1 foto utama
                        (thumbnail).
                      </div>
                      <div className="mb-4 text-sm text-gray-400">
                        Upload min 3 foto produk yang menarik dan berbeda satu
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

export default AddProduct;
