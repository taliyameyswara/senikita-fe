import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { UserContext } from "../../context/UserContext";
import { useAuthApi } from '../../api/auth';


const OTPVerification = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(60); // 300 seconds = 5 minutes
  const [isOtpValid, setIsOtpValid] = useState(false);
  const inputRefs = useRef([]);
  const { email } = useContext(UserContext);
  const navigate = useNavigate();
  const { verifyOtp, resendOtp } = useAuthApi();

  // Handle timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // Format time into minutes and seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Handle OTP input
  const handleChange = (index, e) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setIsOtpValid(newOtp.every((digit) => digit !== "")); // Check if all OTP fields are filled
      // Move to next input
      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else if (e.target.selectionStart === 0 && value === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      setIsOtpValid(newOtp.every((digit) => digit !== "")); // Check if all OTP fields are filled
      // Move to previous input
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  // Handle OTP submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (isOtpValid) {
      console.log("Verifying OTP:", otpCode);
      verifyOtp(email, otpCode)
        .then((res) => {
          if (res.success) {
            toast.success("OTP berhasil diverifikasi, silahkan login");
            navigate('/login')
          } else {
            toast.error("OTP tidak valid");
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error("Terjadi kesalahan pada server");
        });
    } else {
      console.log("Invalid OTP");
    }
  };

  const handleSendOtp = () => {
    resendOtp(email)
      .then((res) => {
        if (res.success) {
          toast.success("Kode OTP berhasil dikirim ulang");
          setTimeLeft(300);
        } else {
          toast.error("Gagal mengirim ulang kode OTP");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Terjadi kesalahan pada server");
      });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 ">
      <div className="flex flex-col items-center justify-center p-20 border border-gray-200 rounded-3xl">
        {/* header */}
        <h1 className="mb-4 text-2xl font-bold">Verifikasi Kode OTP</h1>
        <p className="text-center text-gray-600">
          Kode verifikasi telah dikirimkan melalu email Anda.
        </p>

        {/* form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm mt-6 space-y-6"
        >
          {/* otp inputs */}
          <div className="flex items-center justify-center space-x-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                onChange={(e) => handleChange(index, e)}
                maxLength="1"
                className="w-12 h-12 text-xl text-center border border-gray-300 rounded-xl focus:outline-none focus:ring-primary focus:border-primary/60"
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </div>

          {/* timer */}
          {timeLeft > 0 ? (
            <div className="mt-2 text-center text-primary/80">
              Mohon menunggu{" "}
              <span className="font-semibold">{formatTime(timeLeft)}</span>{" "}
              untuk mengirim ulang kode
            </div>
          ) : (
            <>
              {/* resend OTP link */}
              <div className="mt-4 text-center text-primary">
                {timeLeft === 0 && (
                  <button onClick={handleSendOtp()} className="font-semibold underline">
                    Kirim ulang kode verifikasi
                  </button>
                )}
              </div>{" "}
            </>
          )}

          {/* submit button */}
          <div>
            <button
              type="submit"
              className={`w-full py-3 text-white font-semibold rounded-xl ${isOtpValid && timeLeft > 0
                ? "bg-primary hover:bg-primary-dark"
                : "bg-gray-300 cursor-not-allowed"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
            >
              Verifikasi Kode
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
