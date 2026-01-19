import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
// import useGetCurrentUser from '../hooks/useGetCurrentUser'

function AuthLayout() {
  // useGetCurrentUser();
  const {userData, loading } = useSelector(state=>state.user);
  
  // ⏳ While checking auth
  if (loading) {
    return <div className="h-screen flex items-center justify-center">
      Checking session...
    </div>;
  }
  
  if (!userData) {

    return <Navigate to="/signin"  />;
  }

  return <Outlet /> ;
   
}

export default AuthLayout