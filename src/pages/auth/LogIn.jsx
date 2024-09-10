import NavbarLogo from "../../components/navbar/NavbarLogo";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isFormValid = email && password;

  return (
    <>
      {/* navbar */}
      <NavbarLogo />
      {/* login form */}
      <div
        className="flex flex-col justify-center items-center "
        style={{ minHeight: "calc(100vh - 6rem)" }}
      >
        {/* header */}
        <div className="font-semibold text-xl">Masuk ke senikita</div>
        <div className="">
          Belum punya akun?{" "}
          <Link
            to="/signin"
            className="text-primary hover:underline hover:text-tertiary"
          >
            Daftar disini
          </Link>
        </div>

        {/* form */}
        <div className="px-8 w-full max-w-md">
          <form className="space-y-4">
            {/* google login */}
            <div>
              <button
                type="button"
                className="mt-5 w-full py-3 flex justify-center items-center gap-2 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
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
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-primary focus:border-primary/60"
                placeholder="Masukkan Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-primary focus:border-primary/60"
                  placeholder="Masukkan Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <IoEyeOffOutline className="text-gray-400 text-lg" />
                  ) : (
                    <IoEyeOutline className="text-gray-400 text-lg" />
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

            {/* submit button*/}
            <div>
              <button
                type="submit"
                className={`w-full py-3 text-white font-semibold rounded-xl ${
                  isFormValid
                    ? "bg-primary hover:bg-primary-dark"
                    : "bg-gray-300 cursor-not-allowed"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                disabled={!isFormValid}
              >
                Masuk
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LogIn;
