import React, { useState } from "react";
import { FaStar, FaMinus, FaPlus } from "react-icons/fa";

function FoodCard({ data }) {
  const [quantity, setQuantity] = useState(0);

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={i < rating ? "text-yellow-400" : "text-gray-400"}
      />
    ));

  return (
    <div className="
      bg-white/10 backdrop-blur-xl
      border border-white/20
      rounded-2xl
      overflow-hidden
      shadow-xl
      hover:scale-[1.02]
      transition
      w-full
    ">
      {/* IMAGE */}
      <div className="relative h-40">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
          {renderStars(Math.round(data?.rating?.average || 0))}
          <span className="text-[10px]">
            ({data?.rating?.count || 0})
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold truncate">
          {data.name}
        </h3>

        <p className="text-sm text-gray-300 truncate">
          {data.description || "Delicious food made with love"}
        </p>

        {/* FOOD TYPE */}
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border
          ${
            data.foodType === "veg"
              ? "bg-green-500/20 text-green-400 border-green-400/30"
              : "bg-red-500/20 text-red-400 border-red-400/30"
          }`}
        >
          {data.foodType === "veg" ? "Veg" : "Non-Veg"}
        </span>

        {/* PRICE + CART ACTION */}
        <div className="flex items-center justify-between pt-3">
          <span className="text-lg font-bold text-green-400">
            ₹{data.price}
          </span>

          {/* QUANTITY + ADD */}
          <div className="flex items-center gap-3">
            {/* Quantity Controller */}
            <div className="
              flex items-center gap-3
              bg-white/10
              border border-white/20
              rounded-full
              px-3 py-1
            ">
              <button
                onClick={() => setQuantity((q) => Math.max(0, q - 1))}
                className={`transition ${
                  quantity === 0
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-red-400 hover:scale-110"
                }`}
                disabled={quantity === 0}
              >
                <FaMinus size={12} />
              </button>

              <span className="text-sm font-semibold w-4 text-center">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="text-green-400 hover:scale-110 transition"
              >
                <FaPlus size={12} />
              </button>
            </div>

            {/* ADD BUTTON */}
            <button
              onClick={() => quantity === 0 && setQuantity(1)}
              className={`
                px-4 py-1.5 rounded-full text-sm font-semibold transition
                ${
                  quantity > 0
                    ? "bg-green-500/30 text-green-300 border border-green-400/30"
                    : "bg-green-500 text-white hover:bg-green-600"
                }
              `}
            >
              {quantity > 0 ? "ADDED" : "ADD"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
