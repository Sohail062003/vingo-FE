import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaCalendarAlt,
  FaHashtag,
} from "react-icons/fa";

function OwnerOrderCard({ data }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  console.log("item", data);

  return (
    <div className="w-full mb-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl overflow-hidden">
      {/* ================= HEADER ================= */}
      <div className="px-5 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-white/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <FaHashtag className="text-orange-400" />
            Order ID:
            <span className="text-white font-medium">{data._id.slice(-6)}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <FaCalendarAlt />
            {formatDate(data.createdAt)}
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 w-fit">
          {data.shopOrders?.[0]?.status || "Pending"}
        </span>
      </div>

      {/* ================= BODY ================= */}
      <div className="p-5 space-y-6">
        {/* CUSTOMER DETAILS */}
        <div className="rounded-xl bg-black/30 border border-white/10 p-4 space-y-3">
          <h3 className="text-white font-semibold mb-2">Customer Details</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <FaUser className="text-orange-400" />
              {data.user.fullName}
            </div>

            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-orange-400" />
              {data.user.mobile}
            </div>

            <div className="flex items-center gap-2 sm:col-span-2">
              <FaEnvelope className="text-orange-400" />
              {data.user.email}
            </div>
          </div>
        </div>

        {/* DELIVERY ADDRESS */}
        <div className="rounded-xl bg-black/30 border border-white/10 p-4 space-y-2">
          <h3 className="text-white font-semibold mb-2">Delivery Address</h3>

          <div className="flex items-start gap-2 text-sm text-gray-300">
            <FaMapMarkerAlt className="text-orange-400 mt-1" />
            <span>{data.deliveryAddress.text}</span>
          </div>

          <p className="text-xs text-gray-400">
            Lat: {data.deliveryAddress.latitude} , Lon:{" "}
            {data.deliveryAddress.longitude}
          </p>

          {data.shopOrders?.shopOrderItems?.length > 0 ? (
            data.shopOrders.shopOrderItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition"
              >
                <img
                  src={item.item.image}
                  alt={item.item.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover border border-white/20"
                />

                <div className="flex-1">
                  <p className="text-white font-medium">{item.item.name}</p>
                  <p className="text-xs text-gray-400">Qty × {item.quantity}</p>
                </div>

                <div className="flex items-center gap-1 font-semibold text-orange-400">
                  <FaRupeeSign />
                  {item.price * item.quantity}
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-400 italic">
              No items found for this order
            </p>
          )}
        </div>

        {/* ORDER TOTAL */}
        <div className="flex justify-between items-center text-sm border-t border-white/10 pt-4">
          <span className="text-gray-400">Order Total</span>
          <span className="flex items-center gap-1 text-white font-semibold text-lg">
            <FaRupeeSign />
            {data.totalAmount}
          </span>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="px-5 py-4 bg-black/30 border-t border-white/20 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        {/* STATUS SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="text-sm text-gray-400">Order Status</span>

          {/* Status Badge */}
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold
      bg-yellow-500/15 text-yellow-400 border border-yellow-500/30 w-fit"
          >
            {data.shopOrders.status}
          </span>

          {/* Status Selector (UI only) */}
          <select
            className="mt-1 sm:mt-0 bg-black/40 text-white text-sm px-4 py-2 rounded-lg
            border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500
            hover:border-orange-400 transition"
          >
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="out of delivery">Out for Delivery</option>
            
          </select>
        </div>

        {/* ACTION BUTTON */}
        <button
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl 
    bg-gradient-to-r from-orange-500 to-pink-500 
    text-white font-semibold 
    hover:scale-[1.03] hover:shadow-lg transition"
        >
          View Order Details
        </button>
      </div>
    </div>
  );
}

export default OwnerOrderCard;
