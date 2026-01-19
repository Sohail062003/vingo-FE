// import { useSelector } from "react-redux";
// import UserDashboard from "../components/UserDashboard";
// import OwnerDashboard from "../components/OwnerDashboard";
// import DeliveryDashboard from "../components/DeliveryDashboard";

// function Home() {
//   const { userData } = useSelector((state) => state.user);
//   if (!userData) return null;
//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
//         {/* 🌌 Background Glow */}
//         <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10 blur-3xl -z-10" />

//         {/* 🧊 Dashboard Wrapper */}
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl min-h-[80vh] p-6">
//             {userData?.data?.user?.role == "user" && <UserDashboard />}
//             {userData?.data?.user?.role == "owner" && <OwnerDashboard />}
//             {userData?.data?.user?.role == "deliveryBoy" && (
//               <DeliveryDashboard />
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Home;


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

