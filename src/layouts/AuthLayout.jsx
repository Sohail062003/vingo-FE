import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';

function AuthLayout() {
  const {userData, authLoading } = useSelector(state=>state.user);
  // modify or otimised the code

  // ⏳ While checking auth
  if (authLoading) {
    return <div className="h-screen flex items-center justify-center">
      <ClipLoader size={45} color="#f97316" />
    </div>;
  }

  const user = userData?.data?.user;
  if (!user) {

    return <Navigate to="/signin"  />;
  }

  return <Outlet /> ;
   
}

export default AuthLayout