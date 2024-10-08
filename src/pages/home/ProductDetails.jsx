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

// const product = {
//   // type: "Produk Kesenian",
//   name: "Lukisan Abstrak Khas Jawa Tengah", //ada
//   price: 1500000, //ada
//   rating: 4.6, //rating_count belum ada
//   sold: 52,//ada
//   stock: 100,//ada
//   category_name: "Seni Lukis", //ada
//   desc: (
//     <>
//       ⛔️MOHON MEMBACA CATATAN TOKO TERLEBIH DAHULU! GAGAL MEMATUHI NO
//       COMPLAINT! <br></br>
//       <br></br> ⚠️Wajib Video Unboxing Uncut Pembeli Diwajibkan video unboxing
//       tanpa cut/pause untuk claim apa jika barang cacat pabrik atau pun ada
//       kerusakan. <br></br>
//       <br></br> 📢Seluruh produk yang kami jual 100% Original Bergaransi{" "}
//       <br></br>
//       <br></br>❗️Garansi No Warranty <br></br>
//       <br></br> Deskripsi: Kailh BOX switches are IP56 rated to keep dust and
//       moisture out. Kailh BOX Silent switches offer gentle bottom-out and quiet
//       operation due to an internal shock absorbing system, which reduces
//       keystroke impacts. Created with a rounded box around the cross stem
//       instead of the cross stem just sticking up, they're built to avoid
//       corrosion and debris buildup. The box extends to the contact plate and
//       leaf, providing extra protection. <br></br>
//       <br></br>Features: <br></br>• Dust and moisture proof<br></br> • Factory
//       Lubed <br></br>
//     </>
//   ),//ada
//   thumbnail:
//     "https://cdngnfi2.sgp1.cdn.digitaloceanspaces.com/gnfi/uploads/images/2022/11/0715042022-Lukisan-Balinese-Procession-karya-Lee-Man-Fong-menjadi-salah-satu-lukisan-terkenal-dunia-asal-Indonesia-Good-News-From-Indonesia.jpg",
//   //ada
//   shop: [
//     {
//       name: "Pelukis Handal", //ada
//       region: "Semarang, Jawa Tengah",  // belum ada
//       address: "Jl. Raya Caturtunggal No. 11",  //ada
//       profile_picture: Avatar,  //ada
//       desc:
//         "Saya adalah seorang pelukis yang berdedikasi dengan perjalanan seni yang dimulai dari ketertarikan mendalam saya pada keindahan dan ekspresi melalui seni rupa. Nama saya Nyoman, dan saya bangga menjadi bagian dari komunitas seniman yang dikenal dengan nama 'Pelukis Handal'. Saya ingat momen-momen ketika saya pertama kali merasakan kekuatan warna dan bentuk melalui gambar dan lukisan sederhana yang saya buat di buku gambar. Minat saya terhadap seni tumbuh seiring berjalannya waktu, mendorong saya untuk mengejar pendidikan formal di bidang seni rupa. Saya menempuh pendidikan di ISI Surakarta, di mana saya mendapatkan fondasi yang kuat dalam teknik-teknik klasik dan kontemporer. Namun, pendidikan saya tidak hanya berhenti di situ; saya juga terlibat dalam berbagai workshop dan kursus tambahan untuk terus mengasah keterampilan dan memperluas wawasan saya dalam dunia seni.", //ada
//     },
//   ],
//   ratings: [
//     // {
//     //   name: "John Doe",
//     //   date: "2020-01-01",
//     //   rating: 4.0,
//     //   comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     //   image: [
//     //     "https://cdngnfi2.sgp1.cdn.digitaloceanspaces.com/gnfi/uploads/images/2022/11/0715042022-Lukisan-Balinese-Procession-karya-Lee-Man-Fong-menjadi-salah-satu-lukisan-terkenal-dunia-asal-Indonesia-Good-News-From-Indonesia.jpg",
//     //     "https://cdngnfi2.sgp1.cdn.digitaloceanspaces.com/gnfi/uploads/images/2022/11/0715012022-Lukisan-Badai-Pasti-Berlalu-karya-Affandi-menjadi-salah-satu-lukisan-terkenal-dunia-asal-Indonesia-Good-News-From-Indonesia.jpg",
//     //   ],
//     // },
//     // {
//     //   name: "Jane Smith",
//     //   date: "2020-01-01",
//     //   rating: 3.0,
//     //   comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     // },
//     // {
//     //   name: "Mario Slebew",
//     //   date: "2020-01-01",
//     //   rating: 5.0,
//     //   comment: "AOWKOWA",
//     //   image: [
//     //     "https://cdngnfi2.sgp1.cdn.digitaloceanspaces.com/gnfi/uploads/images/2022/11/0715042022-Lukisan-Balinese-Procession-karya-Lee-Man-Fong-menjadi-salah-satu-lukisan-terkenal-dunia-asal-Indonesia-Good-News-From-Indonesia.jpg",
//     //     "https://cdngnfi2.sgp1.cdn.digitaloceanspaces.com/gnfi/uploads/images/2022/11/0715012022-Lukisan-Badai-Pasti-Berlalu-karya-Affandi-menjadi-salah-satu-lukisan-terkenal-dunia-asal-Indonesia-Good-News-From-Indonesia.jpg",
//     //   ],
//     // },
//   ],
//   images: [
//     // "https://cdngnfi2.sgp1.cdn.digitaloceanspaces.com/gnfi/uploads/images/2022/11/0715042022-Lukisan-Balinese-Procession-karya-Lee-Man-Fong-menjadi-salah-satu-lukisan-terkenal-dunia-asal-Indonesia-Good-News-From-Indonesia.jpg",
//     // "https://cdngnfi2.sgp1.cdn.digitaloceanspaces.com/gnfi/uploads/images/2022/11/0715012022-Lukisan-Badai-Pasti-Berlalu-karya-Affandi-menjadi-salah-satu-lukisan-terkenal-dunia-asal-Indonesia-Good-News-From-Indonesia.jpg",
//     // "https://cdngnfi2.sgp1.cdn.digitaloceanspaces.com/gnfi/uploads/images/2022/11/0714572022-Lukisan-Berburu-Rusa-karya-Raden-Saleh-menjadi-salah-satu-lukisan-terkenal-dunia-asal-Indonesia-Good-News-From-Indonesia-(1).jpg",
//   ],
// };

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
