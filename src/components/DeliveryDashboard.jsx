import { useSelector } from "react-redux";
import Navbar from "./commons/Navbar";
import apiInterceptor from "../api/apiInterceptor";
import { useEffect, useState } from "react";
import DeliveryBoyTracking from "./delivery-component/DeliveryBoyTracking";

function DeliveryDashboard() {
  const { userData } = useSelector((state) => state.user);
  const [availableAssignments, setAvailableAssignments] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [showOtpbox, setShowOtpBox] = useState(false);
  const user = userData?.data?.user;

  useEffect(() => {
    const getAssignment = async () => {
      try {
        const result = await apiInterceptor.get(
          "/order/get-assignments",
          {},
          { withCredentials: true },
        );
        setAvailableAssignments(result.data);
      } catch (error) {
        console.error("error in getAssignment-", error);
      }
    };
    getAssignment();
  }, [userData]);

  useEffect(() => {
    const getCurrentOrder = async () => {
      try {
        const result = await apiInterceptor.get(`/order/get-current-order`, {
          withCredentials: true,
        });
        setCurrentOrder(result.data);
      } catch (error) {
        console.error("error", error);
      }
    };
    getCurrentOrder();
  }, []);

  const acceptOrder = async (assignmentId) => {
    try {
      const result = await apiInterceptor.post(
        `/order/accept-order/${assignmentId}`,
        { withCredentials: true },
      );
      console.log(result.data);
      //  await getCurrentOrder();
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleSendOtp = () => {
    setShowOtpBox(true);
  };

  console.log(currentOrder);

  return (
    <>
      <Navbar />

      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 sm:px-6 lg:px-10 py-6 text-white">
        {/* ================= WELCOME SECTION ================= */}
        <div className="relative rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-6 sm:p-8 mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10 blur-3xl -z-10"></div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Welcome back,
                <span className="ml-2 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  {user?.fullName}
                </span>
              </h2>

              <p className="mt-2 text-sm text-gray-300">
                📍 {user?.location?.coordinates?.[1]} ,
                {user?.location?.coordinates?.[0]}
              </p>
            </div>

            <div className="bg-black/30 px-4 py-2 rounded-xl border border-white/10 text-sm">
              🚚 Delivery Mode:{" "}
              <span className="text-green-400 font-semibold">Active</span>
            </div>
          </div>
        </div>

        {/* ================= ACTIVE ORDER ================= */}
        {currentOrder && (
          <div className="mb-10 grid lg:grid-cols-2 gap-8">
            {/* Order Info Card */}
            <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-6">Current Delivery</h3>

              <div className="space-y-4 text-sm text-gray-300">
                <div>
                  <p className="text-gray-400">Shop</p>
                  <p className="text-white font-semibold text-lg">
                    {currentOrder?.shopOrders?.shop?.name}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">Delivery Address</p>
                  <p className="text-white">
                    {currentOrder?.deliveryAddress?.text}
                  </p>
                </div>

                <div className="flex justify-between pt-4 border-t border-white/10">
                  <span>
                    {currentOrder?.shopOrder?.shopOrderItems?.length} Items
                  </span>
                  <span className="text-orange-400 font-semibold">
                    ₹ {currentOrder?.shopOrder?.subTotal}
                  </span>
                </div>
              </div>
              {!showOtpbox ? (
                <button
                  onClick={handleSendOtp}
                  className="mt-6 w-full py-3 rounded-xl 
                  bg-gradient-to-r from-green-500 to-emerald-500 
                  font-semibold tracking-wide
                  shadow-lg hover:scale-[1.02] hover:shadow-emerald-500/40 
                  transition duration-300"
                >
                  Mark as Delivered
                </button>
              ) : (
                <div className="mt-6 rounded-2xl bg-black/40 border border-white/10 p-6 backdrop-blur-md animate-fadeIn">
                  <p className="text-sm text-gray-300 mb-3">
                    Enter OTP sent to{" "}
                    <span className="text-orange-400 font-semibold">
                      {currentOrder?.user?.fullName}
                    </span>
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="Enter 6-digit OTP"
                      className="flex-1 px-4 py-3 rounded-xl 
                      bg-white/10 border border-white/20 
                      text-white placeholder-gray-400 
                      focus:outline-none focus:ring-2 focus:ring-orange-500 
                      focus:border-orange-400 transition"
                      />

                    <button
                      className="px-6 py-3 rounded-xl 
                      bg-gradient-to-r from-orange-500 to-pink-500 
                      font-semibold shadow-md 
                      hover:scale-[1.03] hover:shadow-orange-500/40 
                      transition duration-300"
                    >
                      Submit OTP
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-3">
                    ⚠️ Ask customer to share the OTP before confirming delivery.
                  </p>
                </div>
              )}
            </div>

            {/* Map Section */}
            <div className="rounded-3xl overflow-hidden border border-white/20 shadow-xl">
              {currentOrder?.deliveryBoyLocation &&
                currentOrder?.customerLocation && (
                  <DeliveryBoyTracking data={currentOrder} />
                )}
            </div>
          </div>
        )}

        {/* ================= AVAILABLE ORDERS ================= */}
        {!currentOrder && (
          <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-semibold">Available Orders</h3>

              <span className="text-xs bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full border border-orange-500/30">
                {availableAssignments.length} Orders
              </span>
            </div>

            {availableAssignments.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {availableAssignments.map((a, index) => (
                  <div
                    key={index}
                    className="group bg-black/40 border border-white/10 rounded-2xl p-5 hover:bg-black/60 hover:border-orange-400/40 transition duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-lg font-semibold text-white group-hover:text-orange-400 transition">
                        {a.shopName}
                      </h4>

                      <p className="text-sm text-gray-400 mt-2">
                        📍 {a.deliveryAddress.text}
                      </p>

                      <div className="mt-4 flex justify-between text-sm text-gray-300">
                        <span>{a?.items.length} Items</span>
                        <span className="font-semibold text-orange-400">
                          ₹ {a.subTotal}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => acceptOrder(a.assignmentId)}
                      className="mt-6 w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-[1.03] transition"
                    >
                      Accept Order
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-black/30 border border-white/10 rounded-xl p-8 text-center">
                <p className="text-gray-300 text-sm">
                  No available orders at the moment
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default DeliveryDashboard;
