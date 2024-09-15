import "./css/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import LogIn from "./pages/auth/LogIn";
import OTPVerification from "./pages/auth/OTPVerification";
import Dashboard from "./pages/admin/Dashboard";
import AdminRoutes from "./routes/AdminRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS untuk toastify
import NotAuthorized from "./pages/auth/NotAuthorized";
import SignUp from "./pages/auth/SignUp";
import UserLists from "./pages/admin/Users/UserLists";
import CategoryLists from "./pages/admin/Categories/CategoryLists";
import NotFound from "./pages/auth/404";
import VerificationLists from "./pages/admin/Verification/VerificationLists";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* route for public after login */}
        <Route element={<PublicRoutes />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/otp" element={<OTPVerification />} />
        </Route>


        {/* route for admin */}
        <Route element={<AdminRoutes />}>
          <Route path='/dashboard' element={<Dashboard />} />
          {/* user */}
          <Route path='/dashboard/users' element={<UserLists />} />
          {/* category */}
          <Route path='/dashboard/categories' element={<CategoryLists />} />
          {/* verification shop */}
          <Route path='/dashboard/verification-shop' element={<VerificationLists />} />
        </Route>

        {/* Route 403 Not Authorized */}
        <Route path="/not-authorized" element={<NotAuthorized />} />
        {/* Route 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
