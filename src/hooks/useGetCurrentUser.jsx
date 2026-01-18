import React, { useEffect } from 'react'
import apiInterceptor from "../api/apiInterceptor";
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function useGetCurrentUser() {

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
        try {
            const result = await apiInterceptor.get("/user/current-user",{withCredentials: true});
            dispatch(setUserData(result.data));
        } catch (error) {
          console.error("unable to fetch  getCurrent user",error)
          dispatch(setUserData(null));   
        }
    }

    fetchUser();
  }, [dispatch])
}

export default useGetCurrentUser