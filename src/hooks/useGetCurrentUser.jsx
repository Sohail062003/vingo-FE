// import React, { useEffect, useRef } from 'react'
// import apiInterceptor from "../api/apiInterceptor";
// import { useDispatch } from 'react-redux';
// import { setUserData } from '../redux/userSlice';

// function useGetCurrentUser() {

//   const dispatch = useDispatch()
//    const calledRef = useRef(false);
//   useEffect(() => {
//     if (calledRef.current) return; // ❌ block second call
//     calledRef.current = true;

    
//     const fetchUser = async () => {
//         try {
//             const result = await apiInterceptor.get("/user/current-user",{withCredentials: true});
//             dispatch(setUserData(result.data));
//         } catch (error) {
//           console.error("unable to fetch  getCurrent user",error)
//           dispatch(setUserData(null));   
//         }
//     }

//     fetchUser();
//   }, [dispatch])
// }

// export default useGetCurrentUser
import { useEffect, useRef,  } from "react";
import { useDispatch } from "react-redux";
import apiInterceptor from "../api/apiInterceptor";
import { setUserData, setAuthLoading } from "../redux/userSlice";

function useGetCurrentUser() {
  const dispatch = useDispatch();
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    const fetchUser = async () => {
      try {
        const res = await apiInterceptor.get(
          "/user/current-user",
          { withCredentials: true }
        );
        
        dispatch(setUserData(res.data));
      } catch (error) {
        console.error(error);
        
         if (error?.response?.status === 401) {
      dispatch(setUserData(null));
    } else {
      // network issue — just stop the loader without clearing user
      dispatch(setAuthLoading(false));
    }

      }
    };

    fetchUser();
  }, [dispatch]);
}

export default useGetCurrentUser;
