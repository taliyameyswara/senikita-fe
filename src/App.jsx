import "./css/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoadingBar from "react-top-loading-bar";
import Home from "./pages/home/Home";
import LogIn from "./pages/auth/LogIn";
import OTPVerification from "./pages/auth/OTPVerification";
import Dashboard from "./pages/admin/Dashboard";
import AdminRoutes from "./routes/AdminRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import About from "./pages/home/About";
import ClientGuideSection from "./pages/home/landing/ClientGuideSection";
import SenimanGuideSection from "./pages/home/landing/SenimanGuideSection";
import ClientRules from "./pages/home/landing/ClientRules";
import SenimanRules from "./pages/home/landing/SenimanRules";
import PrivacyPolicy from "./pages/home/landing/PrivacyPolicy";
import PetaKesenian from "./pages/home/PetaKesenian";
import PetaKesenianDetail from "./pages/home/PetaKesenianDetail";
import TestDetail from "./pages/home/TestDetail";
import CallbackGoogle from "./pages/callback/CallbackGoogle";
import ChatbotPlayground from "./pages/chatbot/ChatbotPlayground";

function App() {
  const [progress, setProgress] = useState(0);
  return (
    <Router>
      <LoadingBar
        color="#8B5C21"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Routes>
        <Route path="/" element={<Home setProgress={setProgress} />} />

        {/* Public Routes */}
        <Route element={<PublicRoutes />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn setProgress={setProgress} />} />
          <Route path="/otp" element={<OTPVerification />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/users" element={<UserLists />} />
          <Route path="/dashboard/categories" element={<CategoryLists />} />
          <Route
            path="/dashboard/verification-shop"
            element={<VerificationLists />}
          />
        </Route>

        {/* Protected Route (Authorized only) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/daftar/seniman" element={<ArtProviderRegister />} />
          {/* Seniman */}
          <Route
            path="/seniman/dashboard"
            element={<DashboardSeniman setProgress={setProgress} />}
          />
          <Route
            path="/seniman/dashboard/kesenian"
            element={<KesenianList setProgress={setProgress} />}
          />
          <Route
            path="/seniman/dashboard/kesenian/addproduct"
            element={<AddProduct />}
          />
          <Route
            path="/seniman/dashboard/kesenian/updateproduct/:id"
            element={<EditProduct />}
          />
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
            element={<SenimanProfile setProgress={setProgress} />}
          />
          <Route path="/seniman/dashboard/order" element={<SenimanOrder />} />
          <Route
            path="seniman/dashboard/balance"
            element={<SenimanBalance />}
          />

          {/* User */}
          <Route path="/user/dashboard" element={<DashboardUser />} />
          <Route
            path="/user/dashboard/transaction"
            element={<DashboardTransaction setProgress={setProgress} />}
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
            element={<DashboardWishlist setProgress={setProgress} />}
          />
          <Route
            path="/user/dashboard/profil"
            element={<UserProfile setProgress={setProgress} />}
          />
          <Route path="/product-order" element={<ProductOrder />} />
          <Route path="/service-order" element={<ServiceOrder />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

        {/* Route for home */}
        <Route
          path="/search"
          element={<SearchResult setProgress={setProgress} />}
        />
        <Route
          path="/product/:id"
          element={<ProductDetails setProgress={setProgress} />}
        />
        <Route
          path="/service/:id"
          element={<ServiceDetails setProgress={setProgress} />}
        />
        <Route
          path="/seniman/:id"
          element={<ProfileDetailSeniman setProgress={setProgress} />}
        />
        <Route path="/peta-kesenian" element={<PetaKesenian />} />
        <Route path="/peta-kesenian/:slug" element={<PetaKesenianDetail />} />
        <Route path="/peta-kesenian/test" element={<TestDetail />} />
        <Route path="/about-senikita" element={<About />} />
        <Route path="/client-guide" element={<ClientGuideSection />} />
        <Route path="/seniman-guide" element={<SenimanGuideSection />} />
        <Route path="/client-rules" element={<ClientRules />} />
        <Route path="/seniman-rules" element={<SenimanRules />} />
        <Route path="/kebijakan-privasi" element={<PrivacyPolicy />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="/callback-google" element={<CallbackGoogle />} />
        <Route path="/chatbot-playground" element={<ChatbotPlayground />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer autoClose={1200} />
    </Router>
  );
}

export default App;
