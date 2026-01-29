import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        city: null,
        state: null,
        currentAddress: null,
        shopInMyCity: null,
        itemsInMyCity: null,
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
        setState: (state, action)=>{
            state.state = action.payload;
            state.loading = false;
        },
        setCurrentAddress: (state, action)=>{
            state.currentAddress = action.payload;
            state.loading = false;
        },
        setShopInMyCity: (state, action)=>{
            state.shopInMyCity = action.payload;
            state.loading = false;
        },
        setItemsInMyCity: (state, action)=>{
            state.itemsInMyCity = action.payload;
            state.loading = false;
        },
        
    },
});

export const {setUserData, setCity, setState, setCurrentAddress, setShopInMyCity, setItemsInMyCity} = userSlice.actions;
export default userSlice.reducer
