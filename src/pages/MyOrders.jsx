import { useSelector } from "react-redux";
import { FaArrowLeft, FaBoxOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserOrderCard from "../components/user-components/UserOrderCard";
import OwnerOrderCard from "../components/owner-component/OwnerOrderCard";

function MyOrders() {
  const navigate = useNavigate();

  const { userData, myOrders } = useSelector((state) => state.user);

  const orders = myOrders?.data?.orders || [];
  const user = userData?.data?.user || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">

        {/* ================= HEADER ================= */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-white/10 transition"
          >
            <FaArrowLeft className="text-orange-400" size={22} />
          </button>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">My Orders</h1>
            <p className="text-sm text-gray-400 mt-1">
              Track and manage your recent orders
            </p>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        {orders.length === 0 ? (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center text-center py-20 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
            <FaBoxOpen className="text-5xl text-orange-400 mb-4" />
            <h2 className="text-xl font-semibold">No Orders Yet</h2>
            <p className="text-gray-400 mt-2 max-w-sm">
              You haven’t placed any orders yet. Start exploring and place your first order.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 font-semibold hover:scale-[1.03] transition"
            >
              Browse Shops
            </button>
          </div>
        ) : (
          /* ORDERS LIST */
          <div className="space-y-6">
            {orders.map((order, index) =>
              user.role === "user" ? (
                <UserOrderCard key={index} data={order} />
              ) : user.role === "owner" ? (
                <OwnerOrderCard key={index} data={order} />
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
