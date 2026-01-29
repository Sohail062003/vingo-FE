import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import apiInterceptor from "../api/apiInterceptor";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // handle Login
  const handleSignin = async () => {
    setLoading(true);
    try {
      const data = {
        email,
        password,
      };
      const response = await apiInterceptor.post("/auth/signin", data);
      
      dispatch(setUserData(response.data));
      navigate("/");

      setError("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Signin failed:", error);
      setError(
        error?.response?.data?.message || "An error occurred during signin."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);

      const { data } = await apiInterceptor.post(
        "/auth/google-auth",
        {
          email: response.user.email,
        },
        { withCredentials: true }
      );

      if (data.status === "fail") {
        return setError(data.message);
      }
      dispatch(setUserData(data));
      setError("");
    } catch (error) {
      console.error("Google authentication failed:", error);
      setError(
        error.response?.data?.message ||
          "An error occurred during Google signin."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">
      {/* Glass Card */}
      <div className="relative m-6 w-full max-w-lg bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/20 to-pink-500/20 blur-xl -z-10"></div>

        {/* Logo */}
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Vin<span className="text-orange-400">go</span>
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Sign in to your account to start ordering
        </p>

        {/* Form */}
        <form className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-black/30 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* password */}
          <div>
            <label className="text-sm text-gray-300">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-3 pr-12 rounded-lg bg-black/30 text-white border border-white/20 focus:ring-2 focus:ring-orange-400 outline-none"
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer hover:text-orange-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={22} />
                ) : (
                  <AiFillEye size={22} />
                )}
              </div>
            </div>
          </div>

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-orange-400 hover:text-orange-300 hover:underline transition"
            >
              Forgot password?
            </Link>
          </div>

          {/* SignIp Button */}
          <button
            type="button"
            onClick={handleSignin}
            className="w-full py-3 mt-2 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold tracking-wide shadow-lg hover:scale-[1.02] transition"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <ClipLoader size={18} color="#fff" />
                <span className="text-sm">Logging to your accout</span>
              </div>
            ) : (
              "Login Account"
            )}
          </button>
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">*{error}</p>
          )}
        </form>

        <div className="flex items-center gap-3 text-gray-400">
          <div className="flex-1 h-[1px] bg-white/20"></div>
          <span className="text-sm">OR</span>
          <div className="flex-1 h-[1px] bg-white/20"></div>
        </div>

        {/* Google Signup */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          className="w-full mt-6 flex items-center justify-center gap-3 py-3 rounded-lg bg-white text-black font-medium shadow-md hover:scale-[1.02] transition"
          disabled={loading}
        >
          <FcGoogle size={22} />
          Sign up with Google
        </button>

        {/* Footer */}

        <p className="text-center text-gray-400 mt-6 text-sm">
          don't have an account?{" "}
          <Link to="/signup" className="text-orange-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
