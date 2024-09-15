import Hero from "../../components/hero/Hero";
import ProductList from "../../components/card/ProductList";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { ProductData } from "../../utils/ProductData";

const Home = () => {
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
