import React from "react";
import { useDispatch } from "react-redux";
import { removeCartItem, updateQuantity } from "../../redux/userSlice";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

function CartdataCard({ data }) {
  const dispatch = useDispatch();

  const handleIncrease = (id, currentQty) => {
    dispatch(updateQuantity({ id, quantity: currentQty + 1 }));
  }

  const handleDecrease = (id, currentQty) => {
    if (currentQty > 1) {
      dispatch(updateQuantity({ id, quantity: currentQty - 1 }));
    }
  }


 

  return (
    <div className="flex datas-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-lg">
      {/* IMAGE */}
      <img
        src={data.image}
        alt={data.name}
        className="w-20 h-20 rounded-xl object-cover"
      />

      {/* INFO */}
      <div className="flex-1">
        <h3 className="font-semibold text-lg truncate">{data.name}</h3>
        <p className="text-sm text-gray-300">
          ₹{data.price} × {data.quantity}
        </p>

        <p className="text-green-400 font-semibold">
          ₹{data.price * data.quantity}
        </p>
      </div>

      {/* QUANTITY CONTROLS */}
      <div className="flex items-center justify-between mt-4">
        
        <div className="flex items-center gap-4 bg-black/40 border border-white/20 rounded-full px-4 py-2 m-2">
          <button
            onClick={() => handleDecrease(data.id, data.quantity)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition"
          >
            <FaMinus size={12} />
          </button>

          <span className="min-w-[20px] text-center font-semibold text-white">
            {data.quantity}
          </span>

          <button
            onClick={() => handleIncrease(data.id, data.quantity)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-white transition"
          >
            <FaPlus size={12} />
          </button>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => dispatch(removeCartItem(data.id))}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white transition"
        >
          <FaTrash size={14} />
          <span className="text-sm font-medium">Remove</span>
        </button>
      </div>


    </div>
  );
}

export default CartdataCard;
