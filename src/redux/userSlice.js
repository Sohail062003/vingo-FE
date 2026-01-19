import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        city: null,
        loading: true,
    },
    reducers: {
        setUserData: (state, action)=>{
            state.userData = action.payload;
            state.loading = false;
        },
        setCity: (state, action)=>{
            state.city = action.payload;
            state.loading = false;
        },
    },
});

export const {setUserData, setCity} = userSlice.actions;
export default userSlice.reducer
