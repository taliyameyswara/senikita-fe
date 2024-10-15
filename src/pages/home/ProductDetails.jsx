import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useAxiosInstance } from "../../config/axiosConfig";
import Navbar from "../../components/navbar/Navbar";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollTab from "../../components/ScrollTab";
import ReviewSection from "../../components/product-details/ReviewSection";
import ArtistProfileSection from "../../components/product-details/ArtistProfileSection";
import ProductDetailSection from "../../components/product-details/ProductDetailSection";
import OrderBottomBar from "../../components/product-details/OrderBottomBar";
import ProductList from "../../components/card/ProductList";
import { UserContext } from "../../context/UserContext";
import { useProductApi } from "../../api/landing/ProductApi";
import FullPageLoader from "../../components/loading/FullPageLoader";


const ProductDetails = ({ setProgress }) => {
  const { user } = useContext(UserContext); // Use logout from context
  const { fetchProductById, fetchRandomProduct } = useProductApi();
  const { id } = useParams();
  const [productId, setProductId] = useState("");

  useEffect(() => {
    const decryptedId = atob(id);
    const productId = decryptedId.split("-")[0];
    setProductId(productId);
  })

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProductById = async (productId) => {
    try {
      const response = await fetchProductById(productId);
      setProduct(response);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  }

  const getProducts = async () => {
    try {
      const response = await fetchRandomProduct();
      setProducts(response);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setProgress(30);
      if (productId) {
        await getProductById(productId);
        setProgress(60);
      }

      await getProducts();
      setProgress(100);
      setLoading(false);
    }

    fetchData();
  }, [productId, setProgress]);


  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Produk", to: "/" },
    { label: "Seni Lukis", to: "/" },
    { label: "Nama Produk", to: `/product/${id}` },
  ];

  const tabs = [
    {
      label: "Detail Produk",
      target: "section1",
      content: product ? (
        <ProductDetailSection product={product} />
      ) : (
        <div>No Product Details Available</div>
      ),
    },
    {
      label: "Ulasan",
      target: "section2",
      content: <ReviewSection review={product ? product.ratings : []} />,
    },
    {
      label: "Profil Seniman",
      target: "section3",
      content: <ArtistProfileSection shop={product ? product.shop : []} />,
    },
  ];

  if (loading) {
    return <FullPageLoader />
  }

  return (
    <>
      <Navbar />
      <div className="container px-6 py-4 mb-20">
        <Breadcrumbs items={breadcrumbItems} />
        <ScrollTab tabs={tabs} />
        {
          product && user.id !== product.shop.user_id ? (
            <OrderBottomBar product={product} />
          ) : null

        }
        <ProductList
          title={"Produk Lainnya"}
          products={products}
          type={"Product"}
        />
      </div>
    </>
  );
};

export default ProductDetails;
