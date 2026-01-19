import { useSelector } from "react-redux";
import UserDashboard from "../components/UserDashboard";
import OwnerDashboard from "../components/OwnerDashboard";
import DeliveryDashboard from "../components/DeliveryDashboard";


function Home() {

  const {userData} = useSelector(state=>state.user);
  if (!userData) return null;
  return (
    <>
      {userData?.data?.user?.role=="user" && <UserDashboard />}
      {userData?.data?.user?.role=="owner" && <OwnerDashboard />}
      {userData?.data?.user?.role=="deliveryBoy" && <DeliveryDashboard />}
    </>
  )
}

export default Home