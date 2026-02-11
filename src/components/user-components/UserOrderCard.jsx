import React from "react";
import {
  FaRupeeSign,
  FaStore,
  FaCalendarAlt,
  FaHashtag,
} from "react-icons/fa";

function UserOrderCard({ data }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // console.log(data);

  return (
    <div className="w-full mb-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl overflow-hidden">

      {/* ================= HEADER ================= */}
      <div className="px-5 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <FaHashtag className="text-orange-400" />
            Order ID: <span className="text-white font-medium">{data._id.slice(-6)}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <FaCalendarAlt />
            {formatDate(data.createdAt)}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 font-semibold">
            {data.paymentMethod.toUpperCase()}
          </span>

          <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 font-semibold">
            {data.shopOrders?.[0]?.status || "Pending"}
          </span>
        </div>
      </div>

      {/* ================= BODY ================= */}
      <div className="p-5 space-y-6">
        {data.shopOrders.map((shopOrder, shopIndex) => (
          <div
            key={shopIndex}
            className="rounded-xl border border-white/10 bg-black/30 p-4 space-y-4"
          >
            {/* Shop Header */}
            <div className="flex items-center gap-2 text-white font-semibold">
              <FaStore className="text-orange-400" />
              {shopOrder.shop.name}
            </div>

            {/* Items */}
            <div className="space-y-3">
              {shopOrder?.shopOrderItems?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition"
                >
                  <img
                    src={item?.item?.image}
                    alt={item?.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover border border-white/20"
                  />

                  <div className="flex-1">
                    <p className="text-white font-medium">{item.name}</p>
                    <p className="text-xs text-gray-400">
                      Qty × {item?.quantity}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 font-semibold text-orange-400">
                    <FaRupeeSign />
                    {item?.price * item?.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* Shop Subtotal */}
            <div className="flex justify-between text-sm border-t border-white/10 pt-3">
              <span className="text-gray-400">Shop Subtotal</span>
              <span className="flex items-center gap-1 text-white font-semibold">
                <FaRupeeSign />
                {shopOrder?.subTotal}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ================= FOOTER ================= */}
      <div className="px-5 py-4 bg-black/30 border-t border-white/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-lg font-bold text-white flex items-center gap-1">
          <FaRupeeSign />
          {data?.totalAmount}
        </div>

        <button className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold hover:scale-[1.03] transition">
          Track Order
        </button>
      </div>
    </div>
  );
}

export default UserOrderCard;
