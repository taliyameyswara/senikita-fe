import Hero from "../../components/hero/Hero";
import ProductList from "../../components/card/ProductList";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { ProductData } from "../../utils/ProductData";
import { useAxiosInstance } from '../../config/axiosConfig';
import { useContext, useEffect } from "react";
import { useAuthApi } from "../../api/auth";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { refreshToken } = useAuthApi();
  const { refresh, logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Component mounted - attempting to refresh token");

    // const handleRefreshToken = async () => {
    //   const response = await refreshToken();
    //   if (response.success) {
    //     refresh(response.data); // Set user data after refreshing token
    //   } else {
    //     logout(); // Perform logout if token refresh fails
    //     navigate("/login");
    //   }
    // };

    // handleRefreshToken(); // Call the function
  }, []); // 
  return (
    <div>
      <div className="">
        <Navbar />
        <Hero />
        <ProductList
          title={"Produk dan Jasa Kesenian di Sekitar Anda"}
          products={ProductData}
        />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
