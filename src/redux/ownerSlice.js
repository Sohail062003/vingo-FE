import { createSlice } from "@reduxjs/toolkit";

const ownerSlice = createSlice({
    name: "owner",
    initialState: {
        myShopData: null,
        // myShopItem: null,
        loading: true,
    },
    reducers: {
        setMyShopData: (state, action)=>{
            state.myShopData = action.payload;
            state.loading = false;
        },
        
    },
});

export const {setMyShopData} = ownerSlice.actions;
export default ownerSlice.reducer
