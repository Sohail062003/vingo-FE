import React, { useEffect } from 'react'
import apiInterceptor from "../api/apiInterceptor";
import { useDispatch, useSelector } from 'react-redux';
import { setMyOrders } from '../redux/userSlice';

function useGetMyOrders() {

  const dispatch = useDispatch()
 
  const {userData} = useSelector(state=>state.user);

  useEffect(() => {
    
    const fetchOrders = async () => {
        try {
            const result = await apiInterceptor.get("/order/my-orders",{ withCredentials: true });
            dispatch(setMyOrders(result.data));
            console.log("fetched orders",result.data)
        } catch (error) {
          console.error("unable to fetch  my orders",error.message)
        }
    }

    fetchOrders();
  }, [dispatch, userData]);
}

export default useGetMyOrders;