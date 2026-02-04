import React, { useState, useEffect } from "react";
import { FaStar, FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

function FoodCard({ data }) {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const {cartItems} = useSelector(state => state.user);

  const isInCart = cartItems.some(item => item.id === data._id);
  const [quantity, setQuantity] = useState(0);

  // 🔥 Sync quantity to cart
  useEffect(() => {
    if (quantity > 0) {
      dispatch(
        addToCart({
          id: data._id,
          name: data.name,
          price: data.price,
          image: data.image,
          shop: data.shop,
          foodType: data.foodType,
          quantity,
        })
      );
    }
  }, [quantity, dispatch, data]);

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={i < rating ? "text-yellow-400" : "text-gray-400"}
      />
    ));

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl hover:scale-[1.02] transition">

      {/* IMAGE */}
      <div className="relative h-40">
        <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded-full flex gap-1 text-xs">
          {renderStars(Math.round(data?.rating?.average || 0))}
          <span>({data?.rating?.count || 0})</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg truncate">{data.name}</h3>
        <p className="text-sm text-gray-300 truncate">
          {data.description || "Delicious food made with love"}
        </p>

        <div className="flex justify-between items-center pt-3">
          <span className="text-lg font-bold text-green-400">
            ₹{data.price}
          </span>

          {/* ADD / QUANTITY */}
          {quantity === 0 ? (
            <button
              onClick={() => setQuantity(1)}
              className="px-5 py-1.5 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition"
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-full px-3 py-1">
              <button
                onClick={() => setQuantity((q) => Math.max(0, q - 1))}
                className="text-red-400 hover:scale-110 transition"
              >
                <FaMinus size={12} />
              </button>

              <span className="font-semibold">{quantity}</span>

              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="text-green-400 hover:scale-110 transition"
              >
                <FaPlus size={12} />
              </button>
            </div>
          )}
        </div>
        {isInCart && (
    <button
      onClick={()=> navigate('/cart')}
      className="w-full py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:opacity-90 transition"
    >
      ORDER NOW
    </button>
  )}
      </div>
    </div>
  );
}

export default FoodCard;
