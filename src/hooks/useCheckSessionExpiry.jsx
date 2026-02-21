import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

const useCheckSessionExpiry = () => {
  const dispatch = useDispatch();
  const { loginTime } = useSelector(state => state.user);

  useEffect(() => {
    if (!loginTime) return;

    const ONE_DAYS = 1 * 24 * 60 * 60 * 1000;
    const now = Date.now();

    if (now - loginTime > ONE_DAYS) {
      dispatch(setUserData(null)); // clears user + loginTime
    }
  }, []); // runs only once on app load
};

export default useCheckSessionExpiry;