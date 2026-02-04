import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import CartItemCard from "../components/user-components/CartItemCard";

function CartPage() {
  const { cartItems, totalAmount } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const isCartEmpty = !cartItems || cartItems.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full hover:bg-white/10 transition"
          >
            <FaArrowLeft className="text-orange-400" size={22} />
          </button>

          <div className="flex items-center gap-3">
            <FaShoppingCart className="text-orange-400" size={24} />
            <h1 className="text-2xl sm:text-3xl font-bold">Your Cart</h1>
          </div>
        </div>

        {/* EMPTY CART */}
        {isCartEmpty ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 sm:p-12 text-center shadow-xl max-w-md w-full">
              <h2 className="text-xl sm:text-2xl font-semibold mb-3">
                Your cart is empty 🛒
              </h2>

              <p className="text-gray-300 mb-6 text-sm sm:text-base">
                Looks like you haven’t added anything yet
              </p>

              <button
                onClick={() => navigate("/")}
                className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 font-semibold hover:opacity-90 transition"
              >
                Go to Home
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* CART ITEMS */}
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <CartItemCard key={index} data={item} />
              ))}
            </div>

            {/* CART SUMMARY */}
            <div
              className="
                mt-8
                bg-white/10 backdrop-blur-xl
                border border-white/20
                rounded-2xl p-5 sm:p-6
                shadow-xl
                flex flex-col sm:flex-row
                gap-4
                items-start sm:items-center
                justify-between
              "
            >
              <div>
                <p className="text-sm text-gray-300">Total Amount</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-green-400">
                  ₹{totalAmount}
                </h2>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="
                  w-full sm:w-auto
                  px-10 py-3
                  rounded-xl
                  bg-gradient-to-r from-green-500 to-emerald-600
                  font-semibold
                  hover:opacity-90
                  transition
                "
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
