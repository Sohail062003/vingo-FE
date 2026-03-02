import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apiInterceptor from '../api/apiInterceptor';
import DeliveryBoyTracking from '../components/delivery-component/DeliveryBoyTracking';

function TrackOrderPage() {

    const [currentOrder, setCurrentOrder] = useState();
    
    const {orderId}=useParams();
    const navigate = useNavigate();

    
    

  useEffect(()=> {
    const handleGetOrder = async () => {
    try {
        const result = await apiInterceptor.get(`/order/get-order-by-id/${orderId}`, {withCredentials: true})
       setCurrentOrder(result.data);
       console.log(result.data);
    } catch (error) {
        console.error(error);
    }
  }
    handleGetOrder();
  },[orderId]);

  return (
  <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 sm:px-6 lg:px-10 py-6">

    {/* 🔙 Back Button */}
    <button
      onClick={() => navigate(-1)}
      className="mb-6 flex items-center gap-2 text-gray-300 hover:text-white transition"
    >
      ← Back
    </button>

    {/* Page Title */}
    <h1 className="text-2xl sm:text-3xl font-bold mb-8">
      Track Your Order
    </h1>

    {currentOrder?.shopOrders?.map((shopOrders, index) => (
      <div
        key={index}
        className="mb-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-6 sm:p-8"
      >

        {/* ================= ORDER INFO ================= */}
        <div className="border-b border-white/10 pb-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {shopOrders?.shop?.name}
          </h2>

          <div className="text-sm text-gray-300 space-y-2">
            <p>
              <span className="text-gray-400">Items:</span>{" "}
              {shopOrders?.shopOrderItems?.map(i => i.name).join(", ")}
            </p>

            <p>
              <span className="text-gray-400">Subtotal:</span>{" "}
              <span className="text-orange-400 font-semibold">
                ₹ {shopOrders?.subTotal}
              </span>
            </p>

            <p>
              <span className="text-gray-400">Delivery Address:</span>{" "}
              {currentOrder?.deliveryAddress?.text}
            </p>
          </div>
        </div>

        {/* ================= STATUS SECTION ================= */}
        <div className="mb-6">
          {shopOrders.status !== "delivered" ? (
            <div className="flex items-center justify-between bg-black/40 border border-white/10 rounded-xl p-4">
              <div>
                <p className="text-sm text-gray-400">Order Status</p>
                <p className="text-lg font-semibold text-green-400 capitalize">
                  {shopOrders.status}
                </p>
              </div>

              <div className="animate-pulse text-sm text-gray-400">
                🚚 On the way
              </div>
            </div>
          ) : (
            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 text-green-400 font-semibold text-center">
              ✅ Delivered Successfully
            </div>
          )}
        </div>

        {/* ================= DELIVERY BOY ================= */}
        {shopOrders.status !== "delivered" && (
          <div className="mb-8 rounded-2xl bg-black/40 border border-white/10 p-6">
            <h3 className="text-lg font-semibold mb-4">
              Delivery Partner
            </h3>

            {shopOrders.assignedDeliveryBoy ? (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="font-semibold text-white">
                    {shopOrders.assignedDeliveryBoy.fullName}
                  </p>
                  <p className="text-sm text-gray-400">
                    📞 {shopOrders.assignedDeliveryBoy.mobile}
                  </p>
                </div>

                <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 font-semibold hover:scale-[1.03] transition">
                  Call
                </button>
              </div>
            ) : (
              <p className="text-gray-400 text-sm">
                Delivery partner not assigned yet.
              </p>
            )}
          </div>
        )}

        {/* ================= MAP ================= */}
        {shopOrders.assignedDeliveryBoy && shopOrders?.status !== "delivered" && (
          <div className="rounded-2xl overflow-hidden border border-white/20 shadow-xl">
            <DeliveryBoyTracking
              data={{
                deliveryBoyLocation: {
                  lat: shopOrders?.assignedDeliveryBoy?.location?.coordinates?.[1],
                  lon: shopOrders?.assignedDeliveryBoy?.location?.coordinates?.[0],
                },
                customerLocation: {
                  lat: currentOrder?.deliveryAddress?.latitude,
                  lon: currentOrder?.deliveryAddress?.longitude,
                },
              }}
            />
          </div>
        )}
      </div>
    ))}

  </div>
);
}

export default TrackOrderPage