import React, { useContext, useState } from 'react';
import NavbarLogo from "../../components/navbar/NavbarLogo";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
// import { login as loginApi } from '../../api/auth';
import { useAuthApi } from '../../api/auth';
import { toast } from 'react-toastify';
import { UserContext } from "../../context/UserContext";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const { login, setEmailOTP } = useContext(UserContext);
  const { login: loginApi } = useAuthApi();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isFormValid = email && password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true

    try {
      const result = await loginApi(email, password);
      if (result.code === 403) {
        setEmailOTP(email);
        setIsLoading(false);
        navigate('/otp');

        return;
      }
      if (result.success) {
        toast.success('Login berhasil!');
        login(result.data);
        if (result.data.role === 1) {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      } else {
        toast.error('Login gagal! Periksa kembali email dan password Anda.');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan pada server.');
    } finally {
      setIsLoading(false); // Set loading to false after process
    }
  };

  return (
    <>


      {/* navbar */}
      <NavbarLogo />
      {/* login form */}
      <div className="flex flex-col items-center justify-center " style={{ minHeight: "calc(100vh - 6rem)" }}>
        {/* header */}
        <div className="text-xl font-semibold">Masuk ke senikita</div>
        <div className="">Belum punya akun?{" "}
          <Link to="/signup" className="text-primary hover:underline hover:text-tertiary">
            Daftar disini
          </Link>
        </div>

        {/* form */}
        <div className="w-full max-w-md px-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* google login */}
            <div>
              <button
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
              <div className="">atau</div>
              <div className="h-[0.5px] w-full bg-gray-200 flex-1 my-[0.5rem]"></div>
            </div>
            {/* email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-primary focus:border-primary/60"
                placeholder="Masukkan Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-primary focus:border-primary/60"
                  placeholder="Masukkan Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  className="absolute inset-y-0 flex items-center cursor-pointer right-4"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <IoEyeOffOutline className="text-lg text-gray-400" />
                  ) : (
                    <IoEyeOutline className="text-lg text-gray-400" />
                  )}
                </div>
              </div>
            </div>

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
                {isLoading
                  ?
                  <div className="w-6 h-6 border-2 border-white border-solid rounded-full border-t-transparent animate-spin"></div>
                  :
                  "Submit"
                }
              </button>
            </div>
          </form>
        </div >
      </div >
    </>
  );
};

export default LogIn;
