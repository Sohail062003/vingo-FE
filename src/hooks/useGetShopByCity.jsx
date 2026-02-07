import React, { useEffect } from 'react'
import apiInterceptor from "../api/apiInterceptor";
import { useDispatch, useSelector } from 'react-redux';
import { setShopInMyCity } from '../redux/userSlice';

function useGetShopByCity() {

  const dispatch = useDispatch();
  const {city} = useSelector(state => state.user) 
  useEffect(() => {

    const fetchShops = async () => {
        try {
            const result = await apiInterceptor.get(`/shop/get-by-city/${city}`,{withCredentials: true});
            dispatch(setShopInMyCity(result.data));
            // console.log("shop by city",result.data)
        } catch (error) {
          console.error("unable to fetch  getCurrent user",error)
        }
    }

    fetchShops();
  }, [dispatch, city]);
}

export default useGetShopByCity