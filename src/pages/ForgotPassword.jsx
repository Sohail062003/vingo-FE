import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import apiInterceptor from "../api/apiInterceptor";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handelSendOtp = async () => {
    try {
      const data = { email };
      const response = await apiInterceptor.post("/auth/send-otp", data, {
        withCredentials: true,
      });
      if (response.data.status === "fail") {
        alert(response.data.message);
        return;
      }
      setStep(2);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handelVerifyOtp = async () => {
    try {
      const data = { email, otp };
      const response = await apiInterceptor.post("/auth/verify-otp", data, {
        withCredentials: true,
      });
      if (response.data.status === "fail") {
        alert(response.data.message);
        return;
      }
      setStep(3);
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const handelResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const data = { newPassword };
      const response = await apiInterceptor.post("/auth/reset-password", data, {
        withCredentials: true,
      });
      if (response.data.status === "fail") {
        alert(response.data.message);
        return;
      }
      navigate("/signin");
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/20 to-pink-500/20 blur-xl -z-10"></div>

        <div className="flex items-center justify-between mb-6">
          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="p-2 rounded-full hover:bg-white/10 transition"
          >
            <IoIosArrowBack className="text-white text-2xl" />
          </button>

          {/* Title */}
          <h2 className="flex-1 text-center text-3xl font-bold text-white">
            Reset <span className="text-orange-400">Password</span>
          </h2>

          {/* Spacer to keep title centered */}
          <div className="w-10"></div>
        </div>

        <p className="text-center text-gray-300 mb-6">
          {step === 1 && "Enter your registered email"}
          {step === 2 && "Enter the OTP sent to your email"}
          {step === 3 && "Create a new password"}
        </p>

        {/* STEP 1 – EMAIL */}
        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-black/30 text-white border border-white/20 focus:ring-2 focus:ring-orange-400 outline-none mb-4"
            />

            <button
              onClick={handelSendOtp}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold shadow-lg"
            >
              Send OTP
            </button>
          </>
        )}

        {/* STEP 2 – OTP */}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 rounded-lg bg-black/30 text-white border border-white/20 focus:ring-2 focus:ring-orange-400 outline-none mb-4 text-center tracking-widest"
            />

            <button
              onClick={handelVerifyOtp}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold shadow-lg"
            >
              Verify OTP
            </button>
          </>
        )}

        {/* STEP 3 – RESET PASSWORD */}
        {step === 3 && (
          <>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-black/30 text-white border border-white/20 focus:ring-2 focus:ring-orange-400 outline-none mb-3"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-black/30 text-white border border-white/20 focus:ring-2 focus:ring-orange-400 outline-none mb-4"
            />

            <button
              onClick={handelResetPassword}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold shadow-lg"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
