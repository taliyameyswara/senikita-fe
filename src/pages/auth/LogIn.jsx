import React, { useContext, useState, useEffect } from "react";
import NavbarLogo from "../../components/navbar/NavbarLogo";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
// import { login as loginApi } from '../../api/auth';
import { useAuthApi } from "../../api/auth";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import FooterLogo from "../../components/footer/FooterLogo";
import PasswordInput from "../../components/form-input/PasswordInput";
import { useLoginGoogleApi } from "../../api/user/LoginGoogleApi";

const LogIn = ({ setProgress }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const { login, setEmailOTP } = useContext(UserContext);
  const { login: loginApi } = useAuthApi();
  const { loginGoogle } = useLoginGoogleApi();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isFormValid = email && password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true
    setProgress(20);

    console.log("Form submitted"); // Log untuk memastikan fungsi dijalankan
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const result = await loginApi(email, password);
      setProgress(50);
      console.log("API Response:", result); // Periksa response dari API

      if (result.code === 403) {
        setProgress(80);
        console.log("OTP Required");
        setEmailOTP(email);
        setIsLoading(false);
        navigate("/otp");
        return;
      }
      if (result.success) {
        setProgress(100);
        console.log("Login success", result.data);
        toast.success("Login berhasil!");
        login(result.data);
        if (result.data.role === 1) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }
      if (result.success === false) {
        setProgress(100);
        console.log("Login failed", result.message);
        toast.error(result.message);
      }
    } catch (error) {
      setProgress(100);
      console.log("Server error:", error);
      toast.error("Terjadi kesalahan pada server.");
    } finally {
      setIsLoading(false); // Set loading to false after process
    }
  };

  const handleGoogleLogin = () => {
    return async () => {
      try {
        const url = await loginGoogle();
        window.location.href = url;  // Assign the URL to window.location.href
      }
      catch (error) {
        console.error("Failed to login with Google:", error);
        toast.error("Gagal masuk dengan Google.");
      }
    }
  }


  return (
    <>
      {/* navbar */}
      <NavbarLogo />
      <div className="container">
        {/* login form */}
        <div
          className="flex flex-col items-center justify-center "
          style={{ minHeight: "calc(100vh - 10rem)" }}
        >
          {/* header */}
          <div className="text-xl font-semibold">Masuk ke Senikita</div>
          <div className="">
            Belum punya akun?{" "}
            <Link
              to="/signup"
              className="text-primary hover:underline hover:text-tertiary"
            >
              Daftar disini
            </Link>
          </div>

          {/* form */}
          <div className="w-full max-w-md px-8">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* google login */}
              <div>
                <button
                  onClick={handleGoogleLogin()}
                  type="button"
                  className="flex items-center justify-center w-full gap-2 py-3 mt-5 font-semibold text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <FcGoogle />
                  Masuk dengan Google
                </button>
              </div>
              {/* divider */}
              <div className="flex items-center gap-4 py-1">
                <div className="h-[0.5px] w-full bg-gray-200 flex-1 my-[0.5rem]"></div>
                <div className="text-sm md:text-base">atau</div>
                <div className="h-[0.5px] w-full bg-gray-200 flex-1 my-[0.5rem]"></div>
              </div>
              {/* email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 mt-1 text-sm border border-gray-300 md:text-base rounded-xl focus:outline-none focus:ring-primary focus:border-primary/60"
                  placeholder="Masukkan Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* password */}
              <PasswordInput
                label="Password"
                placeholder="Masukkan Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {/* forgot password */}
              <div className="text-sm text-primary">
                <a href="#" className="hover:underline">
                  Lupa Password?
                </a>
              </div>

              {/* submit button */}
              <div>
                <button
                  type="submit"
                  className={`w-full py-3 text-white font-semibold rounded-xl ${isFormValid
                    ? "bg-primary hover:bg-primary-dark"
                    : "bg-gray-300 cursor-not-allowed"
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex justify-center items-center`}
                  disabled={!isFormValid || isLoading} // Disabled saat loading atau form tidak valid
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-solid rounded-full border-t-transparent animate-spin"></div>
                  ) : (
                    "Masuk"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <FooterLogo />
      </div>
    </>
  );
};

export default LogIn;
