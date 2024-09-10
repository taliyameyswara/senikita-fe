import "./css/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import LogIn from "./pages/auth/LogIn";
import SignIn from "./pages/auth/SignIn";
import OTPVerification from "./pages/auth/OTPVerification";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/otp" element={<OTPVerification />} />
      </Routes>
    </Router>
  );
}

export default App;
