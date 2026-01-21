
import { useSelector } from "react-redux";
import UserDashboard from "../components/UserDashboard";
import OwnerDashboard from "../components/OwnerDashboard";
import DeliveryDashboard from "../components/DeliveryDashboard";

function Home() {
  const { userData, loading } = useSelector((state) => state.user);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
        Loading your dashboard...
      </div>
    );
  }

  if (!userData) return null;

  const role = userData?.data?.user?.role;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-hidden">
      {/* ✨ Soft background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10 blur-3xl -z-10" />

      {/* 🧩 Role-based Dashboard */}
      {role === "user" && <UserDashboard />}
      {role === "owner" && <OwnerDashboard />}
      {role === "deliveryBoy" && <DeliveryDashboard />}
    </div>
  );
}

export default Home;

