import React from "react";
import { useDispatch } from "react-redux";
import { removeCartItem, updateQuantity } from "../../redux/userSlice";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

function CartdataCard({ data }) {
  const dispatch = useDispatch();

  const increaseQty = () => {
    dispatch(updateQuantity({ id: data.id, quantity: data.quantity + 1 }));
  };

  const decreaseQty = () => {
    if (data.quantity > 1) {
      dispatch(updateQuantity({ id: data.id, quantity: data.quantity - 1 }));
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 shadow-md w-full">
      
      {/* TOP SECTION */}
      <div className="flex gap-3">
        <img
          src={data.image}
          alt={data.name}
          className="w-20 h-20 rounded-lg object-cover"
        />

        <div className="flex-1">
          <h3 className="font-semibold text-base leading-tight line-clamp-2">
            {data.name}
          </h3>

          <p className="text-sm text-gray-300 mt-1">
            ₹{data.price} × {data.quantity}
          </p>

          <p className="text-green-400 font-bold mt-1">
            ₹{data.price * data.quantity}
          </p>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="my-3 border-t border-white/10" />

      {/* ACTION BAR */}
      <div className="flex items-center justify-between">
        
        {/* QUANTITY */}
        <div className="flex items-center gap-3">
          <button
            onClick={decreaseQty}
            className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-red-500/20 transition"
          >
            <FaMinus size={12} />
          </button>

          <span className="font-semibold text-lg min-w-[24px] text-center">
            {data.quantity}
          </span>

          <button
            onClick={increaseQty}
            className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-green-500/20 transition"
          >
            <FaPlus size={12} />
          </button>
        </div>

        {/* DELETE */}
        <button
          onClick={() => dispatch(removeCartItem(data.id))}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500 hover:text-white transition text-sm"
        >
          <FaTrash size={13} />
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartdataCard;
