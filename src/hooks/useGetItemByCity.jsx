import React, { useEffect } from 'react'
import apiInterceptor from "../api/apiInterceptor";
import { useDispatch, useSelector } from 'react-redux';
import { setItemsInMyCity } from '../redux/userSlice';

function useGetItemByCity() {

  const dispatch = useDispatch();
  const {city} = useSelector(state => state.user) 
  useEffect(() => {

    const fetchItems = async () => {
        try {
            const result = await apiInterceptor.get(`/item/get-by-city/${city}`,{withCredentials: true});
            dispatch(setItemsInMyCity(result.data));
            console.log("items by city",result.data)
        } catch (error) {
          console.error("unable to fetch  getCurrent user",error)
        }
    }

    fetchItems();
  }, [dispatch, city]);
}

export default useGetItemByCity