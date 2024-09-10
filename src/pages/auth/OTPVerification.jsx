import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const OTPVerification = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(10); // 300 seconds = 5 minutes
  const [isOtpValid, setIsOtpValid] = useState(false);
  const inputRefs = useRef([]);

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
      // Handle OTP verification logic here
      console.log("Verifying OTP:", otpCode);
    } else {
      console.log("Invalid OTP");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 ">
      <div className="flex flex-col justify-center items-center border-gray-200 border rounded-3xl p-20">
        {/* header */}
        <h1 className="text-2xl font-bold mb-4">Verifikasi Kode OTP</h1>
        <p className="text-center text-gray-600">
          Kode verifikasi telah dikirimkan melalu email Anda.
        </p>

        {/* form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-6 w-full max-w-sm"
        >
          {/* otp inputs */}
          <div className="flex items-center justify-center  space-x-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                onChange={(e) => handleChange(index, e)}
                maxLength="1"
                className="w-12 h-12 border border-gray-300 rounded-xl text-center text-xl focus:outline-none focus:ring-primary focus:border-primary/60"
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </div>

          {/* timer */}
          {timeLeft > 0 ? (
            <div className="mt-2 text-primary/80 text-center">
              Mohon menunggu{" "}
              <span className="font-semibold">{formatTime(timeLeft)}</span>{" "}
              untuk mengirim ulang kode
            </div>
          ) : (
            <>
              {/* resend OTP link */}
              <div className=" text-primary mt-4 text-center">
                {timeLeft === 0 && (
                  <Link to="/otp" className="underline font-semibold">
                    Kirim ulang kode verifikasi
                  </Link>
                )}
              </div>{" "}
            </>
          )}

          {/* submit button */}
          <div>
            <button
              type="submit"
              className={`w-full py-3 text-white font-semibold rounded-xl ${
                isOtpValid && timeLeft > 0
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
