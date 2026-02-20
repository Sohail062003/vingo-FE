import { useSelector } from "react-redux"
import Navbar from "./commons/Navbar"
import apiInterceptor from "../api/apiInterceptor";
import { useEffect, useState } from "react";

function DeliveryDashboard() {
  const {userData} = useSelector(state=>state.user);
  const [availableAssignments, setAvailableAssignments] = useState([]);
  const user = userData.data.user;

  
  useEffect(()=> {
    const getAssignment = async () => {
      try {
        const result = await apiInterceptor.get("/order/get-assignments", {withCredentials: true});
        setAvailableAssignments(result.data);
      } catch (error) {
        console.error("error in getAssignment-", error)
      }
    }
    getAssignment();
  }, [userData])

  return (
    <>
  <Navbar />

  <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 sm:px-6 py-6 text-white">

    {/* ================= HEADER CARD ================= */}
    <div className="relative rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-6 mb-8 overflow-hidden">

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10 blur-2xl -z-10"></div>

      <h2 className="text-2xl sm:text-3xl font-bold">
        Welcome, <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
          {user.fullName}
        </span>
      </h2>

      <p className="mt-2 text-sm text-gray-300">
        📍 Latitude: {user?.location?.coordinates?.[1]}  
        <span className="mx-2 text-gray-500">|</span>
        Longitude: {user?.location?.coordinates?.[0]}
      </p>

    </div>


    {/* ================= AVAILABLE ORDERS SECTION ================= */}
    <div className="relative rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-6">

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">
          Available Orders
        </h3>

        <span className="text-xs bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full border border-orange-500/30">
          {availableAssignments.length} Orders
        </span>
      </div>


      {/* ================= GRID ================= */}
      {availableAssignments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

          {availableAssignments.map((a, index) => (
            <div
              key={index}
              className="group bg-black/40 border border-white/10 rounded-2xl p-5 
              hover:bg-black/60 hover:border-orange-400/40 
              transition duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Shop Name */}
                <h4 className="text-lg font-semibold text-white group-hover:text-orange-400 transition">
                  {a.shopName}
                </h4>

                {/* Address */}
                <p className="text-sm text-gray-400 mt-2">
                  📍 {a.deliveryAddress.text}
                </p>

                {/* Order Meta */}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-300">
                  <span>{a?.items.length} Items</span>
                  <span className="font-semibold text-orange-400">
                    ₹ {a.subTotal}
                  </span>
                </div>
              </div>

              {/* Button */}
              <button
                className="mt-6 w-full py-2.5 rounded-xl 
                bg-gradient-to-r from-orange-500 to-pink-500 
                text-white font-semibold 
                shadow-lg 
                hover:scale-[1.03] hover:shadow-orange-500/30 
                transition duration-300"
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

  </div>
</>
  )
}

export default DeliveryDashboard