import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ShippingOptions from "../../components/orders/ShippingOptions";
import OrderSummary from "../../components/orders/OrderSummary";
import CustomerAddress from "../../components/orders/CustomerAddress";
import { IoAddOutline } from "react-icons/io5";
import Navbar from "../../components/navbar/Navbar";
import Modal from "../../components/Modal";
import TextareaInput from "../../components/form-input/TextareaInput";
import ProductOrderTransactionCard from "../user/Transaction/product/ProductOrderTransactionCard";
import { useAxiosInstance } from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import FullPageLoader from "../../components/loading/FullPageLoader";
import Spinner from "../../components/loading/Spinner";
import { toast } from "react-toastify";
import AddAddressModal from "../../components/address/AddAdressModal";
import DeleteModal from "../../components/modal/DeleteModal";
import { limitText } from "../../utils/limitText";

const ProductOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedItems } = location.state || [];
  const [products, setProducts] = useState(selectedItems || []);
  const [shippingCost, setShippingCost] = useState(0);
  const serviceFee = 5000;
  const [addresses, setAddresses] = useState([]);
  const [activeAddress, setActiveAddress] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxiosInstance();
  const [loadingAddress, setLoadingAddress] = useState(false);
  // Memastikan state produk terisi dengan data dari location
  useEffect(() => {
    setProducts(null);
    const selectedItems = location.state?.selectedItems || [];
    console.log(selectedItems);
    setProducts(selectedItems);

    // Jika tidak ada produk, navigasi kembali ke cart
    if (selectedItems.length === 0) {
      navigate("/cart");
    }
  }, [location.state, navigate]);

  // Fungsi untuk mengelompokkan produk berdasarkan shop_id
  const groupedProducts = products.reduce((groups, product) => {
    const { shop_id } = product;
    if (!groups[shop_id]) {
      groups[shop_id] = [];
    }
    groups[shop_id].push(product);
    return groups;
  }, {});

  // Mengambil alamat dari API
  const fetchAddresses = async () => {
    setLoadingAddress(true);
    try {
      const response = await axiosInstance.get("user/address");
      if (response.data.status === "success") {
        setAddresses(response.data.data);
        setActiveAddress(response.data.data[0]);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoadingAddress(false);
    }
  };

  // Mengambil ongkos kirim
  const fetchShippingOptions = async () => {
    if (activeAddress && selectedItems.length > 0) {
      const requestBody = {
        origin: selectedItems[0].shop_city_id,
        destination: activeAddress.city_id,
        weight: 1000,
        courier: "jne",
      };

      try {
        const response = await axiosInstance.post("check-ongkir", requestBody);

        const shippingOptions = response.data.map((item, index) => ({
          id: index + 1,
          name: item.description || item.service,
          cost: item.cost[0].value,
          courier: "jne",
          service: item.service,
        }));

        setShippingOptions(shippingOptions);
        console.log("Shipping options:", shippingOptions);
      } catch (error) {
        console.error("Error fetching shipping options:", error);
      }
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  useEffect(() => {
    fetchShippingOptions();
  }, [activeAddress, selectedItems]);

  const totalPrice = products.reduce(
    (acc, item) => acc + item.productPrice * item.quantity,
    0
  );
  const [isNotesVisible, setNotesVisible] = useState(false);
  const [notesValue, setNotesValue] = useState("");

  const handleNotesButton = () => setNotesVisible(!isNotesVisible);
  const handleNotesChange = (e) => setNotesValue(e.target.value);

  const handleChangeAddress = (id) => {
    const selectedAddress = addresses.find((address) => address.id === id);
    setActiveAddress(selectedAddress);
    setIsModalOpen(false);
  };

  // Fungsi untuk melakukan checkout
  const handleCheckout = async () => {
    const productIds = products.map((product) => product.product_id); // Ambil ID produk
    const qtys = products.map((product) => product.quantity); // Ambil kuantitas produk
    const courier =
      shippingOptions.length > 0 ? shippingOptions[0].courier : ""; // Ambil courier
    const service =
      shippingOptions.length > 0 ? shippingOptions[0].service : ""; // Ambil service
    const addressId = activeAddress ? activeAddress.id : null; // Ambil ID alamat aktif

    const orderData = {
      product_ids: productIds,
      qtys: qtys,
      courier: courier,
      service: service,
      address_id: addressId,
    };

    setLoading(true);
    axiosInstance
      .post("user/order", orderData)
      .then((response) => {
        if (response.data.status === "success") {
          console.log("Order placed successfully:", response.data);
          toast.success("Order berhasil");
          navigate("/user/dashboard/transaction");
        } else {
          console.error("Order failed:", response.data);
          toast.error("Order gagal");
        }
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        toast.error("Order gagal");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // state untuk modal add alamat
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label_address: "",
    name: "",
    phone: "",
    address_detail: "",
    city_id: "",
    province_id: "",
    note: "",
    postal_code: "",
  });

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewAddress({
      label_address: "",
      name: "",
      phone: "",
      address_detail: "",
      city_id: "",
      province_id: "",
      note: "",
      postal_code: "",
    });
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const handleAddAddress = async () => {
    try {
      const response = await axiosInstance.post("user/address", newAddress);
      if (response.data.status === "success") {
        fetchAddresses();
        closeAddModal();
        toast.success("Alamat berhasil ditambahkan");
      } else {
        toast.error("Gagal menambahkan alamat");
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

  const [addressToDelete, setAddressToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = (address) => {
    setAddressToDelete(address);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteAddress = async () => {
    try {
      const response = await axiosInstance.delete(
        `user/address/${addressToDelete.id}`
      );
      if (response.data.status === "success") {
        fetchAddresses();
        closeDeleteModal();
      } else {
        toast.error("Gagal menghapus alamat");
      }
      toast.success("Alamat berhasil dihapus");
    } catch (error) {
      toast(error);
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setAddressToDelete(null);
  };

  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <div>
      <Navbar />
      <div className="container lg:p-6 px-4 mx-auto">
        <div className="grid grid-cols-1 lg:gap-10 gap-4 mb-6 lg:grid-cols-5">
          <div className="col-span-3 space-y-5">
            {/* Looping per toko berdasarkan shop_id */}
            {Object.keys(groupedProducts).map((shopId) => (
              <div key={shopId} className="p-4 border rounded-xl">
                <div className="flex items-center gap-2">
                  <img
                    src={
                      groupedProducts[shopId][0].storeAvatar ??
                      "https://via.placeholder.com/100"
                    }
                    alt={groupedProducts[shopId][0].storeName}
                    className="w-8 h-8 rounded-lg"
                  />
                  <div>
                    <h2 className="text-sm">
                      {groupedProducts[shopId][0].storeName}
                    </h2>
                    <h2 className="text-xs text-gray-500">
                      {groupedProducts[shopId][0].storeLocation}
                    </h2>
                  </div>
                </div>

                {/* Looping produk di dalam toko */}
                <div className="mt-3">
                  {groupedProducts[shopId].map((product, index) => (
                    <div key={index} className="mb-4">
                      <ProductOrderTransactionCard
                        product={product}
                        quantity={product.qty}
                      />
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 w-full">
                  <div>
                    <button
                      className="flex gap-1 items-center text-primary font-semibold text-sm hover:bg-tertiary/10 px-4 py-2 rounded-xl transition-transform duration-150 hover:scale-100 transform scale-[.98] border-[0.5px] border-primary w-full"
                      onClick={handleNotesButton}
                    >
                      <IoAddOutline />
                      <div className="md:text-sm text-xs">
                        Tambah catatan untuk{" "}
                        {limitText(groupedProducts[shopId][0].storeName, 18)}
                      </div>
                    </button>
                    {isNotesVisible && (
                      <div className="mt-1">
                        <TextareaInput
                          label="Catatan"
                          placeholder="Masukkan catatan Anda di sini..."
                          value={notesValue}
                          name="catatan"
                          onChange={handleNotesChange}
                          rows={3}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex w-full">
                    <ShippingOptions
                      shippingOptions={shippingOptions}
                      onShippingCostChange={setShippingCost}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Alamat Pengiriman */}
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <h3 className="md:text-base text-sm font-semibold">
                  Alamat Anda
                </h3>
                {activeAddress && !loadingAddress && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-sm font-semibold text-primary"
                  >
                    Ganti Alamat
                  </button>
                )}
              </div>

              {loadingAddress ? (
                <Spinner width="w-10 h-10" />
              ) : activeAddress ? (
                <>
                  <CustomerAddress
                    address={activeAddress}
                    isOrder={true}
                    openDeleteModal={openDeleteModal}
                  />
                </>
              ) : (
                <>
                  <p className="text-gray-500">Belum ada alamat</p>
                  <div className="mt-2">
                    <button
                      onClick={openAddModal}
                      className="p-3 py-2 text-sm font-semibold transition duration-100 border border-primary text-primary hover:bg-primary hover:text-white rounded-xl"
                    >
                      Tambah Alamat
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Ringkasan Pesanan */}
          <div className="col-span-3 md:col-span-2">
            <OrderSummary
              productTotal={totalPrice}
              shippingCost={shippingCost}
              serviceFee={serviceFee}
            />
            <button
              onClick={handleCheckout}
              className="w-full md:py-3 py-2.5 mt-3 font-semibold text-white bg-primary rounded-xl"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Modal Ganti Alamat */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          isForm={false}
          onClose={() => setIsModalOpen(false)}
          title="Pilih Alamat"
          subtitle={"Pilih alamat untuk pengiriman"}
          width="w-11/12 md:w-7/12"
        >
          {/* Konten Modal */}
          <div className="overflow-y-auto max-h-80">
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <div key={address.id} className="flex items-start mb-3">
                  <input
                    type="radio"
                    id={`address-${address.id}`}
                    name="address"
                    checked={selectedAddressId === address.id}
                    onChange={() => setSelectedAddressId(address.id)}
                    className="hidden peer"
                  />
                  <label
                    htmlFor={`address-${address.id}`}
                    className="relative flex-1 p-4 text-gray-700 transition border-[0.5px] border-gray-300 rounded-lg cursor-pointer peer-checked:bg-tertiary/5 peer-checked:bg-opacity-30 peer-checked:border-primary peer-checked:text-primary-dark hover:bg-gray-100"
                  >
                    <span className="p-1.5 rounded-lg md:text-sm text-xs bg-tertiary/10 text-primary font-semibold">
                      {address.label_address}
                    </span>
                    <p className="mt-1 md:text-lg font-semibold">
                      {address.name}{" "}
                    </p>
                    <p className="font-light font-nunito md:text-base text-sm">
                      {address.phone}
                    </p>
                    <div className="md:text-sm text-xs font-light text-gray-500">
                      <p>{address.address_detail}</p>
                      <p>
                        {address.city.name}, {address.province.name},{" "}
                        {address.province.name}{" "}
                        <span className="font-nunito font-light">
                          {address.postal_code}
                        </span>
                      </p>
                      <p> ({address.note})</p>
                    </div>
                  </label>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Belum ada alamat tersimpan</p>
            )}
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-600 rounded-lg"
            >
              Batal
            </button>
            <button
              onClick={() => handleChangeAddress(selectedAddressId)}
              className="px-4 py-2 ml-2 text-white rounded-lg bg-primary hover:bg-primary-dark"
            >
              Pilih Alamat
            </button>
          </div>
        </Modal>
      )}
      <AddAddressModal
        isOpen={isAddModalOpen}
        onClose={() => closeAddModal()}
        onSubmit={handleAddAddress}
        newAddress={newAddress}
        handleChange={handleAddChange}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteAddress}
        title="Konfirmasi Hapus"
        subtitle={`Apakah Anda yakin ingin menghapus alamat ${
          addressToDelete ? addressToDelete.label_address : ""
        }?`}
      />
    </div>
  );
};

export default ProductOrder;
