import Navbar from "../../components/navbar/Navbar";
import Breadcrumbs from "../../components/Breadcrumbs";
import Avatar from "../../assets/avatar.png";
import ScrollTab from "../../components/ScrollTab";
import ReviewSection from "../../components/product-details/ReviewSection";
import ArtistProfileSection from "../../components/product-details/ArtistProfileSection";
import ProductDetailSection from "../../components/product-details/ProductDetailSection";
import OrderBottomBar from "../../components/product-details/OrderBottomBar";
import ProductList from "../../components/card/ProductList";
import { useState, useEffect } from "react";
import { useAxiosInstance } from "../../config/axiosConfig";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const productId = id.split("-")[0]; // Ekstrak hanya ID dari URL
  const axiosInstance = useAxiosInstance();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    axiosInstance
      .get("/random-product")
      .then((res) => {
        setProducts(res.data.data);
        setLoading(false); // Stop loading after data is received
      }).catch((err) => {
        console.log(err);
        setLoading(false); // Stop loading even if there's an error
      });

    axiosInstance
      .get(`products/${productId}`)
      .then((res) => {
        console.log(res.data.product)
        setProduct(res.data.product);
        setLoading(false); // Stop loading after data is received
      }).catch((err) => {
        console.log(err);
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Produk", to: "/" },
    { label: "Seni Lukis", to: "/" },
    { label: "Nama Produk", to: "/productdetails" },
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

  useEffect(() => {
    console.log(product)
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container px-6 py-4 mb-20">
        <Breadcrumbs items={breadcrumbItems} />
        <ScrollTab tabs={tabs} />
        <OrderBottomBar product={product} />
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
