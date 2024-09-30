import NavbarLogo from "../../components/navbar/NavbarLogo";
import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import { useAuthApi } from "../../api/auth";
import PasswordInput from "../../components/form-input/PasswordInput";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setEmailOTP } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const { register: registerApi } = useAuthApi();

  const isFormValid = name && email && password && confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true

    if (password.length < 8) {
      toast.error("Password minimal 8 karakter");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password tidak sama");
      setIsLoading(false);
      return;
    }

    try {
      const result = await registerApi(name, email, password);
      const { success, message } = result;
      toast[success ? "success" : "error"](
        success ? "Silahkan isi otp" : message
      );

      if (success) {
        setEmailOTP(email);
        navigate("/otp");
      }
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* navbar */}
      <NavbarLogo />
      {/* login form */}
      <div
        className="flex flex-col items-center justify-center"
        style={{ minHeight: "calc(100vh - 5rem)" }}
      >
        {/* header */}
        <div className="text-xl font-semibold">Daftar di senikita</div>
        <div className="">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-primary hover:underline hover:text-tertiary"
          >
            Masuk disini
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

            {/* name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nama Lengkap
              </label>
              <input
                type="name"
                id="name"
                className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-primary focus:border-primary/60"
                placeholder="Masukkan Nama Lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
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
                className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-primary focus:border-primary/60"
                placeholder="Masukkan Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* password */}
            <PasswordInput
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* confirm password */}
            <PasswordInput
              label="Konfirmasi Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                className={`w-full py-3 text-white font-semibold rounded-xl ${
                  isFormValid
                    ? "bg-primary hover:bg-primary-dark"
                    : "bg-gray-300 cursor-not-allowed"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex justify-center items-center`}
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-solid rounded-full border-t-transparent animate-spin"></div>
                ) : (
                  "Daftar"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
