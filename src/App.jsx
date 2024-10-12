import "./css/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import LogIn from "./pages/auth/LogIn";
import OTPVerification from "./pages/auth/OTPVerification";
import Dashboard from "./pages/admin/Dashboard";
import AdminRoutes from "./routes/AdminRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS untuk toastify
import NotAuthorized from "./pages/auth/NotAuthorized";
import SignUp from "./pages/auth/SignUp";
import UserLists from "./pages/admin/Users/UserLists";
import CategoryLists from "./pages/admin/Categories/CategoryLists";
import NotFound from "./pages/auth/404";
import VerificationLists from "./pages/admin/Verification/VerificationLists";

import SearchResult from "./pages/home/SearchResult";
import ProductDetails from "./pages/home/ProductDetails";
import ServiceDetails from "./pages/home/ServiceDetails";
import ArtProviderRegister from "./pages/form/ArtProviderRegister";
import DashboardUser from "./pages/user/DashboardUser";

import DashboardTransaction from "./pages/user/transaction/DashboardTransaction";
import ProductTransactionDetails from "./pages/user/transaction/product/ProductTransactionDetails";
import ServiceTransactionDetails from "./pages/user/transaction/service/ServiceTransactionDetails";

import DashboardSeniman from "./pages/seniman/DashboardSeniman";
import KesenianList from "./pages/seniman/kesenian/KesenianList";
import AddProduct from "./pages/seniman/Kesenian/product/AddProduct";
import EditProduct from "./pages/seniman/Kesenian/product/EditProduct";
import AddService from "./pages/seniman/kesenian/service/AddService";
import EditService from "./pages/seniman/kesenian/service/EditService";
import ProductOrder from "./pages/form/ProductOrder";
import ServiceOrder from "./pages/form/ServiceOrder";
import Cart from "./pages/home/Cart";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardWishlist from "./pages/user/Wishlist/DashboardWishlist";
import UserProfile from "./pages/user/profile/UserProfile";
import SenimanProfile from "./pages/seniman/profile/SenimanProfile";
import SenimanOrder from "./pages/seniman/order/SenimanOrder";
import SenimanBalance from "./pages/seniman/balance/SenimanBalance";
import ProfileDetailSeniman from "./pages/home/ProfileDetailSeniman";
import Playground from "./pages/Playground";

function App() {
  return (
    <Router>
      {/* <ToastContainer> */}
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Route yang gabisa diakses ketika sudah login */}
        <Route element={<PublicRoutes />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/otp" element={<OTPVerification />} />
        </Route>

        {/* Route untuk admin */}
        <Route element={<AdminRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* user */}
          <Route path="/dashboard/users" element={<UserLists />} />
          {/* category */}
          <Route path="/dashboard/categories" element={<CategoryLists />} />
          {/* verification shop */}
          <Route
            path="/dashboard/verification-shop"
            element={<VerificationLists />}
          />
        </Route>

        {/* Route 403 Not Authorized */}
        <Route path="/not-authorized" element={<NotAuthorized />} />

        {/* Route 404 */}
        <Route path="*" element={<NotFound />} />

        {/* Route for home */}
        <Route path="/search" element={<SearchResult />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
        <Route path="/seniman/:id" element={<ProfileDetailSeniman />} />
        {/* <Route path="/artprovider-register" element={<ArtProviderRegister />} /> */}

        {/* Route yang bisa diakses setelah login */}
        <Route element={<ProtectedRoute />}>
          <Route path="/daftar/seniman" element={<ArtProviderRegister />} />

          {/* SENIMAN */}
          <Route path="/seniman/dashboard" element={<DashboardSeniman />} />
          {/* kesenian */}
          <Route
            path="/seniman/dashboard/kesenian"
            element={<KesenianList />}
          />
          {/* product */}
          <Route
            path="/seniman/dashboard/kesenian/addproduct"
            element={<AddProduct />}
          />
          <Route
            path="/seniman/dashboard/kesenian/updateproduct/:id"
            element={<EditProduct />}
          />
          {/* service */}
          <Route
            path="/seniman/dashboard/kesenian/addservice"
            element={<AddService />}
          />
          <Route
            path="/seniman/dashboard/kesenian/updateservice/:id"
            element={<EditService />}
          />
          <Route
            path="/seniman/dashboard/profil"
            element={<SenimanProfile />}
          />
          <Route path="/seniman/dashboard/order" element={<SenimanOrder />} />
          <Route
            path="seniman/dashboard/balance"
            element={<SenimanBalance />}
          />

          {/* user */}
          {/* dashboard */}
          <Route path="/user/dashboard" element={<DashboardUser />} />
          {/* transaction */}
          <Route
            path="/user/dashboard/transaction"
            element={<DashboardTransaction />}
          />
          <Route
            path="/user/dashboard/transaction/product/details/:id"
            element={<ProductTransactionDetails />}
          />
          <Route
            path="/user/dashboard/transaction/service/details/:id"
            element={<ServiceTransactionDetails />}
          />
          <Route
            path="/user/dashboard/wishlist"
            element={<DashboardWishlist />}
          />
          {/* profil */}
          <Route path="/user/dashboard/profil" element={<UserProfile />} />

          <Route path="/product-order" element={<ProductOrder />} />
          <Route path="/service-order" element={<ServiceOrder />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="/playground" element={<Playground />}></Route>
      </Routes>
      <ToastContainer autoClose={1200} />
    </Router>
  );
}

export default App;
