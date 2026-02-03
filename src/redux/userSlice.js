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
        cartItems: [],
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
        addToCart: (state, action)=>{
            const cartItem= action.payload;
            const existingItem= state.cartItems.find(i => i.id == cartItem.id);
            if(existingItem) {
                existingItem.quantity = cartItem.quantity;
            } else {
                state.cartItems.push(cartItem);
            }
        },
        updateQuantity: (state, action)=>{
            const {id, quantity} = action.payload;
            const item= state.cartItems.find(i => i.id == id);
            if(item) {
                item.quantity = quantity;
            }
        },

        removeCartItem: (state, action)=>{
            const id= action.payload;
            state.cartItems = state.cartItems.filter(item => item.id !== id);
        }



    }
});

export const {setUserData, setCity, setState, setCurrentAddress, setShopInMyCity, setItemsInMyCity, addToCart, updateQuantity, removeCartItem} = userSlice.actions;
export default userSlice.reducer
