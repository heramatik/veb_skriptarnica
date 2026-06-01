import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : { cartItems: [], shippingAddress: {}, paymentMethod: 'Gotovina', discountPercentage: 0, discountAmount: 0 };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.id === item.id);
            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x.id === existItem.id ? item : x
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }
            return updateCart(state);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x.id !== action.payload);
            return updateCart(state);
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem('cart', JSON.stringify(state));
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
        },
        clearCart: (state, action) => {
            state.cartItems = [];
            return updateCart(state);
        },
        increaseQty: (state, action) => {
            const item = state.cartItems.find((x) => x.id === action.payload);
            if (item) {
                item.qty += 1;
            }
            return updateCart(state);
        },
        decreaseQty: (state, action) => {
            const item = state.cartItems.find((x) => x.id === action.payload);
            if (item && item.qty > 1) {
                item.qty -= 1;
            }
            return updateCart(state);
        },
        // NOVA AKCIJA: Služi da zapamti procenat popusta preusmeren sa CartScreen-a
        // Unutar reducers: { ... } u cartSlice.js dodaj ovo:

saveDiscountPercentage: (state, action) => {
    // 1. Upisujemo procenat u stanje (npr. 100, 30, 15 ili 0)
    state.discountPercentage = action.payload;
    
    // 2. Pokrećemo tvoj updateCart iz cartUtils da ponovo preračuna sve cene
    return updateCart(state);
},
    },
});

export const { 
    addToCart, 
    removeFromCart, 
    saveShippingAddress, 
    savePaymentMethod, 
    clearCart, 
    increaseQty, 
    decreaseQty,
    saveDiscountPercentage // OVO JE DODATO
} = cartSlice.actions;

export default cartSlice.reducer;