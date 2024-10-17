import { useState, useEffect } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import SenimanDashboardLayout from "../../../../layouts/SenimanDashboardLayout";
import Stepper from "../../../../components/Stepper";
import TextInput from "../../../../components/form-input/TextInput";
import MultipleImageUploader from "../../../../components/MultipleImageUploader";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import PriceInput from "../../../../components/form-input/PriceInput";
import FullPageLoader from "../../../../components/loading/FullPageLoader";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import SelectionOne from "../../../../components/SelectionOne";
import { useManagementServiceApi } from "../../../../api/shop/ManagementServiceApi";
import { useCategoryApi } from "../../../../api/landing/CategoryApi";
import { useImageCorsApi } from "../../../../api/shop/ImageCorsApi";

const EditService = () => {
  // import navigate
  const navigate = useNavigate();

  // api service
  const { getServiceById, updateService } = useManagementServiceApi();
  const { fetchAllCategories } = useCategoryApi();
  const { fetchImage } = useImageCorsApi();

  // params id 
  const { id } = useParams();

  // breadcrumb
  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/seniman/dashboard" },
    { label: "Daftar Kesenian", to: "/seniman/dashboard/kesenian" },
    { label: "Edit Jasa", to: `/seniman/dashboard/kesenian/editservice/${id}` },
  ];

  // handle steps page
  const steps = ["Informasi Jasa", "Foto Jasa", "Publish"];
  const [currentStep, setCurrentStep] = useState(0);
  const handleNextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const handlePreviousStep = () => setCurrentStep((prevStep) => prevStep - 1);
  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return (
          formData.name.trim().length > 0 &&
          formData.desc.trim().length > 0 &&
          formData.price > 0 &&
          formData.category_id !== null &&
          formData.person_amount > 0 &&
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

  // handle state management
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [loading, setLoading] = useState(false);
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

  // option category
  const options = [
    { value: "hari", label: "Pembayaran per hari" },
    { value: "tampil", label: "Pembayaran per tampil" },
    { value: "jam", label: "Pembayaran per jam" },
  ];


  // handle input
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
      // price: service.price,
    }));
  };

  const handleSubmit = async () => {
    if (isStepValid()) {
      const postFormData = new FormData();
      postFormData.append("category_id", formData.category_id.value);
      postFormData.append("name", formData.name);
      postFormData.append("desc", formData.desc);
      postFormData.append("price", formData.price);
      postFormData.append("person_amount", formData.person_amount);
      postFormData.append("type", formData.type.value);
      if (formData.images[0]) {
        postFormData.append("thumbnail", formData.images[0].file);
      }
      formData.images.slice(1).forEach((image) => {
        postFormData.append(`service_image[]`, image.file);
      });
      postFormData.append('_method', 'PUT'); // Metode PUT

      setLoading(true);
      await updateService(id, postFormData)
        .then(() => {
          toast.success("Jasa Kesenian berhasil diubah");
          navigate("/seniman/dashboard/kesenian");
        })
        .catch(() => {
          toast.error("Gagal mengubah jasa");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };



  const getServiceData = async () => {
    try {
      const response = await getServiceById(id);

      const thumbnailBlob = await fetchImage(response.thumbnail);
      const thumbnailFile = new File([thumbnailBlob], "thumbnail.jpg", {
        type: thumbnailBlob.type,
      });

      const imagesPromises = response.images.map(async (image, index) => {
        const blob = await fetchImage(image.picture);
        return new File([blob], `image_${index + 1}.jpg`, {
          type: blob.type,
        });
      });

      const imagesFiles = await Promise.all(imagesPromises);

      setFormData({
        category_id: categoryOptions.find(
          (option) => option.value === response.category_id.toString()
        ),
        name: response.name,
        desc: response.desc,
        price: response.price,
        person_amount: response.person_amount,
        type: options.find((option) => option.value === response.type),
        images: [
          { file: thumbnailFile, preview: response.thumbnail },
          ...imagesFiles.map((file, index) => ({
            file: file,
            preview: response.images[index].picture,
          })),
        ],
        agreeTerms: false,
      });

    } catch (error) {
      console.error("Error fetching service data:", error);
    }

  }

  const getAllCategories = async () => {
    try {
      const categories = await fetchAllCategories();
      setCategoryOptions(categories.map((category) => ({
        value: category.id.toString(),
        label: category.name,
      })));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getAllCategories();
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getServiceData();
      setLoading(false);
    }

    fetchData();
  }, [categoryOptions])


  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <SenimanDashboardLayout pageTitle="Dashboard Seniman | Daftar Kesenian">
      <div className="flex flex-col gap-2 p-3 border rounded-xl">
        <div className="p-3 py-5 border rounded-xl bg-gray-50">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <div className="flex flex-col gap-2 p-8">
          <Stepper
            steps={steps}
            currentStep={currentStep}
            stepperTitle="Edit Jasa"
            stepperSubtitle="Perbarui informasi jasa yang akan diubah"
          />
          {currentStep === 0 && (
            <div>
              <div className="mb-5">
                <SelectionOne
                  name={<div className="mt-5 text-sm font-semibold text-black">Kategori Kesenian</div>}
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
                <label className="text-sm font-semibold">Deskripsi Jasa</label>
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
                  formats={["bold", "italic", "underline", "strike", "list", "bullet", "link"]}
                />
              </div>

              <div className="mb-5">
                <SelectionOne
                  name={<div className="mt-5 text-sm font-semibold text-black">Tipe Waktu Kesenian</div>}
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
                    value={formData.price} // Pastikan value ini benar dari state
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
            <MultipleImageUploader
              title={
                <>
                  <div className="text-lg font-semibold">Upload Gambar Jasa</div>
                  <div className="text-sm text-gray-400">
                    Pilih foto jasa atau tarik dan letakkan hingga 5 foto
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
            />
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
                    Anda (seniman) setuju untuk mematuhi syarat dan ketentuan berikut:
                  </p>
                  <p>
                    <strong>Kepemilikan Produk/Jasa</strong>
                    <br />
                    a. Anda menjamin bahwa produk atau jasa yang diunggah adalah milik Anda atau Anda memiliki izin resmi untuk menjual dan/atau menyewakan produk/jasa tersebut di platform kami.
                    <br />
                    b. Produk/jasa yang diunggah tidak melanggar hak cipta, merek dagang, atau hak kekayaan intelektual lainnya dari pihak ketiga.
                  </p>
                  <p>
                    <strong>Deskripsi dan Informasi Produk/Jasa</strong>
                    <br />
                    a. Anda setuju untuk memberikan informasi yang akurat, lengkap, dan jujur tentang produk/jasa yang diunggah.
                    <br />
                    b. Setiap deskripsi, gambar, video, atau media lainnya yang diunggah harus sesuai dengan produk/jasa yang ditawarkan.
                  </p>
                  <p>
                    <strong>Kualitas Produk/Jasa</strong>
                    <br />
                    a. Anda bertanggung jawab untuk memastikan bahwa produk/jasa yang ditawarkan memenuhi standar kualitas yang wajar dan tidak menyesatkan konsumen.
                    <br />
                    b. Produk/jasa yang tidak sesuai dengan deskripsi atau standar kualitas yang dijanjikan dapat mengakibatkan penghapusan listing oleh platform kami.
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
    </SenimanDashboardLayout>
  );
};

export default EditService;
