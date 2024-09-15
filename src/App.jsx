import "./css/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import LogIn from "./pages/auth/LogIn";
import SignIn from "./pages/auth/SignIn";
import OTPVerification from "./pages/auth/OTPVerification";
import SearchResult from "./pages/home/SearchResult";
import ProductDetails from "./pages/home/ProductDetails";
import ArtProviderRegister from "./pages/form/ArtProviderRegister";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/otp" element={<OTPVerification />} />
        <Route path="/searchresult" element={<SearchResult />}></Route>
        <Route path="/productdetails" element={<ProductDetails />} />
        <Route path="/artprovider-register" element={<ArtProviderRegister />} />
      </Routes>
    </Router>
  );
}

export default App;
