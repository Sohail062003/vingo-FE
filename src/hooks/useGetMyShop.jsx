import React, { useEffect } from 'react'
import apiInterceptor from "../api/apiInterceptor";
import { useDispatch, useSelector } from 'react-redux';
import { setMyShopData } from '../redux/ownerSlice';

function useGetMyShop() {

  const dispatch = useDispatch()
  // const calledRef = useRef(false);
  const {userData} = useSelector(state=>state.user);

  useEffect(() => {
    // if (calledRef.current) return; 
     // ❌ block second call
    // calledRef.current = true;

    const fetchShop = async () => {
        try {
            const result = await apiInterceptor.post("/shop/get-shop",{ withCredentials: true });
            dispatch(setMyShopData(result.data));
        } catch (error) {
          console.error("unable to fetch  getCurrent shop",error.message)
          // dispatch(setMyShopData(null));   
        }
    }

    fetchShop();
  }, [dispatch, userData]);
}

export default useGetMyShop;