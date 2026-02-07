import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaHome, FaReceipt } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function OrderPlaced() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-10 text-center">
        
        {/* SUCCESS ICON */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-green-500/20 shadow-[0_0_40px_rgba(34,197,94,0.5)]">
            <BsCheckCircleFill className="text-green-400 text-6xl" />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Order Placed Successfully 🎉
        </h1>
        <p className="text-gray-300 text-sm sm:text-base">
          Thank you for your order! Your delicious food is on the way 🚀
        </p>

        {/* ORDER INFO CARD */}
        <div className="mt-8 bg-white/10 border border-white/20 rounded-2xl p-5 sm:p-6 text-left space-y-4">
          <div className="flex items-center gap-3">
            <FaReceipt className="text-orange-400" />
            <div>
              <p className="text-sm text-gray-400">Order ID</p>
              <p className="font-semibold">#ORD-XXXXXX</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MdDeliveryDining className="text-green-400 text-xl" />
            <div>
              <p className="text-sm text-gray-400">Estimated Delivery</p>
              <p className="font-semibold">30 - 40 minutes</p>
            </div>
          </div>

          <div className="border-t border-white/20 pt-4">
            <p className="text-sm text-gray-400 mb-1">Delivery Address</p>
            <p className="text-sm">
              Your selected delivery location will appear here
            </p>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/my-orders")}
            className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 font-semibold shadow-[0_0_20px_rgba(34,197,94,0.35)] hover:opacity-90 transition"
          >
            View My Orders
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex-1 px-6 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition flex items-center justify-center gap-2"
          >
            <FaHome />
            Back to Home
          </button>
        </div>

        {/* FOOTER NOTE */}
        <p className="mt-6 text-xs text-gray-400">
          You’ll receive order updates in real-time 🚚
        </p>
      </div>
    </div>
  );
}

export default OrderPlaced;
