import React, { useEffect, useRef } from 'react'
import apiInterceptor from "../api/apiInterceptor";
import { useDispatch } from 'react-redux';
import { setMyShopData } from '../redux/ownerSlice';

function useGetMyShop() {

  const dispatch = useDispatch()
   const calledRef = useRef(false);
  useEffect(() => {
    if (calledRef.current) return; // ❌ block second call
    calledRef.current = true;

    
    const fetchShop = async () => {
        try {
            const result = await apiInterceptor.post("/shop/get-shop",{withCredentials: true});
            dispatch(setMyShopData(result.data));
        } catch (error) {
          console.error("unable to fetch  getCurrent shop",error)
          dispatch(setMyShopData(null));   
        }
    }

    fetchShop();
  }, [dispatch])
}

export default useGetMyShop;