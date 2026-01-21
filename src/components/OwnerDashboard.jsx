import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "./commons/Navbar";
import { FaStoreAlt, FaPlusCircle } from "react-icons/fa";

function OwnerDashboard() {
  const { myShopData } = useSelector((state) => state.owner);

  return (
    <>
      <Navbar />

      {!myShopData && (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
          {/* Glass Card */}
          <div className="relative w-full max-w-xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 text-center">
            
            {/* Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/20 to-pink-500/20 blur-xl -z-10"></div>

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg">
                <FaStoreAlt size={28} />
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-2xl font-bold text-white mb-2">
              No Shop Registered Yet
            </h2>

            {/* Subtitle */}
            <p className="text-gray-300 text-sm mb-6">
              You haven’t created your shop yet. Register your shop to start
              receiving orders and manage your business.
            </p>

            {/* Action Button */}
            <Link
              to="/owner/create-shop"
              className="
                inline-flex items-center gap-2
                px-6 py-3
                rounded-lg
                bg-gradient-to-r from-orange-500 to-pink-500
                text-white font-semibold
                shadow-lg
                hover:scale-[1.03]
                transition
              "
            >
              <FaPlusCircle size={18} />
              Create Your Shop
            </Link>

            {/* Hint */}
            <p className="text-xs text-gray-400 mt-4">
              It only takes a minute to get started 🚀
            </p>
          </div>
        </div>
      )}

      {/* When shop exists */}
      {myShopData && (
        <div className="p-6 text-white">
          OwnerDashboard
        </div>
      )}
    </>
  );
}

export default OwnerDashboard;
