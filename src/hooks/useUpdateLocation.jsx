import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiInterceptor from "../api/apiInterceptor";


function useUpdateLocation() {
  const dispatch = useDispatch();
  const {userData} = useSelector(state=>state.user);

//   useEffect(() => {
//     const updateLocation =async (lat, lon) => {
//         const result = await apiInterceptor.post(`/user/update-location`, {lat, lon}, {withCredentials: true});
//         console.log(result.data);
//     }

//     navigator.geolocation.watchPosition((pos)=> {
         
//         updateLocation(pos.coords.latitude, pos.coords.longitude);
//     })
//   }, [userData, dispatch]);

    useEffect(() => {
  const updateLocation = async (lon, lat) => {
    try {
      await apiInterceptor.post(
        `/user/update-location`,
        { lon, lat },
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Location update failed", err.message);
    }
  };

  navigator.geolocation.getCurrentPosition((pos) => {
    updateLocation(pos.coords.longitude, pos.coords.latitude);
  });

}, [userData, dispatch]);


} 

export default useUpdateLocation;
