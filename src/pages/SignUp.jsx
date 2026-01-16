import { useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import apiInterceptor from "../api/apiInterceptor";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      const data = {
        fullName,
        email,
        password,
        mobile,
        role,
      };
      const response = await apiInterceptor.post("/auth/signup", data);
      if (response?.data?.status === "fail") {
        setError(response?.data?.message);
        return;
      }
      setError("");
      // console.log("Signup successful:", response.data);
    } catch (error) {
      console.error("Signup failed:", error);
      setError(
        error?.response?.data?.message || "An error occurred during signup."
      );
    } finally {
      setLoading(false);
      setFullName("");
      setEmail("");
      setPassword("");
      setMobile("");
    }
  };

  const handleGoogleAuth = async () => {
    try {
      if (!mobile) {
        return setError(
          "Please enter your mobile number before proceeding with Google authentication."
        );
      }
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);

      const { data } = await apiInterceptor.post(
        "/auth/google-auth",
        {
          fullName: response.user.displayName,
          email: response.user.email,
          mobile,
          role,
        },
        { withCredentials: true }
      );

      if (data.status === "fail") {
        return setError(data.message);
      }
      setError("");
      console.log("Google authentication successful:", data);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "An error occurred during Google signin."
      );
      console.error("Google authentication failed:", error);
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
          Create your account to start ordering
        </p>

        {/* Form */}
        <form className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="text-sm text-gray-300">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-black/30 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

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
                placeholder="Create password"
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

          <div>
            <label className="text-sm text-gray-300">Mobile</label>
            <input
              type="tel"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-black/30 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="text-sm text-gray-300">Select Role</label>
            <div className="grid grid-cols-3 gap-3 mt-2">
              {["user", "owner", "deliveryBoy"].map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setRole(item)}
                  className={`py-2 rounded-lg text-sm font-medium transition
                    ${
                      role === item
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                        : "bg-white/10 text-gray-300 hover:bg-white/20"
                    }
                  `}
                >
                  {item === "user" && "User"}
                  {item === "owner" && "Owner"}
                  {item === "deliveryBoy" && "Delivery Boy"}
                </button>
              ))}
            </div>
          </div>

          {/* Signup Button */}
          <button
            type="button"
            onClick={handleSignup}
            className="w-full py-3 mt-2 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold tracking-wide shadow-lg hover:scale-[1.02] transition"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <ClipLoader size={18} color="#fff" />
                <span className="text-sm">Creating account...</span>
              </div>
            ) : (
              "Sign Up"
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
          Sign in with Google
        </button>

        {/* Footer */}
        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/signin" className="text-orange-400 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
