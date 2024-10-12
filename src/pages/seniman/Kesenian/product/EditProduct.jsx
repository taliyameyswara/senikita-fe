import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import SenimanDashboardLayout from "../../../../layouts/SenimanDashboardLayout";
import Stepper from "../../../../components/Stepper";
import TextInput from "../../../../components/form-input/TextInput";
import SelectionOne from "../../../../components/SelectionOne";
import MultipleImageUploader from "../../../../components/MultipleImageUploader";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useAxiosInstance } from "../../../../config/axiosConfig";
import FullPageLoader from "../../../../components/loading/FullPageLoader";
import PriceInput from "../../../../components/form-input/PriceInput";
import { toast } from "react-toastify";
import FormData from "form-data";

const EditProduct = () => {
  const { id } = useParams();
  const axiosInstance = useAxiosInstance();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Informasi Produk", "Foto Produk", "Publish"];

  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/seniman/dashboard" },
    { label: "Daftar Kesenian", to: "/seniman/dashboard/kesenian" },
    { label: "Edit Produk", to: `/seniman/dashboard/kesenian/editproduct/${id}` },
  ];

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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return (
          formData.name.trim().length > 0 &&
          formData.desc.trim().length > 0 &&
          formData.price > 0 &&
          formData.stock > 0 &&
          formData.category_id !== null // Cek bahwa category_id tidak kosong
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
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/user/shop/products/${id}`);
        if (response.data.status === "success") {
          const product = response.data.product;

          const thumbnailUrl = product.thumbnail.split('/storage/')[1];
          const thumbnailResponse = await axiosInstance.get('fetch-image', {
            params: {
              path: thumbnailUrl
            },
            responseType: 'blob',
          });
          const thumbnailBlob = await thumbnailResponse.data;
          const thumbnailFile = new File([thumbnailBlob], "thumbnail.jpg", {
            type: thumbnailBlob.type,
          });
          // }

          const imagesPromises = product.images.map(async (image, index) => {
            const imageUrl = image.picture.split('/storage/')[1];
            const response = await axiosInstance.get('fetch-image', {
              params: {
                path: imageUrl
              },
              responseType: 'blob',
            });
            const blob = await response.data;
            return new File([blob], `image_${index + 1}.jpg`, {
              type: blob.type,
            });
          });

          const imagesFiles = await Promise.all(imagesPromises);

          // Set formData dengan thumbnail dan images
          setFormData({
            category_id: categoryOptions.find(
              (option) => option.value === product.category_id.toString()
            ), // Set category_id dengan objek
            name: product.name,
            desc: product.desc,
            price: product.price,
            stock: product.stock,
            images: [
              { file: thumbnailFile, preview: product.thumbnail }, // Thumbnail sebagai file
              ...imagesFiles.map((file, index) => ({
                file: file,
                preview: product.images[index].picture, // Gambar tambahan sebagai file
              })),
            ],
            agreeTerms: false,
          });
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();

    axiosInstance
      .get("/category")
      .then((response) => {
        const categoryOptions = response.data.data.data.map((category) => ({
          value: category.id.toString(),
          label: category.name,
        }));
        setCategoryOptions(categoryOptions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = () => {
    if (isStepValid()) {
      const postFormData = new FormData();
      postFormData.append("category_id", formData.category_id.value); // Ambil value saja
      postFormData.append("name", formData.name);
      postFormData.append("desc", formData.desc);
      postFormData.append("price", formData.price);
      postFormData.append("stock", formData.stock);

      // Tambahkan file thumbnail baru jika ada
      if (formData.images[0] && formData.images[0].file) {
        postFormData.append("thumbnail", formData.images[0].file);
      }

      // Menambahkan file tambahan yang baru saja diunggah
      formData.images.slice(1).forEach((image, index) => {
        if (image.file) {
          postFormData.append("product_images[]", image.file); // Gambar baru
        }
      });

      postFormData.append('_method', 'PUT'); // Metode PUT

      setLoading(true);
      axiosInstance
        .post(`/user/shop/products/${id}`, postFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          toast.success("Produk berhasil diubah");
          navigate("/seniman/dashboard/kesenian");
        })
        .catch((error) => {
          toast.error("Gagal mengubah produk");
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };



  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <SenimanDashboardLayout pageTitle="Dashboard Seniman | Edit Produk">
      <div className="flex flex-col gap-2 p-3 border rounded-xl">
        <div className="p-3 py-5 border rounded-xl bg-gray-50">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
        <div className="flex flex-col gap-2 p-8">
          <Stepper
            steps={steps}
            currentStep={currentStep}
            stepperTitle="Edit Produk"
            stepperSubtitle="Perbarui informasi produk yang ingin diubah"
          />
          {currentStep === 0 && (
            <div>
              <SelectionOne
                name="Kategori"
                options={categoryOptions}
                selectedOption={formData.category_id} // Gunakan selectedOption
                onSelect={(option) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    category_id: option, // Simpan opsi yang dipilih
                  }))
                }
                placeholder="Pilih Kategori"
              />
              <TextInput
                label="Nama Produk"
                placeholder="Masukkan nama produk"
                value={formData.name}
                name="name"
                onChange={handleInputChange}
              />
              <label className="text-sm font-semibold">Deskripsi Produk</label>
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
            <MultipleImageUploader
              title={
                <>
                  <div className="text-lg font-semibold">Upload Gambar Produk</div>
                  <div className="text-sm text-gray-400 ">
                    Pilih foto produk atau tarik dan letakkan hingga 5 foto
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
    </SenimanDashboardLayout>
  );
};

export default EditProduct;
