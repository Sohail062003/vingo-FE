import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
// import useGetCurrentUser from '../hooks/useGetCurrentUser'

function AuthLayout() {
  // useGetCurrentUser();
  const {userData, loading } = useSelector(state=>state.user);
  

  // ⏳ While checking auth
  if (loading) {
    return <div className="h-screen flex items-center justify-center">
      <ClipLoader size={45} color="#f97316" />
    </div>;
  }
  
  if (!userData?.data?.user) {

    return <Navigate to="/signin"  />;
  }

  return <Outlet /> ;
   
}

export default AuthLayout