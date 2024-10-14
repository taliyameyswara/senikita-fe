import { useState, useEffect } from "react";
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

const ProductDetails = ({ setProgress }) => {
  const { id } = useParams();
  // const productId = id.split("-")[0];
  const [productId, setProductId] = useState("");

  useEffect(() => {
    const decryptedId = atob(id);
    const productId = decryptedId.split("-")[0];
    setProductId(productId);
  })

  // const productId = decryptText(id);
  const axiosInstance = useAxiosInstance();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Start loading bar
    setProgress(30);

    axiosInstance
      .get("/random-product")
      .then((res) => {
        setProducts(res.data.data);
        setLoading(false);
        setProgress(60);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setProgress(100);
      });
    if (productId) {
      axiosInstance
        .get(`products/${productId}`)
        .then((res) => {
          setProduct(res.data.product);
          setLoading(false);
          setProgress(100);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setProgress(100);
        });
    }

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
