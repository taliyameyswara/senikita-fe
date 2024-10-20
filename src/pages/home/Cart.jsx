import React, { useState, useEffect } from "react";
import ShippingOptions from "../../components/orders/ShippingOptions";
import OrderSummary from "../../components/orders/OrderSummary";
import { FaTrashCan } from "react-icons/fa6";
import Navbar from "../../components/navbar/Navbar";
import FooterLogo from "../../components/footer/FooterLogo";
import TextareaInput from "../../components/form-input/TextareaInput";
import ProductOrderCard from "../../components/orders/ProductOrderCard";
import Heading from "../../components/Heading";
import { CgNotes } from "react-icons/cg";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { useAxiosInstance } from "../../config/axiosConfig";
import FullPageLoader from "../../components/loading/FullPageLoader";
import { useNavigate } from "react-router-dom";
import EmptyState from "../../components/EmptyState";
import { formatNumber } from "../../utils/formatNumber";
import DeleteModal from "../../components/modal/DeleteModal";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();

  // state deleteModal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const axiosInstance = useAxiosInstance();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlePurchase = () => {
    const selectedItems = products.filter((product) =>
      selectedProducts.includes(product.productName)
    );

    // Navigasi ke halaman ProductOrder dan kirim data produk yang dipilih
    navigate("/product-order", { state: { selectedItems } });
  };

  const getCartItems = () => {
    axiosInstance
      .get("user/cart")
      .then((response) => {
        // Memasukkan qty ke dalam setiap produk
        const updatedProducts = response.data.data.map((item) => ({
          ...item,
          quantity: item.qty, // Menyimpan qty ke dalam property quantity
        }));
        setProducts(updatedProducts);
        console.log(updatedProducts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // delete cart-items
  const handleDeleteCart = (cartItemId) => {
    axiosInstance
      .delete(`user/cart/items/${cartItemId}`)
      .then((response) => {
        getCartItems();
        toast.success("Produk berhasil dihapus dari keranjang");
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      })
      .finally(() => {
        setLoading(false);
        setIsDeleteModalOpen(false);
      });
  };

  // Fungsi untuk memperbarui quantity ke jumlah yang spesifik
  const updateCartItemQuantity = (cartItemId, newQuantity) => {
    axiosInstance
      .put(`user/cart/items/${cartItemId}`, { qty: newQuantity })
      .then((response) => {
        // Perbarui state produk dengan kuantitas baru
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.cart_item_id === cartItemId
              ? { ...product, quantity: newQuantity }
              : product
          )
        );
      })
      .catch((error) => {
        console.error("Error updating quantity:", error);
      })
      .finally(() => {
        HandleTotalPrice(); // Memanggil fungsi setelah state diperbarui
      });
  };


  // Fungsi untuk menambah quantity
  const incrementCartItemQuantity = (cartItemId) => {
    axiosInstance
      .put(`user/cart/items/increment/${cartItemId}`)
      .then((response) => { })
      .catch((error) => {
        console.error("Error incrementing quantity:", error);
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  // Fungsi untuk mengurangi quantity
  const decrementCartItemQuantity = (cartItemId) => {
    axiosInstance
      .put(`user/cart/items/decrement/${cartItemId}`)
      .then((response) => { })
      .catch((error) => {
        console.error("Error decrementing quantity:", error);
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  useEffect(() => {
    getCartItems();
  }, []);

  // State to track selected products
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [shippingCosts, setShippingCosts] = useState({}); // Track shipping costs per store

  const handleShippingCostChange = (storeName, cost) => {
    setShippingCosts((prevCosts) => ({
      ...prevCosts,
      [storeName]: cost,
    }));
  };

  const totalShippingCost = Object.values(shippingCosts).reduce(
    (total, cost) => total + cost,
    0
  );

  const serviceFee = 5000;

  const [isNotesVisible, setNotesVisible] = useState(false);
  const [notesValue, setNotesValue] = useState("");
  const handleNotesButton = () => setNotesVisible(!isNotesVisible);

  const handleNotesChange = (e) => setNotesValue(e.target.value);

  const toggleLike = (productName) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productName === productName
          ? { ...product, isLiked: !product.isLiked }
          : product
      )
    );
  };

  // Group products by store
  const groupedProducts = products.reduce((groups, product) => {
    if (!groups[product.storeName]) {
      groups[product.storeName] = [];
    }
    groups[product.storeName].push(product);
    return groups;
  }, {});

  // Handle selecting or deselecting a product
  const handleProductSelect = (productName) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productName)
        ? prevSelected.filter((name) => name !== productName)
        : [...prevSelected, productName]
    );
  };

  // Handle selecting or deselecting all products from a store
  const handleStoreSelect = (storeName) => {
    const storeProducts = groupedProducts[storeName].map(
      (product) => product.productName
    );
    const isAllSelected = storeProducts.every((productName) =>
      selectedProducts.includes(productName)
    );

    setSelectedProducts((prevSelected) =>
      isAllSelected
        ? prevSelected.filter(
          (productName) => !storeProducts.includes(productName)
        )
        : [...prevSelected, ...storeProducts]
    );
  };

  const [totalPrice, setTotalPrice] = useState(0);

  const HandleTotalPrice = () => {
    const price = products
      .filter((product) => selectedProducts.includes(product.productName))
      .reduce((total, product) => total + product.productPrice * (product.quantity || 1), 0);
    setTotalPrice(price);
  };


  useEffect(() => {
    HandleTotalPrice();
  }, [selectedProducts, products]); // Panggil ketika `selectedProducts` atau `products` berubah


  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <div>
      <Navbar />
      <div className="container px-4 py-0 mx-auto md:px-6 md:py-2">
        <Heading title={`${products.length} item di keranjang Anda`} />
        {products.length === 0 ? (
          <EmptyState message={"Tidak ada item di keranjang"} />
        ) : (
          <div className="grid grid-cols-1 gap-10 mb-6 lg:grid-cols-5">
            <div className="col-span-3 pb-8 space-y-5">
              {Object.keys(groupedProducts).map((storeName, index) => (
                <div key={index} className=" rounded-xl">
                  <div className="flex items-start gap-2">
                    {/* checkbox */}
                    <div className="">
                      <input
                        type="checkbox"
                        className="w-4 h-4 bg-white border border-gray-300 rounded text-primary focus:ring-primary primary focus:ring-1"
                        onChange={() => handleStoreSelect(storeName)}
                        checked={groupedProducts[storeName].every((product) =>
                          selectedProducts.includes(product.productName)
                        )}
                      />
                    </div>
                    {/* info toko */}
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          groupedProducts[storeName][0].storeAvatar ??
                          "https://via.placeholder.com/100"
                        }
                        alt={storeName}
                        className="w-8 h-8 rounded-lg"
                      />
                      <div>
                        <h2 className="text-sm">{storeName}</h2>
                        <h2 className="text-xs text-gray-500">
                          {groupedProducts[storeName][0].storeLocation}
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* Produk */}
                  {groupedProducts[storeName].map((product, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="mt-2">
                        <input
                          type="checkbox"
                          className="w-4 h-4 bg-white border border-gray-300 rounded text-primary focus:ring-primary primary focus:ring-1"
                          checked={selectedProducts.includes(
                            product.productName
                          )}
                          onChange={() =>
                            handleProductSelect(product.productName)
                          }
                        />
                      </div>
                      <div className="flex-grow">
                        <ProductOrderCard
                          product={product}
                          onQuantityChange={(cartItemId, newQuantity) =>
                            updateCartItemQuantity(cartItemId, newQuantity)
                          }
                          button={
                            <>
                              <button
                                onClick={() =>
                                // handleDeleteCart(product.cart_item_id)
                                {
                                  setIsDeleteModalOpen(true);
                                  setProductIdToDelete(product.cart_item_id);
                                }
                                }
                              >
                                <div className="flex items-center gap-1">
                                  <FaTrashCan className="text-gray-400" />
                                  <span className="text-sm text-gray-400">
                                    Hapus
                                  </span>
                                </div>
                              </button>

                              <button
                                onClick={() => toggleLike(product.productName)}
                              >
                                {product.isLiked ? (
                                  <div className="flex items-center gap-1">
                                    <IoHeart className="text-customRed" />
                                    <span className="text-sm text-customRed">
                                      Wishlist
                                    </span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1">
                                    <IoHeartOutline className="text-gray-400" />
                                    <span className="text-sm text-gray-400">
                                      Wishlist
                                    </span>
                                  </div>
                                )}
                              </button>
                            </>
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Order Summary for Desktop */}
            <div className="hidden col-span-2 lg:block lg:sticky lg:top-20">
              <OrderSummary
                productTotal={totalPrice}
              // shippingCost={}
              // serviceFee={serviceFee}
              />
              <button
                onClick={handlePurchase}
                className="w-full py-3 mt-6 font-semibold text-white bg-primary rounded-xl"
              >
                Beli{" "}
                <span className="font-nunito">({selectedProducts.length})</span>
              </button>
            </div>
          </div>
        )}

        {/* Bottom bar for mobile (only showing total price) */}
        <div className="fixed bottom-0 left-0 flex items-center justify-between w-full px-4 py-3 bg-white border-t lg:hidden">
          <div>
            <p className="text-sm">Total Belanja</p>
            <p className="text-lg font-semibold font-nunito">
              {formatNumber(totalPrice)}
            </p>
          </div>
          <button
            onClick={handlePurchase}
            className="px-4 py-2 font-semibold text-white bg-primary rounded-xl"
          >
            Beli{" "}
            <span className="font-nunito">({selectedProducts.length})</span>
          </button>
        </div>
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => handleDeleteCart(productIdToDelete)}
        subtitle="Apakah Anda yakin ingin menghapus produk ini dari keranjang?"
      />
    </div>
  );
};

export default Cart;
