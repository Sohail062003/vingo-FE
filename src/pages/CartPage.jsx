import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import CartItemCard from "../components/user-components/CartItemCard";

function CartPage() {
  const { cartItems } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const isCartEmpty = !cartItems || cartItems.length === 0;

  // Calculate grand total
  const grandTotal = cartItems?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 py-8 text-white">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <FaShoppingCart className="text-orange-400" size={26} />
          <h1 className="text-2xl md:text-3xl font-bold">Your Cart</h1>
        </div>

        {/* EMPTY CART */}
        {isCartEmpty ? (
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-10 text-center shadow-xl">
            <h2 className="text-xl font-semibold mb-2">
              Your cart is empty 🛒
            </h2>
            <p className="text-gray-300 mb-6">
              Looks like you haven’t added anything yet
            </p>

            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 font-semibold hover:opacity-90 transition"
            >
              Go to Home
            </button>
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
            <div className="mt-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xl">
              <div>
                <p className="text-sm text-gray-300">Total Amount</p>
                <h2 className="text-2xl font-bold text-green-400">
                  ₹{grandTotal}
                </h2>
              </div>

              <button
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 font-semibold hover:opacity-90 transition"
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
